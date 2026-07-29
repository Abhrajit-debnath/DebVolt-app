import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router'; 
import apiClient from '../../api/apiClient';
import { Image } from 'expo-image';

export default function RegisterScreen() {
  const router = useRouter(); 
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !phone || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await apiClient.post('/auth/register', { 
        name, 
        phone, 
        password,
        role: 'CUSTOMER'
      });
      
      Alert.alert('Success', 'Account created! You can now log in.');
      router.back(); 
    } catch (error: any) {
      console.error('Registration Error:', error);
      Alert.alert('Registration Failed', error.response?.data?.error || 'Network error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-background justify-center p-margin-page">
      <View className="items-center mb-10">
        <Image 
          source={require('../../../assets/images/logo.svg')} 
          style={{ width: 80, height: 80, marginBottom: 16 }}
          contentFit="contain"
        />
        <Text className="font-jakarta-bold text-3xl text-on-background">Create Account</Text>
        <Text className="text-on-surface-variant font-jakarta-medium text-body-md mt-2">Join the Debvolt platform</Text>
      </View>

      <View className="mb-4">
        <Text className="text-on-background font-jakarta text-label-md mb-2">Full Name</Text>
        <TextInput
          className="border border-outline bg-surface-container-low text-on-surface px-4 py-3 rounded-md font-jakarta text-body-md placeholder:text-outline"
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View className="mb-4">
        <Text className="text-on-background font-jakarta text-label-md mb-2">Mobile Number</Text>
        <TextInput
          className="border border-outline bg-surface-container-low text-on-surface px-4 py-3 rounded-md font-jakarta text-body-md placeholder:text-outline"
          placeholder="Enter mobile number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          autoCapitalize="none"
        />
      </View>

      <View className="mb-8">
        <Text className="text-on-background font-jakarta text-label-md mb-2">Password</Text>
        <TextInput
          className="border border-outline bg-surface-container-low text-on-surface px-4 py-3 rounded-md font-jakarta text-body-md placeholder:text-outline"
          placeholder="Create a password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity 
        className={`w-full py-4 rounded-md items-center justify-center ${loading ? 'bg-primary/50' : 'bg-primary'}`}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text className="text-on-primary font-jakarta text-headline-md">Register</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        className="mt-6 items-center" 
        onPress={() => router.back()}
      >
        <Text className="text-on-surface-variant font-jakarta text-body-md">
          Already have an account? <Text className="text-primary font-bold">Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
