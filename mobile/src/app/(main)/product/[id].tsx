import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, View, ScrollView, TouchableOpacity, useColorScheme, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useProductDetails } from '@/hooks/products/useProductDetails';
import { Skeleton } from 'moti/skeleton';


export default function ItemDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const { loading, product } = useProductDetails(id as string);

  const getStockStatus = (stockQuantity: number) => {
    if (stockQuantity === 0) {
      return { text: 'Out of Stock', color: 'bg-error-container' };
    } else if (stockQuantity > 0 && stockQuantity <= 10) {
      return { text: `Only ${stockQuantity} left`, color: 'bg-warning-container' };
    } else {
      return { text: 'In Stock', color: 'bg-secondary-container' };
    }
  }

  if (loading || !product) {
    return (
      <View className="flex-1 bg-background" style={{ paddingTop: insets.top + 100 }}>
        <View className="flex-1 px-margin-page mt-4">

          {/* Skeleton Floating Image Header */}
          <View className="w-full h-80 rounded-3xl overflow-hidden mb-6">
            <Skeleton colorMode={colorScheme === 'dark' ? 'dark' : 'light'} height="100%" width="100%" />
          </View>

          {/* Skeleton Title & Price Row */}
          <View className="flex-row justify-between items-start mb-2 mt-2">
            <View className="flex-1 pr-4 gap-2">
              <Skeleton colorMode={colorScheme === 'dark' ? 'dark' : 'light'} height={32} width="80%" radius={4} />
              <Skeleton colorMode={colorScheme === 'dark' ? 'dark' : 'light'} height={20} width="40%" radius={4} />
            </View>
            <Skeleton colorMode={colorScheme === 'dark' ? 'dark' : 'light'} height={32} width="25%" radius={4} />
          </View>

          {/* Skeleton Stock Badge */}
          <View className="mt-4 mb-6">
            <Skeleton colorMode={colorScheme === 'dark' ? 'dark' : 'light'} height={30} width={100} radius="round" />
          </View>

          {/* Skeleton Description */}
          <View className="gap-3 mt-4">
            <Skeleton colorMode={colorScheme === 'dark' ? 'dark' : 'light'} height={24} width={140} radius={4} />
            <Skeleton colorMode={colorScheme === 'dark' ? 'dark' : 'light'} height={16} width="100%" radius={4} />
            <Skeleton colorMode={colorScheme === 'dark' ? 'dark' : 'light'} height={16} width="100%" radius={4} />
            <Skeleton colorMode={colorScheme === 'dark' ? 'dark' : 'light'} height={16} width="60%" radius={4} />
          </View>

        </View>

        {/* Skeleton Bottom Action Bar */}
        <View className="p-4 bg-surface-container-low border-t border-outline-variant" style={{ paddingBottom: Math.max(insets.bottom, 16) }}>
          <Skeleton colorMode={colorScheme === 'dark' ? 'dark' : 'light'} height={56} width="100%" radius={12} />
        </View>
      </View>
    );
  }

  const productStock = product.stock;
  const isButtonDisabled = product.stock === 0;
  const iconColor = colorScheme === 'dark' ? '#e5e2e1' : '#1a1a1a';

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top + 100 }}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

        {/* Floating Image Header */}
        <View className="bg-surface-variant  rounded-3xl items-center relative mx-margin-page mt-4">

          {/* Custom Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-4 left-4 w-10 h-10 bg-surface-container-highest rounded-full items-center justify-center shadow-sm z-10 border border-outline-variant"
          >
            <Feather name="arrow-left" size={20} color={iconColor} />
          </TouchableOpacity>
          <View className="w-full h-full overflow-hidden rounded-3xl">
            <Image
              source={{ uri: product.imageUrl ?? undefined }}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
            />
          </View>
        </View>

        {/* Product Details Section */}
        <View className="p-margin-page">
          <View className="flex-row justify-between items-start mb-2 mt-2">
            <View className="flex-1 pr-4">
              <Text className="text-on-background font-jakarta-bold text-headline-lg mb-1">{product.name}</Text>

              <Text className="text-on-surface-variant font-jakarta-medium text-body-md capitalize">
                {product.category.replace("_", " ").toLowerCase()}
              </Text>

            </View>
            <Text className="text-primary font-jakarta-bold text-headline-xl">₹{product.price.toLocaleString()}</Text>
          </View>

          {/* Stock Badge */}
          <View className={`self-start px-3 py-1.5 rounded-full mt-2 mb-6 ${getStockStatus(productStock).color}`}>
            <Text className={`font-jakarta-bold text-label-md ${getStockStatus(productStock).color === 'bg-error-container' ? 'text-on-error-container' : 'text-on-secondary-container'}`}>
              {getStockStatus(productStock).text}
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
          className={`w-full py-4 rounded-xl items-center justify-center flex-row ${isButtonDisabled ? 'bg-surface-variant' : 'bg-primary'}`}
          disabled={isButtonDisabled}
        >
          <Feather name="shopping-cart" size={20} color={isButtonDisabled ? '#8d90a0' : '#ffffff'} />
          <Text className={`font-jakarta-bold text-headline-md ml-2 ${isButtonDisabled ? 'text-outline' : 'text-white'}`}>
            {isButtonDisabled ? 'Out of Stock' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}