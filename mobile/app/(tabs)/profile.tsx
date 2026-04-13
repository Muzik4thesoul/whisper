import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileTab = () => {
  return (
    <SafeAreaView className="flex-1 bg-surface">
      <ScrollView>
        <Text className="text-white text-lg">Profile Tab</Text>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ProfileTab;
