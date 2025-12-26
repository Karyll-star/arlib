import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// --- Components ---

const BookItem = ({ title, coverColor, daysLeft, progress, isReturnable }) => {
  const router = useRouter();
  // Use red for urgent (<3 days), otherwise accent
  const progressColor = daysLeft < 3 ? 'bg-red-500' : 'bg-accent';
  
  return (
    <TouchableOpacity 
      onPress={() => router.push({ pathname: '/book-detail', params: { title } })}
      className="flex-row bg-white p-4 rounded-xl mb-4 shadow-sm border border-gray-100"
    >
      <View className={`w-24 h-32 rounded-lg ${coverColor} items-center justify-center mr-4`}>
         {/* Placeholder for book cover */}
         <Text className="text-4xl">📕</Text>
      </View>
      <View className="flex-1 justify-between py-1">
        <View>
          <Text className="text-xl font-bold text-text-main mb-2">{title}</Text>
          
          {/* Progress Bar */}
          <View className="h-2 bg-gray-200 rounded-full mb-2 w-full overflow-hidden">
             <View className={`h-full ${progressColor} rounded-full`} style={{ width: `${progress}%` }} />
          </View>
          
          <Text className="text-xl font-bold text-text-main">剩余 : {daysLeft} 天</Text>
        </View>

        <View className="flex-row mt-2">
          <TouchableOpacity className="flex-1 bg-white border border-gray-200 py-2 rounded-full mr-3 items-center shadow-sm">
             <Text className="text-text-main font-medium">申请续借</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-white border border-gray-200 py-2 rounded-full items-center shadow-sm">
             <Text className="text-text-main font-medium">立即归还</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function BookshelfScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center p-4 bg-background border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="p-2 mr-4">
          <Ionicons name="arrow-back" size={24} color="#2C3333" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-text-main flex-1 text-center pr-10">流动书架</Text>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Promo Card */}
        <View className="bg-primary rounded-2xl p-6 mb-8 relative overflow-hidden">
           {/* Decorative circles */}
           <View className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full" />

           <Text className="text-white text-2xl font-bold mb-2">想要借阅新书？</Text>
           <Text className="text-white/80 text-base mb-6">我们的AR服务可以带你前往借阅台。</Text>
           
           <TouchableOpacity className="bg-white py-2 px-4 rounded-lg self-end shadow-sm">
             <Text className="text-primary font-medium">前往借阅台</Text>
           </TouchableOpacity>
        </View>

        {/* Alert Section */}
        <View className="flex-row items-center mb-4">
          <Text className="text-2xl mr-2">⚠️</Text>
          <Text className="text-2xl font-bold text-text-main">需要注意</Text>
        </View>

        <BookItem 
          title="《别搞得尴尬》" 
          coverColor="bg-pink-200"
          daysLeft={1}
          progress={20}
        />

        {/* Current Reading Section */}
        <View className="flex-row items-center mb-4 mt-6">
          <Text className="text-2xl font-bold text-text-main">在读中 (2)</Text>
        </View>

        <BookItem 
          title="《线与面具》" 
          coverColor="bg-yellow-200"
          daysLeft={5}
          progress={60}
        />
         <BookItem 
          title="《时间地图》" 
          coverColor="bg-blue-200"
          daysLeft={12}
          progress={10}
        />

      </ScrollView>
    </SafeAreaView>
  );
}