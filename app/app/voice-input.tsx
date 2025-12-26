import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function VoiceInputScreen() {
  const router = useRouter();
  const [isListening, setIsListening] = useState(true);
  const pulse = useSharedValue(1);

  useEffect(() => {
    if (isListening) {
      pulse.value = withRepeat(
        withTiming(1.5, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
    }
  }, [isListening]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: 1.5 - pulse.value * 0.5,
  }));

  const handleStop = () => {
    setIsListening(false);
    // Simulate processing
    setTimeout(() => {
      router.back();
    }, 500);
  };

  return (
    <SafeAreaView className="flex-1 bg-background items-center justify-center relative">
      <TouchableOpacity 
        onPress={() => router.back()}
        className="absolute top-10 right-6 z-10 p-2 bg-white border border-gray-200 rounded-full shadow-sm"
      >
        <Ionicons name="close" size={24} color="#2C3333" />
      </TouchableOpacity>

      <View className="items-center">
        <Text className="text-xl font-bold text-text-main mb-2">
          {isListening ? '正在聆听...' : '已停止'}
        </Text>
        <Text className="text-gray-500 mb-16">请说出您想问的问题</Text>

        <View className="relative items-center justify-center">
          {isListening && (
            <Animated.View 
              className="absolute w-40 h-40 bg-primary/20 rounded-full"
              style={animatedStyle}
            />
          )}
          <TouchableOpacity 
            onPress={handleStop}
            className={`w-24 h-24 rounded-full items-center justify-center shadow-lg elevation-5 ${isListening ? 'bg-primary' : 'bg-gray-400'}`}
          >
            <Ionicons name="mic" size={48} color="white" />
          </TouchableOpacity>
        </View>

        {isListening && (
           <TouchableOpacity onPress={handleStop} className="mt-16 bg-white px-6 py-2 rounded-full border border-gray-200">
              <Text className="text-text-main">点击停止</Text>
           </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}