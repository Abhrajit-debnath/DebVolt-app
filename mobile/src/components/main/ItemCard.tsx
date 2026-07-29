import { Image } from "expo-image";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";


const PRODUCTS = [
    { id: '1', name: '1000W BLDC Motor', price: '₹4,500', stock: 'In Stock', category: 'Motor', },
    { id: '2', name: '48V Controller', price: '₹2,200', stock: 'Low Stock', category: 'Controller', },
    { id: '3', name: '60V Lead Acid Battery', price: '₹8,900', stock: 'In Stock', category: 'Battery', },
    { id: '4', name: 'Front Shocker Set', price: '₹1,500', stock: 'Out of Stock', category: 'Suspension', },
];


const ItemCard = ({ item }: { item: typeof PRODUCTS[0] }) => {
    const isOutOfStock = item.stock === 'Out of Stock';

    return (
        <Link href={`/product/${item.id}`} asChild>
            <TouchableOpacity className="bg-surface-container-low rounded-xl p-3 mb-4 mx-2 flex-1 shadow-sm border border-outline-variant">
                <View className="h-32 bg-surface-variant rounded-lg items-center justify-center mb-3">
            
                    <Image source={{uri: 'https://www.magnific.com/free-photos-vectors/product-demo'}} style={{ width: 60, height: 60 }} contentFit="cover" />

                </View>

                {/* Status Badge */}
                <View className={`self-start px-2 py-1 rounded-full mb-2 ${isOutOfStock ? 'bg-error-container' : 'bg-secondary-container'}`}>
                    <Text className={`font-jakarta text-[10px] font-bold ${isOutOfStock ? 'text-on-error-container' : 'text-on-secondary-container'}`}>
                        {item.stock}
                    </Text>
                </View>

                <Text className="text-on-background font-jakarta-semibold text-body-md" numberOfLines={2}>
                    {item.name}
                </Text>
                <Text className="text-primary font-jakarta-bold text-headline-md mt-1">
                    {item.price}
                </Text>
            </TouchableOpacity>
        </Link>
    );
};

export default ItemCard;
