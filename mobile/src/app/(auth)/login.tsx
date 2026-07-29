import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import apiClient from '../../api/apiClient';
import * as SecureStore from 'expo-secure-store';
import { Image } from 'expo-image';

export default function LoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!phone || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post('/auth/login', { phone, password });
      const token = response.data.token;
      await SecureStore.setItemAsync('jwt_token', token);

      Alert.alert('Success', 'Logged in successfully!');
      // router.replace('/home'); // Will go here later
    } catch (error: any) {
      Alert.alert('Login Failed', error.response?.data?.error || 'Network error.');
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
        <Text className="font-jakarta-bold text-3xl text-on-background">Welcome Back!</Text>
        <Text className="text-on-surface-variant font-jakarta-medium text-body-md mt-2">Login to your account</Text>
      </View>

      <View className="mb-4">
        <Text className="text-on-background font-jakarta text-label-md mb-2">Mobile Number</Text>
        <TextInput
          className="border border-outline bg-surface-container-low text-on-surface px-4 py-3 rounded-md font-jakarta text-body-md placeholder:text-outline"
          placeholder="Enter mobile number"
          placeholderTextColor="#8d90a0"
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
          placeholder="Enter password"
          placeholderTextColor="#8d90a0"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity className="mt-2 self-end">
          <Text className="text-primary font-jakarta text-label-md">Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        className={`w-full py-4 rounded-md items-center justify-center ${loading ? 'bg-primary/50' : 'bg-primary'}`}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text className="text-on-primary font-jakarta text-headline-md">Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        className="mt-6 items-center"
        onPress={() => router.push('/register')}
      >
        <Text className="text-on-surface-variant font-jakarta text-body-md">
          Don't have an account? <Text className="text-primary font-bold">Register</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
