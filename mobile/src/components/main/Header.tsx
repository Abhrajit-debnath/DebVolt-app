import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

const Header = () => {
    const insets = useSafeAreaInsets();
    return (
        <View
            className="bg-primary px-margin-page pb-5 rounded-b-3xl shadow-sm flex-row justify-between items-center"
            style={{ paddingTop: insets.top + 20 }}
        >
            <TouchableOpacity className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
                <Feather name="menu" size={20} color="#ffffff" />
            </TouchableOpacity>
            <View className="items-center">
                <Text className="font-jakarta-bold text-headline-lg text-white">Debvolt</Text>
                <Text className="font-jakarta-bold text-label-sm text-white/80 uppercase mt-0.5">Marketplace</Text>
            </View>
            <TouchableOpacity className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
                <Feather name="user" size={20} color="#ffffff" />
            </TouchableOpacity>
        </View>
    )
}

export default Header;
