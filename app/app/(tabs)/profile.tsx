import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// --- Mock Data ---

const USER = {
  name: '张三',
  id: '20250001',
  dept: '计算机科学与技术学院',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop',
  level: 'Lv.5 书虫',
  stats: {
    borrowed: 12,
    history: 58,
    points: 356
  }
};

// --- Components ---

const StatBox = ({ label, value, onPress }) => (
  <TouchableOpacity onPress={onPress} className="items-center flex-1">
    <Text className="text-2xl font-bold text-text-main mb-1">{value}</Text>
    <Text className="text-xs text-gray-500 font-medium">{label}</Text>
  </TouchableOpacity>
);

const SectionTitle = ({ title }) => (
  <Text className="text-base font-bold text-text-main mb-3 px-4 mt-6">{title}</Text>
);

const MenuItem = ({ icon, label, badge, isLast, onPress, color = "bg-gray-100" }) => (
  <TouchableOpacity 
    onPress={onPress}
    className={`flex-row items-center justify-between p-4 bg-white ${!isLast ? 'border-b border-gray-50' : ''} active:bg-gray-50`}
  >
    <View className="flex-row items-center">
      <View className={`w-9 h-9 rounded-xl items-center justify-center mr-4 ${color}`}>
        <Text className="text-lg">{icon}</Text>
      </View>
      <Text className="text-base text-text-main font-medium">{label}</Text>
    </View>
    <View className="flex-row items-center">
      {badge && (
        <View className="bg-accent px-2 py-0.5 rounded-full mr-2">
          <Text className="text-[10px] text-white font-bold">{badge}</Text>
        </View>
      )}
      <Text className="text-gray-300 text-sm">›</Text>
    </View>
  </TouchableOpacity>
);

// --- Main Screen ---

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Top Navigation Bar */}
      <View className="px-5 py-3 flex-row justify-between items-center bg-background z-10">
         <Text className="text-xl font-bold text-primary">个人中心</Text>
         <View className="flex-row space-x-4">
            <TouchableOpacity onPress={() => router.push('/settings')}>
               <Ionicons name="settings-outline" size={24} color="#398779" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/notifications')}>
               <Ionicons name="chatbubble-ellipses-outline" size={24} color="#398779" />
            </TouchableOpacity>
         </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* User Card */}
        <View className="bg-white pb-6 pt-4 rounded-b-3xl shadow-sm mb-4">
           <View className="flex-row items-center px-6 mb-6">
              <View className="relative mr-5">
                 <View className="w-20 h-20 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden items-center justify-center">
                    {/* Placeholder Avatar if image fails */}
                    <Text className="text-4xl">🧑‍🎓</Text>
                 </View>
                 <View className="absolute bottom-0 right-0 bg-primary px-2 py-0.5 rounded-full border border-white">
                    <Text className="text-[10px] text-white font-bold">Lv.5</Text>
                 </View>
              </View>
              <View>
                 <Text className="text-2xl font-bold text-text-main mb-1">{USER.name}</Text>
                 <Text className="text-sm text-gray-500 mb-1">ID: {USER.id}</Text>
                 <Text className="text-xs text-primary bg-primary/10 self-start px-2 py-0.5 rounded-md font-medium">
                    {USER.dept}
                 </Text>
              </View>
           </View>

           {/* Stats Row */}
           <View className="flex-row border-t border-gray-100 pt-6 mx-4">
              <StatBox label="当前借阅" value={USER.stats.borrowed} onPress={() => router.push('/bookshelf')} />
              <View className="w-[1px] h-8 bg-gray-200 self-center" />
              <StatBox label="累计阅读" value={USER.stats.history} onPress={() => {}} />
              <View className="w-[1px] h-8 bg-gray-200 self-center" />
              <StatBox label="我的积分" value={USER.stats.points} onPress={() => {}} />
           </View>
        </View>

        {/* Library Services Group */}
        <SectionTitle title="图书馆服务" />
        <View className="mx-4 bg-white rounded-2xl overflow-hidden shadow-sm">
           <MenuItem 
             icon="❤️" 
             label="我的收藏" 
             color="bg-red-50" 
             onPress={() => router.push('/favorites')} 
           />
           <MenuItem 
             icon="📅" 
             label="我的预约" 
             color="bg-orange-50" 
             badge="2"
             onPress={() => router.push('/seat-reservation')} 
           />
           <MenuItem 
             icon="💳" 
             label="借阅证" 
             color="bg-blue-50" 
             isLast 
             onPress={() => {}} 
           />
        </View>

        {/* Account & Activity Group */}
        <SectionTitle title="更多功能" />
        <View className="mx-4 bg-white rounded-2xl overflow-hidden shadow-sm mb-8">
           <MenuItem 
             icon="📝" 
             label="我的帖子" 
             color="bg-purple-50" 
             onPress={() => {}} 
           />
           <MenuItem 
             icon="🛡️" 
             label="账号安全" 
             color="bg-green-50" 
             onPress={() => {}} 
           />
           <MenuItem 
             icon="❓" 
             label="帮助与反馈" 
             color="bg-gray-100" 
             isLast 
             onPress={() => {}} 
           />
        </View>

        {/* Logout Button */}
        <TouchableOpacity className="mx-4 mb-10 bg-white border border-red-100 p-4 rounded-xl items-center shadow-sm active:bg-red-50">
           <Text className="text-red-500 font-bold">退出登录</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}