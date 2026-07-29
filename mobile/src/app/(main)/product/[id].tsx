import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, View, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PRODUCTS = [
    { id: '1', name: '1000W BLDC Motor', price: '₹4,500', stock: 'In Stock', category: 'Motor', description: 'High performance brushless DC motor suitable for modern electric scooters. Features regenerative braking support and advanced thermal management for long rides.' },
    { id: '2', name: '48V Controller', price: '₹2,200', stock: 'Low Stock', category: 'Controller', description: 'Intelligent motor controller with sine wave technology for smoother acceleration and improved battery efficiency. Fully waterproof housing.' },
    { id: '3', name: '60V Lead Acid Battery', price: '₹8,900', stock: 'In Stock', category: 'Battery', description: 'Durable and long-lasting lead acid battery pack designed for deep discharge cycles. Perfect replacement for standard EVs.' },
    { id: '4', name: 'Front Shocker Set', price: '₹1,500', stock: 'Out of Stock', category: 'Suspension', description: 'Heavy duty hydraulic front suspension forks to absorb maximum road bumps and ensure a buttery smooth ride.' },
];

export default function ItemDetail() {
  const { id } = useLocalSearchParams(); 
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  
  // Find the product, default to the first one if not found
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
  const isOutOfStock = product.stock === 'Out of Stock';
  
  // Use our ternary trick for the native icons!
  const iconColor = colorScheme === 'dark' ? '#e5e2e1' : '#1a1a1a';

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top + 100 }}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        
        {/* Floating Image Header */}
        <View className="bg-surface-variant pt-6 pb-10 rounded-3xl items-center relative mx-margin-page mt-4">
          
          {/* Custom Back Button */}
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="absolute top-4 left-4 w-10 h-10 bg-surface-container-highest rounded-full items-center justify-center shadow-sm z-10 border border-outline-variant"
          >
            <Feather name="arrow-left" size={20} color={iconColor} />
          </TouchableOpacity>

          <Image 
            source={{uri: 'https://www.magnific.com/free-photos-vectors/product-demo'}} 
            style={{ width: 250, height: 250 }} 
            contentFit="contain" 
          />
        </View>

        {/* Product Details Section */}
        <View className="p-margin-page">
          <View className="flex-row justify-between items-start mb-2 mt-2">
            <View className="flex-1 pr-4">
              <Text className="text-on-background font-jakarta-bold text-headline-lg mb-1">{product.name}</Text>
              <Text className="text-on-surface-variant font-jakarta-medium text-body-md">{product.category}</Text>
            </View>
            <Text className="text-primary font-jakarta-bold text-headline-xl">{product.price}</Text>
          </View>

          {/* Stock Badge */}
          <View className={`self-start px-3 py-1.5 rounded-full mt-2 mb-6 ${isOutOfStock ? 'bg-error-container' : 'bg-secondary-container'}`}>
            <Text className={`font-jakarta-bold text-label-md ${isOutOfStock ? 'text-on-error-container' : 'text-on-secondary-container'}`}>
                {product.stock}
            </Text>
          </View>

          <Text className="text-on-background font-jakarta-semibold text-headline-sm mb-2">Description</Text>
          <Text className="text-on-surface font-jakarta text-body-lg leading-relaxed">
            {product.description}
          </Text>
        </View>
      </ScrollView>

      {/* Sticky Bottom Action Bar */}
      <View className="p-4 bg-surface-container-low border-t border-outline-variant" style={{ paddingBottom: Math.max(insets.bottom, 16) }}>
        <TouchableOpacity 
          className={`w-full py-4 rounded-xl items-center justify-center flex-row ${isOutOfStock ? 'bg-surface-variant' : 'bg-primary'}`}
          disabled={isOutOfStock}
        >
          <Feather name="shopping-cart" size={20} color={isOutOfStock ? '#8d90a0' : '#ffffff'} />
          <Text className={`font-jakarta-bold text-headline-md ml-2 ${isOutOfStock ? 'text-outline' : 'text-white'}`}>
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}