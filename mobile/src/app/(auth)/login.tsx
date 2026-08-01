
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import * as SecureStore from 'expo-secure-store';
import { Image } from 'expo-image';
import { LoginPayload } from '@/types';
import { useAuth } from '@/hooks/auth/useAuth';
import { notify } from '@/notifications/toast';
import Entypo from '@expo/vector-icons/Entypo'
import AntDesign from '@expo/vector-icons/build/AntDesign';
import { useState } from 'react';

export default function LoginScreen() {
  const router = useRouter();
  const { loginUser, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { phone: '', password: '' }
  });

  const onSubmit = async (data: LoginPayload) => {
    try {
      const response = await loginUser({
        ...data,
      });

      await SecureStore.setItemAsync('jwt_token', response.token);

      notify("Logged in successfully!", "success");
      router.replace('/home');
    } catch (error: any) {
      console.error('Login Error:', error);
      notify("Login failed!", "error");
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
        <Controller
          control={control}
          rules={{ required: 'Mobile number is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`border bg-surface-container-low text-on-surface px-4 py-3 rounded-md font-jakarta text-body-md placeholder:text-outline ${errors.phone ? 'border-error' : 'border-outline'}`}
              placeholder="Enter mobile number"
              placeholderTextColor="#8d90a0"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="phone-pad"
              autoCapitalize="none"
              maxLength={10}
            />
          )}
          name="phone"
        />
        {errors.phone && <Text className="text-error font-jakarta text-sm mt-1">{errors.phone.message as string}</Text>}
      </View>

      <View className="mb-8">
        <Text className="text-on-background font-jakarta text-label-md mb-2">Password</Text>
        <Controller
          control={control}
          rules={{ required: 'Password is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`border bg-surface-container-low text-on-surface px-4 py-3 rounded-md font-jakarta text-body-md placeholder:text-outline ${errors.password ? 'border-error' : 'border-outline'}`}
              placeholder="Enter password"
              placeholderTextColor="#8d90a0"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={showPassword}
            />
          )}
          name="password"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="absolute right-4 top-10">
          {
            showPassword ? <Entypo name="eye" size={20} color="#8d90a0" /> : <AntDesign name="eye-invisible" size={20} color="#8d90a0" />
          }

        </TouchableOpacity>





        {errors.password && <Text className="text-error font-jakarta text-sm mt-1">{errors.password.message as string}</Text>}

        <TouchableOpacity className="mt-2 self-end">
          <Text className="text-primary font-jakarta text-label-md">Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        className={`w-full py-4 rounded-md items-center justify-center ${loading ? 'bg-primary/50' : 'bg-primary'}`}
        onPress={handleSubmit(onSubmit)}
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
