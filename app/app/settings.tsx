import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const SettingItem = ({ icon, label, hasSwitch, value, onValueChange }) => (
  <View className="flex-row items-center justify-between p-4 bg-white border-b border-gray-50">
    <View className="flex-row items-center">
      <Ionicons name={icon} size={22} color="#2C3333" style={{ marginRight: 12 }} />
      <Text className="text-base text-text-main">{label}</Text>
    </View>
    {hasSwitch ? (
      <Switch 
        value={value} 
        onValueChange={onValueChange} 
        trackColor={{ false: "#767577", true: "#398779" }}
        thumbColor={value ? "#f4f3f4" : "#f4f3f4"}
      />
    ) : (
      <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
    )}
  </View>
);

export default function SettingsScreen() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isNotifEnabled, setIsNotifEnabled] = React.useState(true);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-5 py-3 bg-background flex-row items-center border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#2C3333" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-text-main">设置</Text>
      </View>

      <ScrollView className="mt-4">
        <Text className="px-4 mb-2 text-xs font-bold text-gray-500 uppercase">通用</Text>
        <SettingItem icon="moon-outline" label="深色模式" hasSwitch value={isDarkMode} onValueChange={setIsDarkMode} />
        <SettingItem icon="notifications-outline" label="消息推送" hasSwitch value={isNotifEnabled} onValueChange={setIsNotifEnabled} />
        <SettingItem icon="globe-outline" label="语言" />
        
        <Text className="px-4 mb-2 mt-6 text-xs font-bold text-gray-500 uppercase">关于</Text>
        <SettingItem icon="document-text-outline" label="用户协议" />
        <SettingItem icon="shield-checkmark-outline" label="隐私政策" />
        <SettingItem icon="information-circle-outline" label="关于我们" />
        
        <TouchableOpacity className="mt-8 mx-4 bg-white border border-gray-200 p-4 rounded-xl items-center shadow-sm">
            <Text className="text-red-500 font-bold">清除缓存</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}