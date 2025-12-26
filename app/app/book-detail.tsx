import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Mock Data for a single book (in real app, fetch by ID)
const BOOK_DATA = {
  id: '1',
  title: '三体',
  author: '刘慈欣',
  cover: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=800&auto=format&fit=crop', // Placeholder sci-fi image
  rating: 4.9,
  reviews: 12580,
  tags: ['科幻', '雨果奖', '中国文学'],
  description: '文化大革命如火如荼进行的同时，军方探寻外星文明的绝秘计划“红岸工程”取得了突破性进展。但在按下发射键的那一刻，历经劫难的叶文洁没有意识到，她彻底改变了人类的命运。地球文明向宇宙发出的第一声啼鸣，以太阳为中心，以光速向宇宙深处飞驰...',
  location: '科幻小说区 A12-04-B',
  status: '可借阅',
  isbn: '9787536692930'
};

const TagChip = ({ label }) => (
  <View className="bg-background px-3 py-1 rounded-full mr-2 border border-gray-200">
    <Text className="text-text-main text-xs font-medium">{label}</Text>
  </View>
);

export default function BookDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isFavorite, setIsFavorite] = useState(false);

  // Use params if available, otherwise fallback to mock
  const book = { ...BOOK_DATA, ...params };

  return (
    <View className="flex-1 bg-background">
      {/* Header Image / Backdrop */}
      <View className="h-[45%] w-full relative">
        <Image 
          source={{ uri: book.cover || BOOK_DATA.cover }} 
          className="w-full h-full absolute"
          resizeMode="cover"
        />
        {/* Gradient Overlay */}
        <View className="absolute inset-0 bg-black/30" />
        <View className="absolute bottom-0 w-full h-32" style={{backgroundColor: 'transparent'}} /> 
        
        {/* Navigation Bar (Transparent) */}
        <SafeAreaView className="absolute top-0 w-full flex-row justify-between items-center px-4 z-10">
           <TouchableOpacity 
             onPress={() => router.back()}
             className="w-10 h-10 bg-black/20 rounded-full items-center justify-center border border-white/30"
           >
             <Ionicons name="arrow-back" size={24} color="white" />
           </TouchableOpacity>
           
           <View className="flex-row space-x-3">
             <TouchableOpacity 
               onPress={() => setIsFavorite(!isFavorite)}
               className="w-10 h-10 bg-black/20 rounded-full items-center justify-center border border-white/30"
             >
               <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color={isFavorite ? "#ef4444" : "white"} />
             </TouchableOpacity>
             <TouchableOpacity className="w-10 h-10 bg-black/20 rounded-full items-center justify-center border border-white/30">
               <Ionicons name="share-social-outline" size={24} color="white" />
             </TouchableOpacity>
           </View>
        </SafeAreaView>
      </View>

      {/* Content Sheet */}
      <View className="flex-1 bg-white mt-[-40px] rounded-t-[40px] px-6 pt-8 shadow-2xl relative">
         
         {/* Floating Cover (Small) */}
         <View className="absolute -top-24 left-6 shadow-xl shadow-black/50">
            <Image 
              source={{ uri: book.cover || BOOK_DATA.cover }} 
              className="w-32 h-48 rounded-xl border-2 border-white"
            />
         </View>

         {/* Basic Info (Right of Cover) */}
         <View className="ml-36 mb-6 justify-end h-24">
            <Text className="text-2xl font-bold text-text-main leading-tight mb-1" numberOfLines={2}>
              {book.title || BOOK_DATA.title}
            </Text>
            <Text className="text-gray-500 font-medium text-sm mb-2">{book.author || BOOK_DATA.author}</Text>
            
            <View className="flex-row items-center">
               <Ionicons name="star" size={16} color="#D4A373" />
               <Text className="text-text-main font-bold ml-1">{book.rating || BOOK_DATA.rating}</Text>
               <Text className="text-gray-400 text-xs ml-1">({book.reviews || BOOK_DATA.reviews} 评论)</Text>
            </View>
         </View>

         <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
            {/* Tags */}
            <View className="flex-row mb-6">
              {(book.tags || BOOK_DATA.tags).map((tag, i) => <TagChip key={i} label={tag} />)}
            </View>

            {/* Description */}
            <Text className="text-lg font-bold text-text-main mb-3">简介</Text>
            <Text className="text-gray-600 leading-7 mb-6">
               {book.description || BOOK_DATA.description}
            </Text>

            {/* Status Info */}
            <View className="bg-background p-4 rounded-2xl mb-6 flex-row justify-between items-center border border-gray-100">
               <View>
                  <Text className="text-gray-400 text-xs mb-1">当前位置</Text>
                  <View className="flex-row items-center">
                     <Ionicons name="location-outline" size={16} color="#398779" />
                     <Text className="text-text-main font-bold ml-1">{book.location || BOOK_DATA.location}</Text>
                  </View>
               </View>
               <View>
                  <Text className="text-gray-400 text-xs mb-1">状态</Text>
                  <Text className="text-primary font-bold bg-primary/10 px-2 py-0.5 rounded text-center">
                     {book.status || BOOK_DATA.status}
                  </Text>
               </View>
            </View>
            
            {/* Placeholder for more content */}
            <View className="h-20" />
         </ScrollView>

         {/* Bottom Action Bar */}
         <View className="absolute bottom-8 left-0 right-0 px-6 flex-row justify-between items-center">
             <TouchableOpacity className="flex-1 bg-background py-4 rounded-2xl mr-4 items-center border border-gray-200">
                <Text className="text-text-main font-bold">加入书架</Text>
             </TouchableOpacity>

             <TouchableOpacity 
               onPress={() => router.push({ pathname: '/ar', params: { destination: book.location || BOOK_DATA.location } })}
               className="flex-[2] bg-primary py-4 rounded-2xl flex-row items-center justify-center shadow-lg shadow-primary/30"
             >
                <Ionicons name="navigate-circle-outline" size={24} color="white" style={{ marginRight: 8 }} />
                <Text className="text-white font-bold text-lg">AR 导航前往</Text>
             </TouchableOpacity>
         </View>
      </View>
    </View>
  );
}