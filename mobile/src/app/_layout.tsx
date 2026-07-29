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
import '../global.css';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Load the fonts before rendering the app!
  const [fontsLoaded] = useFonts({
    'PlusJakarta-Regular': PlusJakartaSans_400Regular,
    'PlusJakarta-Medium': PlusJakartaSans_500Medium,
    'PlusJakarta-SemiBold': PlusJakartaSans_600SemiBold,
    'PlusJakarta-Bold': PlusJakartaSans_700Bold,
    'PlusJakarta-ExtraBold': PlusJakartaSans_800ExtraBold,
  });

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

      <StatusBar
        style={colorScheme === 'dark' ? "light" : "dark"}
      />

      <Stack>
        {/* <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} /> */}
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}