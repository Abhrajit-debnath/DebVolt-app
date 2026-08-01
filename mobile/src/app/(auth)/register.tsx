import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import * as SecureStore from 'expo-secure-store';
import { Image } from 'expo-image';
import { useAuth } from '@/hooks/auth/useAuth';
import { RegisterPayload } from '@/types';
import { notify } from '@/notifications/toast';
import { useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo'
import AntDesign from '@expo/vector-icons/build/AntDesign';

export default function RegisterScreen() {
  const { registerUser, loading } = useAuth();
  const router = useRouter();
   const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { name: '', phone: '', password: '' }
  });

  const onSubmit = async (data: RegisterPayload) => {
    try {
      const response = await registerUser({
        ...data,
        role: 'CUSTOMER'
      });


      await SecureStore.setItemAsync('jwt_token', response.token);

      notify("Registered successfully!", "success");
      router.replace('/home');
    } catch (error: any) {
      notify(error.message, "error");
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
        <Controller
          control={control}
          rules={{ required: 'Name is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`border bg-surface-container-low text-on-surface px-4 py-3 rounded-md font-jakarta text-body-md placeholder:text-outline ${errors.name ? 'border-error' : 'border-outline'}`}
              placeholder="Enter your name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}

            />
          )}

          name="name"
        />
        {errors.name && <Text className="text-error font-jakarta text-sm mt-1">{errors.name.message as string}</Text>}
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
              keyboardType="phone-pad"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
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
          rules={{ required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`border bg-surface-container-low text-on-surface px-4 py-3 rounded-md font-jakarta text-body-md placeholder:text-outline ${errors.password ? 'border-error' : 'border-outline'}`}
              placeholder="Create a password"
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
      </View>

      <TouchableOpacity
        className={`w-full py-4 rounded-md items-center justify-center ${loading ? 'bg-primary/50' : 'bg-primary'}`}
        onPress={handleSubmit(onSubmit)}
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
