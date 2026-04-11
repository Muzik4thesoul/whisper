import type { NextFunction, Request, Response } from "express";
import type { authRequest } from "../middleware/auth";
import { User } from "../models/User";
import { clerkClient, getAuth } from "@clerk/express";

export async function getMe(
  req: authRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500);
    next(error);
  }
}

export async function authCallback(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId: clerkId } = getAuth(req);

    if (!clerkId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    let user = await User.findOne({ clerkId });
    if (!user) {
      const clerkUser = await clerkClient.users.getUser(clerkId);
      const primaryEmail = clerkUser.emailAddresses[0]?.emailAddress;
      const displayName = clerkUser.firstName?.trim()
        ? `${clerkUser.firstName} ${clerkUser.lastName || ""}`.trim()
        : primaryEmail?.split("@")[0];
      user = await User.findOneAndUpdate(
        { clerkId },
        {
          $setOnInsert: {
            clerkId,
            name: displayName,
            email: primaryEmail,
            avatar: clerkUser.imageUrl,
          },
        },
        { new: true, upsert: true },
      );
    }

    res.json(user);
  } catch (error) {
    res.status(500);
    next(error);
  }
}
