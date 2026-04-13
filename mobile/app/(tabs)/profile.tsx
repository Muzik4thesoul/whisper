import { useAuth } from "@clerk/expo";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileTab = () => {
  const { signOut } = useAuth();
  return (
    <SafeAreaView className="flex-1 bg-surface">
      <ScrollView>
        <Text className="text-white text-lg">Profile Tab</Text>
        <Pressable onPress={() => signOut()} className="bg-red-600 px-4 py-2">
          <Text className="text-white text-center font-bold uppercase">
            signout
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ProfileTab;
