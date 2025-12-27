import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Colors } from '../../constants/Colors';

// A map of route names to icon names
const ICON_MAP = {
  index: { default: 'home-outline', focused: 'home' },
  ai: { default: 'sparkles-outline', focused: 'sparkles' },
  ar: { default: 'scan-outline', focused: 'scan' },
  community: { default: 'chatbubbles-outline', focused: 'chatbubbles' },
  profile: { default: 'person-outline', focused: 'person' },
};

// Custom animated icon component
const TabBarIcon = ({ name, color, focused }) => {
  const scale = useSharedValue(1);

  React.useEffect(() => {
    scale.value = withSpring(focused ? 1.1 : 1, {
      damping: 10,
      stiffness: 200,
    });
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const iconName = ICON_MAP[name]?.[focused ? 'focused' : 'default'] || 'alert-circle-outline';

  return (
    <Animated.View style={[styles.iconContainer, animatedStyle]}>
      {focused && <View style={styles.activeBackground} />}
      <Ionicons name={iconName} size={26} color={color} />
    </Animated.View>
  );
};


export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: false,
      tabBarActiveTintColor: Colors.primary, 
      tabBarInactiveTintColor: Colors.gray, 
      tabBarStyle: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        height: 70,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 35,
        borderTopWidth: 0,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      tabBarShowLabel: false, // Hide the labels, icons are enough
    }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="index" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="ai"
        options={{
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="ai" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="ar"
        options={{
          tabBarIcon: ({ color, focused }) => (
             <View style={styles.arButton}>
                <Ionicons name={focused ? 'scan-circle' : 'scan-circle-outline'} size={40} color={Colors.white} />
             </View>
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="community" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="profile" color={color} focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  activeBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(57, 135, 121, 0.15)', // primary with low opacity (approximate)
    borderRadius: 30,
  },
  arButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary, 
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: Colors.white,
    transform: [{ translateY: -12 }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
  }
});