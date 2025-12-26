import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// --- Components ---

const IconButton = ({ icon, label, onPress, color = "bg-white" }) => (
  <TouchableOpacity onPress={onPress} className="items-center justify-center w-[22%] mb-4">
    <View className={`w-14 h-14 rounded-2xl items-center justify-center mb-2 shadow-sm ${color}`}>
      <Text className="text-2xl">{icon}</Text>
    </View>
    <Text className="text-xs text-text-main text-center font-medium">{label}</Text>
  </TouchableOpacity>
);

const SectionHeader = ({ title, moreLink, onMorePress }) => (
  <View className="flex-row justify-between items-center mb-3 px-4">
    <Text className="text-lg font-bold text-text-main border-l-4 border-primary pl-2">{title}</Text>
    {moreLink && (
      <TouchableOpacity onPress={onMorePress}>
        <Text className="text-sm text-gray-400">更多 {'>'}</Text>
      </TouchableOpacity>
    )}
  </View>
);

const BookCard = ({ title, author, coverColor = "bg-gray-200" }) => {
  const router = useRouter();
  return (
    <TouchableOpacity 
      onPress={() => router.push({ pathname: '/book-detail', params: { title, author } })}
      className="w-28 mr-4"
    >
      <View className={`w-full h-40 rounded-lg mb-2 shadow-sm ${coverColor} items-center justify-center`}>
        <Text className="text-4xl">📖</Text>
      </View>
      <Text className="font-semibold text-text-main text-sm" numberOfLines={1}>{title}</Text>
      <Text className="text-xs text-gray-500" numberOfLines={1}>{author}</Text>
    </TouchableOpacity>
  );
};

const TopicCard = ({ title, content, hot }) => {
  const router = useRouter();
  return (
    <TouchableOpacity 
      onPress={() => router.push({ pathname: '/post-detail', params: { title, content, user: '广场用户', time: '刚刚' } })}
      className="bg-white p-3 rounded-xl mb-3 shadow-sm border border-gray-100 mx-4"
    >
      <View className="flex-row items-center mb-1">
        {hot && <Text className="text-xs bg-red-100 text-red-500 px-1 rounded mr-2">HOT</Text>}
        <Text className="font-bold text-text-main text-base flex-1" numberOfLines={1}>{title}</Text>
      </View>
      <Text className="text-gray-500 text-sm leading-5" numberOfLines={2}>{content}</Text>
    </TouchableOpacity>
  );
};

