import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text } from "react-native";

const ChatsTab = () => {
  return (
    <SafeAreaView className="flex-1 bg-surface">
      <ScrollView>
        <Text className="text-white text-lg">Chats Tab</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatsTab;
