import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import QualityCards from '@/components/QualityCards';

export default function OnboardingScreen() {

  const QualityOptions = [
    {
      title: 'Quality Parts',
      description: 'Genuine and high-quality spare parts for your E-Rickshaw.',
      iconName: 'award' as const,
    },
    {
      title: 'Best Prices',
      description: 'Affordable prices without compromising on quality.',
      iconName: 'tag' as const,
    },
    {
      title: 'Expert Service',
      description: 'Trusted repair & support',
      iconName: 'tool' as const,
    }
  ]
  const router = useRouter();

  return (
    <View className="flex-1 bg-white  py-12 px-margin-page">

      {/* Top Section */}
      <View className="w-full flex-row justify-end pt-4">
        <TouchableOpacity onPress={() => router.replace('/login')}>
          <Text className="text-on-surface-variant font-jakarta-semibold text-body-lg p-2">Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Middle Section */}
      <View className="items-center w-full gap-2 flex-row justify-start">
        <Image
          source={require('../../assets/images/logo.svg')}
          style={{ width: 80, height: 80, }}
          contentFit="contain"
        />
        <View>
          <Text className="text-surface-container-lowest  font-jakarta-extrabold text-5xl text-center">
            Debvolt
          </Text>
          <Text className='font-jakarta-semibold mt-1 text-body-lg capitalize'>powering every ride</Text>
        </View>
      </View>

      <View className="w-full items-center gap-2 my-14">
        <Text className="text-surface-container-lowest font-jakarta-bold text-3xl text-left self-start">
          E-Rickshaw Spare parts
        </Text>
        <Text className="text-surface-container-lowest self-start font-jakarta-bold text-3xl text-left">& Service Platform</Text>
      </View>

      <View className="w-full h-[1px] bg-outline-variant mb-6" />

      <View className="flex-1">
        {QualityOptions.map((option, index) => (
          <QualityCards 
            key={index} 
            title={option.title} 
            description={option.description} 
            iconName={option.iconName} 
          />
        ))}
      </View>


      {/* Bottom Section */}
      <View className="w-full">
        <TouchableOpacity
          className="w-full bg-primary py-4 rounded-md items-center justify-center"
          onPress={() => router.replace('/login')}
        >
          <Text className="text-on-primary font-jakarta-semibold text-headline-md">Get Started</Text>
        </TouchableOpacity>

        <Text className="text-outline-variant font-jakarta-medium text-label-sm text-center mt-4">
          By continuing, you agree to our{'\n'}Terms & Conditions and Privacy Policy
        </Text>
      </View>

    </View>
  );
}
