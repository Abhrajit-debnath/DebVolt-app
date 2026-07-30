import { Text, View } from "react-native";
import React from 'react';
import { Feather } from '@expo/vector-icons';

type QualityCardsProps = {
    title: string;
    description: string;
    iconName: keyof typeof Feather.glyphMap;
};

const QualityCards = ({ title, description, iconName }: QualityCardsProps) => {
    return (
        <View className="rounded-lg p-4 flex-row items-center gap-4 mb-4">
            <View className="bg-primary-container rounded-lg h-14 w-14 items-center justify-center">
                <Feather name={iconName} size={24} color="#ffff" />
            </View>
            <View className="flex-1">
                <Text className="text-inverse-on-surface font-jakarta-bold text-body-lg">{title}</Text>
                <Text className="text-outline-variant  font-jakarta-medium text-body-md mt-1">{description}</Text>
            </View>
        </View>
    )
}

export default QualityCards;
