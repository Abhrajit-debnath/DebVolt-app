import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold
} from '@expo-google-fonts/plus-jakarta-sans';
import Toast from 'react-native-toast-message';
import '../global.css';
import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';
import AuthContext from '@/components/providers/AuthContext';

import * as SplashScreen from 'expo-splash-screen';

// Prevent the splash screen from auto-hiding while we load fonts and auth state!
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isAppReady = useAuthStore((state) => state.isAppReady);
  const checkSession = useAuthStore((state) => state.checkSession);

  // Load the fonts before rendering the app!
  const [fontsLoaded] = useFonts({
    'PlusJakarta-Regular': PlusJakartaSans_400Regular,
    'PlusJakarta-Medium': PlusJakartaSans_500Medium,
    'PlusJakarta-SemiBold': PlusJakartaSans_600SemiBold,
    'PlusJakarta-Bold': PlusJakartaSans_700Bold,
    'PlusJakarta-ExtraBold': PlusJakartaSans_800ExtraBold,
  });

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    if (fontsLoaded && isAppReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isAppReady]);

  if (!fontsLoaded || !isAppReady) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar
        style={colorScheme === 'dark' ? "light" : "dark"}
      />
      <>
        <AuthContext>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(main)" options={{ headerShown: false }} />
          </Stack>
        </AuthContext>

        <Toast />
      </>
    </ThemeProvider>
  );
}