// --- Main Screen ---

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-background">
        <View>
          <Text className="text-xs text-gray-500">Welcome Back,</Text>
          <Text className="text-xl font-bold text-primary">AR Library</Text>
        </View>
        <TouchableOpacity 
          onPress={() => router.push('/notifications')}
          className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm"
        >
          <Ionicons name="notifications-outline" size={24} color="#398779" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        
        {/* Search & Scan */}
        <View className="px-4 py-2 bg-background pb-4 z-10">
          <View className="flex-row items-center bg-white rounded-full px-4 py-2 h-12 shadow-sm border border-gray-100">
            <Ionicons name="search-outline" size={20} color="#398779" style={{ marginRight: 8 }} />
            <TextInput 
              placeholder="搜索书名、作者、ISBN" 
              className="flex-1 text-base text-text-main"
              placeholderTextColor="#9ca3af"
            />
            <View className="h-6 w-[1px] bg-gray-300 mx-2" />
            <TouchableOpacity onPress={() => router.push('/scan')}>
              <Ionicons name="scan-outline" size={24} color="#398779" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Banner */}
        <View className="mt-4 px-4">
          <View className="w-full h-36 bg-primary rounded-2xl overflow-hidden shadow-lg shadow-primary/30 relative justify-center pl-6">
            {/* Abstract Background Shapes */}
            <View className="absolute right-[-20] top-[-20] w-32 h-32 bg-white rounded-full opacity-10" />
            <View className="absolute right-[40] bottom-[-20] w-24 h-24 bg-white rounded-full opacity-10" />
            
            <Text className="text-white text-lg font-bold mb-1">图书馆开放日</Text>
            <Text className="text-white/80 text-sm mb-3">探索知识的海洋，体验AR导航</Text>
            <TouchableOpacity className="bg-white self-start px-4 py-1.5 rounded-full">
              <Text className="text-primary text-xs font-bold">查看详情</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions Grid */}
        <View className="flex-row flex-wrap justify-between px-4 mt-6">
          <IconButton 
            icon="🪑" 
            label="预约座位" 
            onPress={() => router.push('/seat-reservation')} 
          />
          <IconButton 
            icon="📚" 
            label="流动书架" 
            onPress={() => router.push('/bookshelf')} 
          />
          <IconButton 
            icon="❤️" 
            label="我的收藏" 
            onPress={() => router.push('/favorites')} 
          />
          <IconButton 
            icon="📍" 
            label="签到" 
            onPress={() => router.push('/sign-in')} 
          />
        </View>

        {/* New Arrivals */}
        <View className="mt-6">
          <SectionHeader title="新到馆藏" moreLink onMorePress={() => {}} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
            <BookCard title="埃隆·马斯克传" author="沃尔特·艾萨克森" coverColor="bg-gray-900" />
            <BookCard title="长安的荔枝" author="马伯庸" coverColor="bg-green-50" />
            <BookCard title="芯片战争" author="克里斯·米勒" coverColor="bg-blue-50" />
            <BookCard title="始于极限" author="上野千鹤子" coverColor="bg-red-50" />
          </ScrollView>
        </View>

        {/* Recommended For You */}
        <View className="mt-6">
          <SectionHeader title="为你推荐" moreLink onMorePress={() => {}} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
            <BookCard title="深度学习" author="Ian Goodfellow" coverColor="bg-indigo-100" />
            <BookCard title="算法导论" author="Thomas H. Cormen" coverColor="bg-purple-100" />
            <BookCard title="黑客与画家" author="Paul Graham" coverColor="bg-gray-200" />
          </ScrollView>
        </View>

        {/* AI Assistant Banner */}
        <TouchableOpacity 
          className="mx-4 mt-2 bg-gray-900 rounded-2xl p-4 flex-row items-center shadow-sm mb-8"
          onPress={() => router.push('/ai')}
        >
          <View className="w-12 h-12 bg-gray-800 rounded-full items-center justify-center mr-3 border border-gray-700">
            <Text className="text-2xl">🤖</Text>
          </View>
          <View className="flex-1">
            <Text className="text-white font-bold text-base">不知道读什么？</Text>
            <Text className="text-gray-400 text-xs">让 AI 助手为您个性化推荐书籍</Text>
          </View>
          <View className="bg-primary px-3 py-1 rounded-full">
            <Text className="text-white text-xs font-bold">提问</Text>
          </View>
        </TouchableOpacity>

        {/* Popular Books */}
        <View className="mt-2">
          <SectionHeader title="热门借阅" moreLink onMorePress={() => console.log('More Books')} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
            <BookCard title="三体" author="刘慈欣" coverColor="bg-gray-800" />
            <BookCard title="百年孤独" author="加西亚·马尔克斯" coverColor="bg-yellow-100" />
            <BookCard title="人类简史" author="尤瓦尔·赫拉利" coverColor="bg-red-100" />
            <BookCard title="活着" author="余华" coverColor="bg-green-100" />
          </ScrollView>
        </View>

        {/* Community / Square */}
        <View className="mt-8 mb-8">
          <SectionHeader title="思想广场" moreLink onMorePress={() => router.push('/community')} />
          <TopicCard 
            hot 
            title="如何高效阅读一本书？" 
            content="最近读了《如何阅读一本书》，感觉受益匪浅，大家有什么好的阅读方法分享吗..." 
          />
          <TopicCard 
            title="图书馆AR导航体验反馈"
            content="今天试用了新的AR导航功能，找书真的方便多了，但是有时候定位会飘..." hot={undefined}          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}