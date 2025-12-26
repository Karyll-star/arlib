import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

// --- Components ---

const FolderItem = ({ title, count, imageColor }) => (
  <View className="mr-3 w-24">
    <View className={`w-24 h-24 rounded-xl ${imageColor} mb-2 items-center justify-center`}>
      {/* Placeholder image overlay effect */}
      <View className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent rounded-b-xl" />
    </View>
    <Text className="text-center font-bold text-gray-800 text-sm">{title}</Text>
    <Text className="text-center text-xs text-gray-500">{count}本书</Text>
  </View>
);

const BookCard = ({ title, color }) => (
  <View className="w-[48%] mb-4 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden pb-3">
    <View className={`w-full h-40 ${color} items-center justify-center mb-2`}>
      <Text className="text-4xl">📘</Text>
    </View>
    <Text className="text-center font-bold text-gray-900 px-2 text-sm">{title}</Text>
  </View>
);

export default function FavoritesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center p-4">
        <TouchableOpacity onPress={() => router.back()} className="p-2 mr-4">
          <Text className="text-2xl text-gray-800">←</Text>
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-900 flex-1 text-center pr-10">我的收藏</Text>
      </View>

      <ScrollView className="flex-1 p-4">
        
        {/* Folders Section */}
        <View className="flex-row justify-between items-center mb-4">
           <Text className="text-xl font-bold text-gray-900">收藏夹</Text>
           <Text className="text-xs text-gray-500">全部 (8) {'>'}</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8">
          <FolderItem title="全部收藏" count="128" imageColor="bg-gray-300" />
          <FolderItem title="科幻小说" count="31" imageColor="bg-blue-300" />
          <FolderItem title="动物小说" count="10" imageColor="bg-orange-300" />
          <FolderItem title="农业" count="31" imageColor="bg-green-300" />
        </ScrollView>

        {/* Recently Added Section */}
        <View className="flex-row justify-between items-center mb-4">
           <Text className="text-xl font-bold text-gray-900">最近添加</Text>
           <Text className="text-xs text-gray-500">按时间排序 ▼</Text>
        </View>

        <View className="flex-row flex-wrap justify-between">
           <BookCard title="《别搞得尴尬》" color="bg-pink-100" />
           <BookCard title="《时间与金钱》" color="bg-red-100" />
           <BookCard title="《线与面具》" color="bg-yellow-100" />
           <BookCard title="《时间地图》" color="bg-cyan-100" />
           <BookCard title="《一人食的哲学》" color="bg-orange-100" />
           <BookCard title="《重塑大脑》" color="bg-gray-200" />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}