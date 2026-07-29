import { Stack } from 'expo-router';
import Header from '../../components/main/Header';

export default function MainLayout() {
  return (
    <Stack screenOptions={{ header: () => <Header />, headerTransparent: true }}>
      <Stack.Screen name="home" />
    </Stack>
  );
}
