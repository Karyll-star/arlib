import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  Easing 
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function ScanScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [torch, setTorch] = useState(false);
  const [scanned, setScanned] = useState(false);
  
  // Animation value for the scan line
  const scanLineY = useSharedValue(0);

  useEffect(() => {
    if (permission?.granted) {
      scanLineY.value = withRepeat(
        withTiming(width * 0.7, { duration: 2000, easing: Easing.inOut(Easing.quad) }),
        -1,
        true
      );
    }
  }, [permission]);

  const animatedLineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scanLineY.value }],
  }));

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // In a real app, you'd process the ISBN or Shelf ID here
    console.log(`Scanned ${type}: ${data}`);
    // Simulate finding a book
    alert(`识别成功！\n数据内容: ${data}\n正在为您查询图书/书架信息...`);
    setTimeout(() => setScanned(false), 3000);
  };

  if (!permission) return <View className="flex-1 bg-black" />;

  if (!permission.granted) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center px-8">
        <Ionicons name="camera-outline" size={80} color="#e5e7eb" />
        <Text className="text-xl font-bold text-text-main mt-6 mb-2">需要相机权限</Text>
        <Text className="text-gray-500 text-center mb-8">
          为了扫描图书封面或书架二维码，我们需要访问您的摄像头。
        </Text>
        <TouchableOpacity 
          onPress={requestPermission}
          className="bg-primary px-8 py-3 rounded-full"
        >
          <Text className="text-white font-bold">授权相机</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <CameraView
        style={StyleSheet.absoluteFillObject}
        enableTorch={torch}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        className="flex-1"
      />

      {/* Overlay */}
      <View style={StyleSheet.absoluteFillObject} className="justify-between">
        
        {/* Top Bar */}
        <SafeAreaView className="bg-black/30">
           <View className="flex-row items-center justify-between px-6 py-4">
              <TouchableOpacity 
                onPress={() => router.back()}
                className="w-10 h-10 items-center justify-center rounded-full bg-black/20"
              >
                <Ionicons name="close" size={28} color="white" />
              </TouchableOpacity>
              <Text className="text-white text-lg font-bold">扫描图书/书架</Text>
              <TouchableOpacity 
                onPress={() => setTorch(!torch)}
                className={`w-10 h-10 items-center justify-center rounded-full ${torch ? 'bg-accent' : 'bg-black/20'}`}
              >
                <Ionicons name={torch ? "flashlight" : "flashlight-outline"} size={24} color={torch ? "black" : "white"} />
              </TouchableOpacity>
           </View>
        </SafeAreaView>

        {/* Middle: Scan Area */}
        <View className="items-center">
           <View className="w-[70%] aspect-square relative">
              {/* Corner Markers */}
              <View className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-primary rounded-tl-xl" />
              <View className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-primary rounded-tr-xl" />
              <View className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-primary rounded-bl-xl" />
              <View className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-primary rounded-br-xl" />
              
              {/* Scanning Line */}
              <Animated.View 
                style={[
                  {
                    width: '100%', 
                    height: 3, 
                    backgroundColor: '#398779',
                    shadowColor: '#398779',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.8,
                    shadowRadius: 10,
                    elevation: 10,
                  },
                  animatedLineStyle
                ]} 
              />
           </View>
           <Text className="text-white/80 mt-10 text-base font-medium text-center px-10">
             将二维码或图书封面置于框内
           </Text>
        </View>

        {/* Bottom Options */}
        <SafeAreaView className="bg-black/30 pb-10">
           <View className="flex-row justify-center space-x-20 px-10">
              <TouchableOpacity className="items-center">
                 <View className="w-14 h-14 bg-white/10 rounded-full items-center justify-center mb-2 border border-white/10">
                    <Ionicons name="images-outline" size={24} color="white" />
                 </View>
                 <Text className="text-white/60 text-xs">相册导入</Text>
              </TouchableOpacity>
              
              <TouchableOpacity className="items-center">
                 <View className="w-14 h-14 bg-white/10 rounded-full items-center justify-center mb-2 border border-white/10">
                    <Ionicons name="barcode-outline" size={24} color="white" />
                 </View>
                 <Text className="text-white/60 text-xs">手动输入</Text>
              </TouchableOpacity>
           </View>
        </SafeAreaView>
      </View>
    </View>
  );
}