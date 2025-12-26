import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// --- Mock Data ---

const CATEGORIES = ['推荐', '热榜', '书评', '活动', '二手书', '组队', '吐槽'];

const POSTS = [
  {
    id: '1',
    user: 'AliceReader',
    avatarColor: 'bg-red-100',
    title: '《三体》读后感讨论：关于黑暗森林法则',
    content: '刚刚读完《三体》第二部，对于黑暗森林法则的逻辑推导感到非常震撼。大家觉得这个法则在现实宇宙中真的成立吗？还是说这只是小说设定？我觉得大刘的推导非常严密...',
    likes: 342,
    comments: 56,
    time: '2小时前',
    tag: '科幻',
    images: [] 
  },
  {
    id: '2',
    user: 'BookWorm_99',
    avatarColor: 'bg-green-100',
    title: '求推荐类似《百年孤独》的书 📚',
    content: '非常喜欢魔幻现实主义风格，有没有其他类似的作品推荐？最好是拉美文学，感谢各位书友！',
    likes: 89,
    comments: 23,
    time: '5小时前',
    tag: '求助',
    images: ['https://via.placeholder.com/150'] // Simulated image
  },
  {
    id: '3',
    user: 'LibraryAdmin',
    avatarColor: 'bg-blue-100',
    title: '下周六下午2点：读书会活动报名开启',
    content: '本期读书会我们将一起探讨余华的《活着》。欢迎大家踊跃报名，地点在图书馆三楼研讨室。',
    likes: 521,
    comments: 88,
    time: '1天前',
    tag: '活动',
    isOfficial: true,
    images: []
  },
   {
    id: '4',
    user: 'SciFiFan',
    avatarColor: 'bg-purple-100',
    title: '2025年必读科幻小说清单',
    content: '整理了一份今年的书单，欢迎补充。今年有很多硬科幻佳作...',
    likes: 1256,
    comments: 42,
    time: '2天前',
    tag: '书单',
    images: []
  }
];

// --- Components ---

const CategoryChip = ({ label, active, onPress }) => (
  <Pressable 
    onPress={onPress}
    style={{
      paddingHorizontal: 20,
      paddingVertical: 8,
      borderRadius: 9999,
      marginRight: 12,
      backgroundColor: active ? '#398779' : '#ffffff', // primary : white
      borderWidth: active ? 0 : 1,
      borderColor: '#e5e7eb', // gray-200
      // Shadow for active state
      ...(active ? {
        shadowColor: '#398779',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
      } : {})
    }}
  >
    <Text style={{
      fontSize: 14,
      fontWeight: 'bold',
      color: active ? '#ffffff' : '#2C3333' // white : text-main
    }}>
      {label}
    </Text>
  </Pressable>
);

const PostCard = ({ item }) => {
  const router = useRouter();
  return (
    <View className="bg-white p-4 rounded-2xl shadow-sm mb-4 border border-gray-100">
      <Pressable onPress={() => router.push({ pathname: '/post-detail', params: item })}>
        {/* User Header */}
        <View className="flex-row items-center mb-3 justify-between">
          <View className="flex-row items-center">
            <View className={`w-10 h-10 rounded-full ${item.avatarColor} items-center justify-center mr-3 border border-white shadow-sm`}>
               <Text className="text-sm">👤</Text>
            </View>
            <View>
              <View className="flex-row items-center">
                <Text className="font-bold text-text-main text-base mr-2">{item.user}</Text>
                {item.isOfficial && (
                  <View className="bg-primary px-1.5 py-0.5 rounded">
                    <Text className="text-[10px] text-white font-bold">OFFICIAL</Text>
                  </View>
                )}
              </View>
              <Text className="text-xs text-gray-400">{item.time}</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Text className="text-gray-400 font-bold text-lg tracking-widest">•••</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View className="mb-3">
           <Text className="text-lg font-bold text-text-main mb-2 leading-snug">{item.title}</Text>
           <Text className="text-gray-600 text-sm leading-6" numberOfLines={3}>{item.content}</Text>
           
           {/* Image Placeholder (if any) */}
           {item.images && item.images.length > 0 && (
             <View className="mt-3 flex-row">
                <View className="w-24 h-24 bg-gray-200 rounded-lg mr-2 items-center justify-center">
                   <Text className="text-2xl">🖼️</Text>
                </View>
             </View>
           )}
        </View>
      </Pressable>

      {/* Tag & Actions */}
      <View className="flex-row items-center justify-between border-t border-gray-50 pt-3 mt-1">
        <View className="bg-background px-2 py-1 rounded-md">
           <Text className="text-xs text-gray-500">#{item.tag}</Text>
        </View>

        <View className="flex-row items-center space-x-6">
          <TouchableOpacity className="flex-row items-center mr-4">
            <Text className="text-gray-500 mr-1.5 text-lg">🤍</Text>
            <Text className="text-gray-600 text-xs font-medium">{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center mr-4">
            <Text className="text-gray-500 mr-1.5 text-lg">💬</Text>
            <Text className="text-gray-600 text-xs font-medium">{item.comments}</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center">
            <Text className="text-gray-500 mr-1.5 text-lg">↗️</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// --- Main Screen ---

export default function CommunityScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('推荐');

  return (
    <SafeAreaView className="flex-1 bg-background">
      
      {/* Header */}
      <View className="px-5 py-3 bg-background flex-row justify-between items-center z-10">
        <Text className="text-2xl font-extrabold text-primary">思想广场</Text>
        <View className="flex-row space-x-4">
           <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm">
              <Ionicons name="search-outline" size={20} color="#398779" />
           </TouchableOpacity>
           <TouchableOpacity 
             className="w-10 h-10 bg-white rounded-full items-center justify-center relative shadow-sm"
             onPress={() => router.push('/notifications')}
           >
              <Ionicons name="notifications-outline" size={20} color="#398779" />
              <View className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border border-white" />
           </TouchableOpacity>
        </View>
      </View>

      {/* Categories Horizontal Scroll */}
      <View className="bg-background pb-3 border-b border-gray-100">
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={{ paddingHorizontal: 20 }}
          className="pt-2"
        >
          {CATEGORIES.map((cat) => (
            <CategoryChip 
              key={cat} 
              label={cat} 
              active={activeCategory === cat} 
              onPress={() => setActiveCategory(cat)} 
            />
          ))}
        </ScrollView>
      </View>

      {/* Feed */}
      <FlatList 
        data={POSTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard item={item} />}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Action Button (FAB) */}
      <TouchableOpacity 
        className="absolute bottom-24 right-6 w-16 h-16 bg-primary rounded-full items-center justify-center shadow-lg elevation-5 z-50 active:scale-95"
        style={{ shadowColor: '#398779', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4.65 }}
      >
        <Text className="text-white text-3xl font-light mt-[-2px]">+</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}