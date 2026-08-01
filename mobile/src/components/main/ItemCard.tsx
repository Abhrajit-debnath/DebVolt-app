import { Image } from "expo-image";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { Product } from "@/types";

import { Skeleton } from 'moti/skeleton';

const getStockStatus = (stockQuantity: number) => {
    if (stockQuantity === 0) {
        return { text: 'Out of Stock', color: 'bg-error-container', textColor: 'text-on-error-container' };
    } else if (stockQuantity > 0 && stockQuantity <= 10) {
        return { text: `Only ${stockQuantity} left`, color: 'bg-warning-container', textColor: 'text-on-warning-container' };
    } else {
        return { text: 'In Stock', color: 'bg-secondary-container', textColor: 'text-on-secondary-container' };
    }
}

const ItemCard = ({ item }: { item: Product }) => {
    const status = getStockStatus(item.stock);

    return (
      
            <Link href={`/product/${item.id}`} asChild>
            <TouchableOpacity className="bg-surface-container-low rounded-xl p-3 mb-4 mx-2 flex-1 shadow-sm border border-outline-variant">
                <View className="h-32 bg-surface-variant rounded-lg overflow-hidden mb-3">
                    <Image
                        source={{ uri: item.imageUrl ?? undefined }}
                        style={{ width: '100%', height: '100%' }}
                        contentFit="cover"
                    />
                </View>

                {/* Dynamic Status Badge */}
                <View className={`self-start px-2 py-1 rounded-full mb-2 ${status.color}`}>
                    <Text className={`font-jakarta text-[10px] font-bold ${status.textColor}`}>
                        {status.text}
                    </Text>
                </View>

                <Text className="text-on-background font-jakarta-semibold text-body-md" numberOfLines={2}>
                    {item.name}
                </Text>

                {/* Automatically formats the number with Indian commas (e.g. ₹4,500) */}
                <Text className="text-primary font-jakarta-bold text-headline-md mt-1">
                    ₹{item.price.toLocaleString()}
                </Text>
            </TouchableOpacity>
        </Link>
  
        
    );
};

export default ItemCard;
