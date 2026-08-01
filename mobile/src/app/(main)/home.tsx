import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, FlatList, useColorScheme, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import ItemCard from '@/components/main/ItemCard';
import { useProducts } from '@/hooks/products/useProducts';
import ProductSkeleton from '@/components/skeleton/ProductSkeleton';

const CATEGORIES = ['All', 'MOTORS', 'BATTERIES', 'CONTROLLERS', 'CHARGERS',
  'WIRING', 'BODY_PARTS', 'ACCESSORIES'];


export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('All');
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  const { loading, products } = useProducts(activeCategory);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product => {
    return product.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top + 100 }}>

      {/* Main Title */}
      <View className="px-margin-page mb-6">
        <Text className="text-on-background font-jakarta-bold text-headline-xl leading-tight">
          Find the best{'\n'}Spare parts & Service
        </Text>
      </View>

      {/* Search Bar */}
      <View className="px-margin-page mb-6">
        <View className="flex-row items-center bg-surface-container-low rounded-lg px-4 py-3 border border-outline-variant">
          <Feather name="search" size={20} color={colorScheme === 'dark' ? '#e5e2e1' : '#1a1a1a'} />
          <TextInput
            className="flex-1 ml-3 font-jakarta text-body-md text-on-background placeholder:text-outline"
            placeholder="Search motors, batteries..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Category Pills */}
      <View className="mb-6">
        <Text className="text-on-background font-jakarta-semibold text-headline-md px-margin-page mb-3">
          Shop by Category
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
        >
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full border ${activeCategory === category ? 'bg-primary border-primary' : 'bg-surface-container-low border-outline-variant'}`}
            >

              <Text className={`font-jakarta-medium capitalize text-body-md ${activeCategory ===
                category ? 'text-on-primary' : 'text-on-surface'}`}>
                {category.replace('_', ' ').toLowerCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Product Grid */}


     {loading ? (                                                                                             
      <View className="flex-row flex-wrap justify-between px-2">                     
        {[1, 2, 3, 4, 5, 6].map((key) => (                                           
          <ProductSkeleton key={key} colorScheme={colorScheme!} />                                            
        ))}                                                                          
      </View>                                                                        
    ) : (                                                                            
      <FlatList                                                                      
        data={filteredProducts}                                                      
        keyExtractor={(item) => item.id}                                             
        renderItem={({ item }) => <ItemCard item={item} />}                          
        numColumns={2}                                                               
        contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 20 }}          
        columnWrapperStyle={{ justifyContent: 'space-between' }}                     
        showsVerticalScrollIndicator={false}                                         
      />                                                                             
    )}        


 
    </View>
  );
}
