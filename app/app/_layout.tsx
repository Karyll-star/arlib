import "../global.css";
import { Stack } from "expo-router";
import React from 'react';
import { Colors } from "../constants/Colors";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ 
      headerShown: false,
      contentStyle: { backgroundColor: Colors.background }
    }} />
  );
}
