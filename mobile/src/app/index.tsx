import { useEffect } from 'react';
import Animated, { BounceInUp, SlideInLeft, useSharedValue, ZoomIn } from 'react-native-reanimated';
import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();


  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View className="flex-1 bg-primary items-center justify-center p-margin-page">
      <Animated.View entering={SlideInLeft.duration(800)} className="rounded-full h-16 bg-white w-88 items-center justify-center mb-10">
        <Image
          source={require('../../assets/images/logo.svg')}
          style={{ width: 120, height: 120, }}
          contentFit="contain"
        />
      </Animated.View>

      <Animated.Text className="text-on-primary font-jakarta font-bold text-3xl text-center mb-4 scale-0" entering={ZoomIn.duration(500).delay(200).springify()}>
        DebVolt
      </Animated.Text>
      <Animated.Text entering={BounceInUp} className="text-on-primary font-jakarta text-md font-medium text-center opacity-90">
        Powered By Debnath Enterprise
      </Animated.Text>

      {/* Bottom Footer Text */}
      <View className="absolute bottom-12 items-center w-full">
        <Text className="text-on-primary font-jakarta text-label-md text-center opacity-80">
          Your trusted partner for
        </Text>
        <Text className="text-on-primary font-jakarta text-label-md text-center opacity-80 mt-1">
          E-Rickshaw Parts & Services
        </Text>
      </View>
    </View>
  );
}
