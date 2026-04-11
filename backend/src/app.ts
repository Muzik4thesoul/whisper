import express from "express";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import authRoutes from "./routes/authRoutes";
import chatRoutes from "./routes/chatRoutes";
import messageRoutes from "./routes/messageRoutes";
import userRoutes from "./routes/userRoutes";
import { errorhandler } from "./middleware/errorHandler";

const app = express();

// parses incoming JSON request bodies anad makes them available as req.body in our route handlers.
app.use(express.json());

app.use(clerkMiddleware());

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// error handlers should be added after all routes and other middleware so they catch error passed with next(err) or thrown in async route handlers.
app.use(errorhandler);
export default app;
