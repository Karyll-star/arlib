import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Button, StyleSheet } from 'react-native';
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

const { width } = Dimensions.get('window');

// --- Components ---

const TabButton = ({ title, isActive, onPress }) => (
  <TouchableOpacity onPress={onPress} className="flex-1 items-center py-4">
    <Text className={`text-base ${isActive ? 'text-primary font-bold' : 'text-gray-500'}`}>
      {title}
    </Text>
    {isActive && <View className="w-4 h-1 bg-primary rounded-full mt-1" />}
  </TouchableOpacity>
);

const ActionButton = ({ title, onPress }) => (
  <TouchableOpacity 
    onPress={onPress}
    className="bg-primary py-4 px-8 rounded-full shadow-lg elevation-5 items-center"
    style={{ minWidth: 200 }}
  >
    <Text className="text-white text-xl font-medium">{title}</Text>
  </TouchableOpacity>
);

// --- Sections ---

const GPSSection = () => (
  <View className="flex-1 items-center justify-center">
    {/* Concentric Circles Visualization */}
    <View className="w-80 h-80 bg-orange-50 rounded-full items-center justify-center mb-10 opacity-50">
      <View className="w-56 h-56 bg-primary/20 rounded-full items-center justify-center opacity-80">
         <View className="w-4 h-4 bg-primary rounded-full" />
      </View>
    </View>

    <Text className="text-xl font-bold text-text-main mb-10">GPS信号极佳</Text>
    
    <ActionButton title="确认GPS信号" onPress={() => console.log('Confirm GPS')} />
  </View>
);

const BluetoothSection = () => (
  <View className="flex-1 items-center justify-center">
    {/* Bluetooth Visualization */}
    <View className="w-80 h-80 bg-orange-50 rounded-full items-center justify-center mb-10 opacity-50">
      <View className="w-40 h-40 bg-primary/20 rounded-full items-center justify-center opacity-80 shadow-sm">
         <Ionicons name="bluetooth" size={64} color="#398779" />
      </View>
    </View>

    <Text className="text-lg text-text-main mb-10">正在搜索附近的 蓝牙信号</Text>
    
    <ActionButton title="手动连接" onPress={() => console.log('Manual Connect')} />
  </View>
);

const QRCodeSection = ({ isActive }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const scanLineY = useSharedValue(0);

  useEffect(() => {
    if (isActive && permission?.granted) {
      scanLineY.value = withRepeat(
        withTiming(250, { duration: 2500, easing: Easing.linear }),
        -1,
        true
      );
    } else {
      scanLineY.value = 0;
    }
  }, [isActive, permission, scanLineY]);

  const animatedLineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scanLineY.value }],
  }));

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`已扫描类型: ${type}\n数据: ${data}`);
    // Simulate API call reset
    setTimeout(() => setScanned(false), 2000);
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View className="flex-1 bg-black" />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center px-4">
        <Text className="text-text-main text-lg text-center mb-4">
          我们需要您的许可才能使用摄像头进行扫码。
        </Text>
        <Button onPress={requestPermission} title="授予摄像头权限" color="#398779" />
      </View>
    );
  }

  return (
    <View className="flex-1 w-full bg-black relative">
      {isActive && (
        <CameraView
          style={StyleSheet.absoluteFillObject}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
        />
      )}

      <View style={StyleSheet.absoluteFillObject} className="items-center justify-center">
         {/* The Frame */}
         <View className="w-64 h-64 border-2 border-white/30 relative items-center justify-center bg-transparent">
            {/* Corner Markers */}
            <View className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary" />
            <View className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary" />
            <View className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary" />
            <View className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary" />
            
            {/* Animated Scan Line */}
            <Animated.View 
              style={[
                {
                  width: '90%', 
                  height: 2, 
                  backgroundColor: '#398779',
                  shadowColor: '#398779',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 1,
                  shadowRadius: 10,
                  elevation: 5,
                  position: 'absolute',
                  top: 0,
                }, 
                animatedLineStyle
              ]}
            />
         </View>
         
         <Text className="text-white text-lg font-medium mt-8 shadow-md">
           请将二维码放入框内
         </Text>
      </View>
    </View>
  );
};

// --- Main Screen ---

export default function SignInScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('gps'); // 'gps' | 'bluetooth' | 'qr'

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center p-4 z-10 bg-background">
        <TouchableOpacity onPress={() => router.back()} className="p-2 mr-4">
          <Ionicons name="arrow-back" size={24} color="#2C3333" />
        </TouchableOpacity>
        <Text className="text-3xl text-text-main flex-1 text-center font-medium pr-10">入馆签到</Text>
      </View>

      {/* Tabs */}
      <View className="flex-row justify-around px-4 mb-2 bg-background z-10 shadow-sm pb-2">
        <TabButton 
          title="GPS定位" 
          isActive={activeTab === 'gps'}
          onPress={() => setActiveTab('gps')} 
        />
        <TabButton 
          title="蓝牙定位" 
          isActive={activeTab === 'bluetooth'}
          onPress={() => setActiveTab('bluetooth')} 
        />
        <TabButton 
          title="二维码" 
          isActive={activeTab === 'qr'}
          onPress={() => setActiveTab('qr')} 
        />
      </View>

      {/* Content */}
      <View className="flex-1 overflow-hidden rounded-t-3xl mt-[-10px] bg-white">
        {activeTab === 'gps' && <GPSSection />}
        {activeTab === 'bluetooth' && <BluetoothSection />}
        {activeTab === 'qr' && <QRCodeSection isActive={activeTab === 'qr'} />}
      </View>
    </SafeAreaView>
  );
}