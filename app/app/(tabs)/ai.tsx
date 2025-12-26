import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// --- Mock Data & Types ---

const INITIAL_MESSAGES = [
  {
    id: '1',
    text: '你好！我是你的图书馆 AI 助手。你可以问我关于书籍推荐、馆藏查询或者学术资料的问题。',
    sender: 'ai',
    timestamp: '09:41',
    type: 'text',
  },
];

const SUGGESTIONS = [
  '📖 推荐几本关于时间旅行的科幻小说',
  '📍 帮我查找《人类简史》的位置',
  '📝 如何写一篇关于《红楼梦》的论文？',
  '🤔 “存在主义”是什么意思？'
];

const RECOMMENDED_BOOKS = [
  { id: 'b1', title: '时间机器', author: 'H.G. Wells', rating: 4.5, coverColor: 'bg-indigo-100' },
  { id: 'b2', title: '永恒的终结', author: 'Isaac Asimov', rating: 4.8, coverColor: 'bg-purple-100' },
  { id: 'b3', title: '海伯利安', author: 'Dan Simmons', rating: 4.7, coverColor: 'bg-blue-100' },
];

// --- Components ---

const RecommendBookCard = ({ book }) => {
  const router = useRouter();
  return (
    <TouchableOpacity 
      onPress={() => router.push({ pathname: '/book-detail', params: { title: book.title, author: book.author } })}
      className="bg-white p-3 rounded-xl mr-3 w-40 border border-gray-200"
    >
      <View className={`w-full h-32 rounded-lg ${book.coverColor} items-center justify-center mb-2`}>
         <Text className="text-4xl">📕</Text>
      </View>
      <Text className="font-bold text-text-main text-sm mb-1" numberOfLines={1}>{book.title}</Text>
      <Text className="text-xs text-gray-500 mb-1">{book.author}</Text>
      <View className="flex-row items-center">
         <Ionicons name="star" size={12} color="#D4A373" />
         <Text className="text-xs text-gray-600 ml-1 font-bold">{book.rating}</Text>
      </View>
    </TouchableOpacity>
  );
};

const ChatBubble = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <View className={`flex-row mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mr-2 border border-primary/20 self-start mt-1">
           <Text className="text-xl">🤖</Text>
        </View>
      )}
      
      <View 
        className={`max-w-[85%] p-4 rounded-2xl ${
          isUser 
            ? 'bg-primary rounded-tr-none' 
            : 'bg-white rounded-tl-none border border-gray-100 shadow-sm'
        }`}
      >
        {/* Render Text Content */}
        {message.text && (
          <Text className={`text-base leading-6 ${isUser ? 'text-white' : 'text-text-main'}`}>
            {message.text}
          </Text>
        )}

        {/* Render Recommendation Card */}
        {message.type === 'recommendation' && (
          <View className="mt-3">
             <ScrollView horizontal showsHorizontalScrollIndicator={false}>
               {RECOMMENDED_BOOKS.map(book => (
                 <RecommendBookCard key={book.id} book={book} />
               ))}
             </ScrollView>
             <TouchableOpacity className="mt-3 bg-primary/10 py-2 rounded-lg items-center">
                <Text className="text-primary text-xs font-bold">查看更多推荐</Text>
             </TouchableOpacity>
          </View>
        )}
      </View>

      {isUser && (
        <View className="w-10 h-10 bg-gray-200 rounded-full items-center justify-center ml-2 self-start mt-1">
           <Text className="text-xl">👤</Text>
        </View>
      )}
    </View>
  );
};

const SuggestionChip = ({ text, onPress }) => (
  <TouchableOpacity 
    onPress={onPress}
    className="bg-white border border-gray-200 py-2 px-4 rounded-full mr-2 mb-2 shadow-sm"
  >
    <Text className="text-text-main text-sm">{text}</Text>
  </TouchableOpacity>
);

// --- Main Screen ---

export default function AIScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef(null);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const newUserMsg = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputText('');

    // Check if it matches the recommendation trigger (first suggestion)
    const isRecommendationRequest = text.includes('推荐') && text.includes('科幻');

    setTimeout(() => {
      let newAiMsg;
      
      if (isRecommendationRequest) {
        newAiMsg = {
          id: (Date.now() + 1).toString(),
          text: '为您找到以下关于时间旅行的经典科幻小说，均可在馆内借阅：',
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'recommendation',
        };
      } else {
        newAiMsg = {
          id: (Date.now() + 1).toString(),
          text: '这是一个模拟的 AI 回复。在实际应用中，这里会连接到大语言模型 API。',
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'text',
        };
      }
      
      setMessages((prev) => [...prev, newAiMsg]);
    }, 1000);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-4 py-3 bg-background border-b border-gray-200 flex-row justify-between items-center shadow-sm z-10">
        <View>
           <Text className="text-lg font-bold text-primary">询问 AI</Text>
           <Text className="text-xs text-primary/80">● 在线</Text>
        </View>
        <TouchableOpacity 
          onPress={() => setMessages(INITIAL_MESSAGES)}
          className="bg-white p-2 rounded-full border border-gray-100"
        >
           <Text className="text-xs text-text-main font-medium">新对话 ↺</Text>
        </TouchableOpacity>
      </View>
      
      {/* Chat Area */}
      <View className="flex-1">
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ChatBubble message={item} />}
          contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          
          ListFooterComponent={
            messages.length < 3 ? (
              <View className="mt-4">
                <Text className="text-gray-400 text-xs mb-3 text-center">- 猜你想问 -</Text>
                <View className="flex-row flex-wrap justify-center">
                  {SUGGESTIONS.map((s, i) => (
                    <SuggestionChip 
                      key={i} 
                      text={s} 
                      onPress={() => sendMessage(s.substring(2))} // Remove emoji prefix
                    />
                  ))}
                </View>
              </View>
            ) : null
          }
        />
      </View>

      {/* Input Area */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        style={{ marginBottom: 85 }}
      >
        <View className="p-3 bg-background border-t border-gray-200 flex-row items-end">
          <TouchableOpacity 
            className="p-3 mr-2 bg-white rounded-full border border-gray-200"
            onPress={() => router.push('/voice-input')}
          >
            <Ionicons name="mic-outline" size={24} color="#398779" />
          </TouchableOpacity>
          
          <View className="flex-1 bg-white rounded-2xl flex-row items-center px-4 py-2 mr-2 border border-gray-200">
             <TextInput 
                value={inputText}
                onChangeText={setInputText}
                placeholder="输入你的问题..." 
                className="flex-1 text-base max-h-24 text-text-main"
                placeholderTextColor="#9ca3af"
                multiline
                returnKeyType="send"
                onSubmitEditing={() => sendMessage(inputText)}
              />
          </View>

          <TouchableOpacity 
            onPress={() => sendMessage(inputText)}
            className={`p-3 rounded-full ${inputText.trim() ? 'bg-primary' : 'bg-gray-300'}`}
            disabled={!inputText.trim()}
          >
            <Ionicons name="arrow-up" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}