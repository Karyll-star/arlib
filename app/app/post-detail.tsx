import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Mock Data Sets
const COMMENT_SETS = [
  [
    { id: '1', user: 'SciFiLover', avatar: 'bg-indigo-100', content: '完全同意！黑暗森林法则解释了费米悖论，太震撼了。', time: '1小时前', likes: 45 },
    { id: '2', user: 'PhysicsGeek', avatar: 'bg-orange-100', content: '其实我觉得有些设定过于悲观了，文明之间除了猜疑链，应该也有交流的可能性吧？', time: '30分钟前', likes: 12 },
    { id: '3', user: 'LibraryCat', avatar: 'bg-gray-100', content: '楼主分析得很透彻，坐等第三部读后感！', time: '5分钟前', likes: 8 },
  ],
  [
    { id: '1', user: 'BookWorm_99', avatar: 'bg-green-100', content: '这也太实用了！我也要去试试这个阅读方法。', time: '2小时前', likes: 23 },
    { id: '2', user: 'StudyHard', avatar: 'bg-blue-100', content: '感谢分享，最近正愁看书效率低呢。', time: '1小时前', likes: 5 },
  ],
  [
    { id: '1', user: 'TechSavvy', avatar: 'bg-purple-100', content: 'AR导航确实方便，不过有时候在角落里信号不太好。', time: '1天前', likes: 18 },
    { id: '2', user: 'NewUser007', avatar: 'bg-red-100', content: '希望能增加更多互动功能，比如寻宝游戏之类的。', time: '5小时前', likes: 9 },
    { id: '3', user: 'Librarian_Jane', avatar: 'bg-yellow-100', content: '我们会持续优化的，感谢反馈！', time: '1小时前', likes: 42 },
  ]
];

// Helper to pick comments based on a string hash
const getCommentsForPost = (title) => {
  if (!title) return COMMENT_SETS[0];
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % COMMENT_SETS.length;
  return COMMENT_SETS[index];
};

const CommentItem = ({ item }) => (
  <View className="flex-row mb-6">
    <View className={`w-10 h-10 rounded-full ${item.avatar} items-center justify-center mr-3`}>
       <Text className="text-base">👤</Text>
    </View>
    <View className="flex-1">
       <View className="flex-row justify-between items-center mb-1">
          <Text className="text-text-main font-bold text-sm">{item.user}</Text>
          <Text className="text-gray-400 text-xs">{item.time}</Text>
       </View>
       <Text className="text-text-main leading-5 text-sm mb-2">{item.content}</Text>
       
       <View className="flex-row space-x-4">
          <TouchableOpacity className="flex-row items-center">
             <Ionicons name="heart-outline" size={14} color="#9ca3af" />
             <Text className="text-gray-500 text-xs ml-1">{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
             <Text className="text-gray-500 text-xs font-medium">回复</Text>
          </TouchableOpacity>
       </View>
    </View>
  </View>
);

export default function PostDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Number(params.likes) || 342);
  
  const comments = getCommentsForPost(params.title);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-100 bg-background">
        <TouchableOpacity onPress={() => router.back()}>
           <Ionicons name="arrow-back" size={24} color="#2C3333" />
        </TouchableOpacity>
        <Text className="font-bold text-lg text-text-main">帖子详情</Text>
        <TouchableOpacity>
           <Ionicons name="ellipsis-horizontal" size={24} color="#2C3333" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
         
         {/* Author Info */}
         <View className="flex-row items-center px-4 py-4">
            <View className={`w-12 h-12 rounded-full ${params.avatarColor || 'bg-primary/10'} items-center justify-center mr-3`}>
               <Text className="text-xl">👤</Text>
            </View>
            <View className="flex-1">
               <Text className="font-bold text-text-main text-base">{params.user || 'Unknown User'}</Text>
               <Text className="text-gray-400 text-xs">{params.time || '刚刚'}</Text>
            </View>
            <TouchableOpacity className="bg-primary px-4 py-1.5 rounded-full">
               <Text className="text-white text-xs font-bold">关注</Text>
            </TouchableOpacity>
         </View>

         {/* Content Body */}
         <View className="px-4 mb-6">
            <Text className="text-xl font-bold text-text-main mb-3 leading-tight">
               {params.title || '帖子标题'}
            </Text>
            <Text className="text-text-main text-base leading-7">
               {params.content || '帖子内容...'}
               {
                 '\n\n'
               }
               （此处为模拟的长文本内容，用于展示详情页的排版效果。在真实应用中，这里会显示完整的帖子正文。）
            </Text>
            
            {/* Tags */}
            <View className="flex-row mt-4">
               <View className="bg-white px-3 py-1 rounded-lg border border-gray-100">
                  <Text className="text-gray-500 text-xs">#{params.tag || '话题'}</Text>
               </View>
            </View>
         </View>

         <View className="h-2 bg-gray-100 mb-6" />

         {/* Comments Section */}
         <View className="px-4 pb-24">
            <Text className="font-bold text-lg text-text-main mb-6">全部评论 ({comments.length})</Text>
            {comments.map(item => <CommentItem key={item.id} item={item} />)}
         </View>

      </ScrollView>

      {/* Floating Action Bar */}
      <KeyboardAvoidingView 
         behavior={Platform.OS === "ios" ? "padding" : "height"} 
         keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
         className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 flex-row items-center justify-between shadow-lg"
      >
         <View className="flex-1 bg-background rounded-full px-4 py-2 mr-4 border border-gray-200">
            <TextInput 
               placeholder="写下你的想法..." 
               className="text-base text-text-main"
               placeholderTextColor="#9ca3af"
            />
         </View>
         
         <View className="flex-row space-x-5 items-center">
            <TouchableOpacity onPress={toggleLike} className="items-center">
               <Ionicons name={isLiked ? "heart" : "heart-outline"} size={26} color={isLiked ? "#ef4444" : "#4b5563"} />
               <Text className="text-[10px] text-gray-500 font-medium">{likeCount}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="items-center">
               <Ionicons name="chatbubble-outline" size={24} color="#4b5563" />
               <Text className="text-[10px] text-gray-500 font-medium">{params.comments || 56}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="items-center">
               <Ionicons name="share-social-outline" size={24} color="#4b5563" />
            </TouchableOpacity>
         </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}