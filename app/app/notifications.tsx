import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const NOTIFICATIONS = [
  { id: '1', title: '还书提醒', message: '您借阅的《三体》将于明日到期，请及时归还或续借。', time: '10分钟前', icon: 'book-outline', iconColor: '#398779', bgColor: 'bg-primary/10' },
  { id: '2', title: '预约成功', message: '您预约的“3楼自习室 A12”座位已锁定，请在15分钟内签到。', time: '1小时前', icon: 'checkmark-circle-outline', iconColor: '#16a34a', bgColor: 'bg-green-100' },
  { id: '3', title: '系统通知', message: '图书馆将于本周六进行系统维护，届时借阅服务暂停。', time: '昨天', icon: 'information-circle-outline', iconColor: '#4b5563', bgColor: 'bg-gray-100' },
];

export default function NotificationsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-5 py-3 bg-background flex-row items-center border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#2C3333" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-text-main">消息通知</Text>
      </View>

      <ScrollView className="flex-1 p-4">
        {NOTIFICATIONS.map((item) => (
          <View key={item.id} className="bg-white p-4 rounded-xl mb-3 shadow-sm flex-row items-start border border-gray-50">
            <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${item.bgColor}`}>
               <Ionicons name={item.icon} size={20} color={item.iconColor} />
            </View>
            <View className="flex-1">
              <View className="flex-row justify-between items-center mb-1">
                <Text className="font-bold text-text-main">{item.title}</Text>
                <Text className="text-xs text-gray-400">{item.time}</Text>
              </View>
              <Text className="text-text-main leading-5 text-sm">{item.message}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}