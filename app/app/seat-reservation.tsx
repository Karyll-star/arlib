import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

// --- Components ---

const ZoneTab = ({ label, active, onPress }) => (
  <TouchableOpacity 
    onPress={onPress}
    className={`px-4 py-2 rounded-lg border mr-3 ${active ? 'bg-gray-800 border-gray-800' : 'bg-white border-gray-300'}`}
  >
    <Text className={`font-medium ${active ? 'text-white' : 'text-gray-500'}`}>{label}</Text>
  </TouchableOpacity>
);

const Seat = ({ id, taken }) => (
  <TouchableOpacity 
    disabled={taken}
    className={`w-12 h-12 rounded-lg border items-center justify-center m-1 ${taken ? 'bg-gray-200 border-gray-200' : 'bg-white border-gray-400'}`}
  >
    <Text className={`text-xs font-bold ${taken ? 'text-gray-400' : 'text-gray-800'}`}>{id}</Text>
  </TouchableOpacity>
);

const TableGroup = ({ label, seats }) => (
  <View className="items-center mb-8 mx-2">
    <View className="flex-row">
       <Seat id={seats[0]} />
       <Seat id={seats[1]} />
    </View>
    <View className="w-24 h-16 bg-white border border-gray-300 rounded-2xl items-center justify-center -my-2 z-[-1]">
       <Text className="text-gray-400 font-bold">{label}</Text>
    </View>
    <View className="flex-row">
       <Seat id={seats[2]} />
       <Seat id={seats[3]} />
    </View>
  </View>
);

export default function SeatReservationScreen() {
  const router = useRouter();
  const [activeZone, setActiveZone] = useState('A');

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center p-4">
        <TouchableOpacity onPress={() => router.back()} className="p-2 mr-4">
          <Text className="text-2xl text-gray-800">←</Text>
        </TouchableOpacity>
        <Text className="text-3xl font-bold text-gray-900 flex-1 text-center pr-10">预约座位</Text>
      </View>

      {/* Zone Tabs */}
      <View className="px-4 mb-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-2">
          <ZoneTab label="A区·静谧" active={activeZone === 'A'} onPress={() => setActiveZone('A')} />
          <ZoneTab label="B区·讨论" active={activeZone === 'B'} onPress={() => setActiveZone('B')} />
          <ZoneTab label="C区·静谧" active={activeZone === 'C'} onPress={() => setActiveZone('C')} />
          <ZoneTab label="D区·窗景" active={activeZone === 'D'} onPress={() => setActiveZone('D')} />
        </ScrollView>
      </View>

      {/* Map Area */}
      <ScrollView className="flex-1 bg-gray-50 p-4" contentContainerStyle={{ paddingBottom: 40 }}>
        
        <View className="flex-row justify-between mb-2">
           {/* Left Shelf Placeholder */}
           <View className="w-8 h-64 bg-teal-600 rounded-full opacity-80" />
           
           <View className="flex-1 px-4">
             {/* Row 1 */}
             <View className="flex-row justify-around">
               <TableGroup label="A0" seats={['A01', 'A02', 'A03', 'A04']} />
               <TableGroup label="A1" seats={['A11', 'A12', 'A13', 'A14']} />
             </View>
             
             {/* Row 2 */}
             <View className="flex-row justify-around">
               <TableGroup label="A2" seats={['A21', 'A22', 'A23', 'A24']} />
               <TableGroup label="A3" seats={['A31', 'A32', 'A33', 'A34']} />
             </View>

              {/* Row 3 */}
             <View className="flex-row justify-around">
               <TableGroup label="A4" seats={['A41', 'A42', 'A41', 'A43']} />
               <TableGroup label="A5" seats={['A52', 'A52', 'A51', 'A51']} />
             </View>

             {/* Row 4 */}
             <View className="flex-row justify-around">
               <TableGroup label="A6" seats={['A62', 'A64', 'A61', 'A63']} />
               <TableGroup label="A7" seats={['A72', 'A72', 'A71', 'A71']} />
             </View>
           </View>

           {/* Right Shelf Placeholder */}
           <View className="w-16">
              <View className="h-40 border border-gray-400 bg-white rounded-lg mb-4 items-center justify-center">
                 <Text className="text-gray-900 font-bold writing-vertical">书架</Text>
              </View>
              <View className="h-40 border border-gray-400 bg-white rounded-lg items-center justify-center">
                 <Text className="text-gray-900 font-bold writing-vertical">书架</Text>
              </View>
           </View>
        </View>

      </ScrollView>

      {/* Bottom Action Bar (Optional, for confirm) */}
      <View className="p-4 border-t border-gray-200 bg-white">
          <TouchableOpacity className="bg-gray-900 w-full py-4 rounded-full items-center">
             <Text className="text-white font-bold text-lg">确认选座</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}