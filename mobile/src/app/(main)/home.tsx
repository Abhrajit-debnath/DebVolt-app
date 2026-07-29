import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, FlatList, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import ItemCard from '@/components/main/ItemCard';

// Dummy data to populate the grid until we connect your backend

const PRODUCTS = [
  { id: '1', name: '1000W BLDC Motor', price: '₹4,500', stock: 'In Stock', category: 'Motor',  },
  { id: '2', name: '48V Controller', price: '₹2,200', stock: 'Low Stock', category: 'Controller', },
  { id: '3', name: '60V Lead Acid Battery', price: '₹8,900', stock: 'In Stock', category: 'Battery',  },
  { id: '4', name: 'Front Shocker Set', price: '₹1,500', stock: 'Out of Stock', category: 'Suspension', },
];
const CATEGORIES = ['All', 'Motor', 'Battery', 'Controller', 'Suspension'];

export default function HomeScreen() {

  const colorScheme = useColorScheme(); 
  const insets = useSafeAreaInsets();
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on selected category and search query
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
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
          <Feather name="search" size={20}  color={colorScheme === 'dark' ? '#e5e2e1' : '#1a1a1a'}  />
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
              <Text className={`font-jakarta-medium text-body-md ${activeCategory === category ? 'text-on-primary' : 'text-on-surface'}`}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Product Grid */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemCard item={item} />}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 20 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
      />
     
    </View>
  );
}
