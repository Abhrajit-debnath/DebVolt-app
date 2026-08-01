// import React, { useRef, useState } from 'react';
// import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
// import { Image } from 'expo-image';
// import { useRouter } from 'expo-router';
// import { Feather } from '@expo/vector-icons';
// import QualityCards from '@/components/QualityCards';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');

// export default function OnboardingScreen() {
//   const router = useRouter();
//   const scrollRef = useRef<ScrollView>(null);
//   const [activeIndex, setActiveIndex] = useState(0);

//   const QualityOptions = [
//     { title: 'Quality Parts', description: 'Genuine and high-quality spare parts for your E-Rickshaw.', iconName: 'award' as const },
//     { title: 'Best Prices', description: 'Affordable prices without compromising on quality.', iconName: 'tag' as const },
//     { title: 'Expert Service', description: 'Trusted repair & support', iconName: 'tool' as const }
//   ];

//   const handleNext = () => {
//     if (activeIndex === 0) {
//       scrollRef.current?.scrollTo({ x: SCREEN_WIDTH, animated: true });
//     } else {
//       router.replace('/login');
//     }
//   };

//   const onScroll = (event: any) => {
//     const slideSize = event.nativeEvent.layoutMeasurement.width;
//     const index = event.nativeEvent.contentOffset.x / slideSize;
//     setActiveIndex(Math.round(index));
//   };

//   return (
//     <View className="flex-1 bg-white relative">

//       {/* 1. FIXED BACKGROUND FOR SLIDE 1 (Fades out when swiping to Slide 2) */}
//       <View className="absolute top-0 left-0 right-0 bottom-0 z-0 scale-110" style={{ opacity: activeIndex === 0 ? 1 : 0 }}>
//         <Image
//           source={require('../../assets/images/onboarding_screen1.png')}
//           style={{ width: '100%', height: '89%' }}
//           contentFit="cover"
//         />
//       </View>

//       {/* 2. FIXED TOP HEADER (Skip Button) */}
//       <View className="w-full flex-row justify-end pt-12 px-margin-page z-20 absolute top-0 left-0 right-0">
//         <TouchableOpacity onPress={() => router.replace('/login')}>
//           <Text className={`${activeIndex === 0 ? 'text-white shadow-sm' : 'text-on-surface-variant'} font-jakarta-semibold text-body-lg p-2`}>
//             Skip
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* 3. SWIPEABLE MIDDLE CONTENT SECTION */}
//       <ScrollView
//         ref={scrollRef}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         onMomentumScrollEnd={onScroll}
//         bounces={false}
//         className="flex-1 z-10"
//       >
//         {/* SLIDE 1 CONTENT */}
//         <View style={{ width: SCREEN_WIDTH }} className="flex-1 pt-24 px-margin-page pb-4">
//           <View className="items-center w-full gap-2 flex-row justify-start">
//             <Image
//               source={require('../../assets/images/logo.svg')}
//               style={{ width: 80, height: 80 }}
//               contentFit="contain"
//             />
//             <View>
//               <Text className="text-surface-container-lowest font-jakarta-extrabold text-5xl text-center">Debvolt</Text>
//               <Text className="font-jakarta-semibold mt-1 text-body-lg capitalize text-surface-container-lowest">powering every ride</Text>
//             </View>
//           </View>

//           <View className="w-full items-center gap-2 my-5">
//             <Text className="text-surface-container-lowest font-jakarta-bold text-2xl text-left self-start">E-Rickshaw Spare parts</Text>
//             <Text className="text-surface-container-lowest self-start font-jakarta-bold text-2xl text-left">& Service Platform</Text>
//           </View>

//           <View className="w-full h-[1px] bg-outline-variant mb-3" />

//           <View className="flex-1">
//             {QualityOptions.map((option, index) => (
//               <QualityCards key={index} title={option.title} description={option.description} iconName={option.iconName} />
//             ))}
//           </View>
//         </View>

//         {/* SLIDE 2 CONTENT */}
//         <View style={{ width: SCREEN_WIDTH }} className="flex-1 pt-24 px-6">
//           <View className="items-center">
//             <Text className="text-3xl font-jakarta-bold text-center text-on-background">Everything Your</Text>
//             <Text className="text-3xl font-jakarta-bold text-center text-primary mt-1">E-Rickshaw Needs</Text>
//             <Text className="text-3xl font-jakarta-bold text-center text-on-background mt-1">in One Place</Text>
//           </View>

//           <View className="items-center flex-1  py-6">
//             <Image
//               source={require('../../assets/images/logo.svg')}
//               style={{ width: "100%", height: "100%" }}
//               contentFit="contain"
//             />
//           </View>

//           <View className="px-4 gap-6 mb-10 flex-1">
//             <View className="flex-row items-center gap-4">
//               <Feather name="check-circle" size={24} color="#208AEF" />
//               <Text className="font-jakarta-semibold text-body-lg text-on-background">Genuine Spare Parts</Text>
//             </View>
//             <View className="flex-row items-center gap-4">
//               <Feather name="tool" size={24} color="#208AEF" />
//               <Text className="font-jakarta-semibold text-body-lg text-on-background">Easy Repair Booking</Text>
//             </View>
//             <View className="flex-row items-center gap-4">
//               <Feather name="truck" size={24} color="#208AEF" />
//               <Text className="font-jakarta-semibold text-body-lg text-on-background">Fast Delivery & Support</Text>
//             </View>
//           </View>
//         </View>
//       </ScrollView>

//       {/* 4. FIXED BOTTOM BUTTON SECTION (Never swipes, stays completely still!) */}
//       <View className={`w-full absolute bottom-0 left-0 right-0 z-20 ${activeIndex === 0 ? 'bg-[#ecf3fb]' : 'bg-white'}`}>

//         {/* Pagination Dots */}
//         <View className="w-full flex-row justify-center gap-2 mb-4 mt-2">
//           <View className={`h-2 rounded-full ${activeIndex === 0 ? 'w-6 bg-primary' : 'w-2 bg-outline-variant'}`} />
//           <View className={`h-2 rounded-full ${activeIndex === 1 ? 'w-6 bg-primary' : 'w-2 bg-outline-variant'}`} />
//         </View>

//         {/* Action Button */}
//         <View className="px-margin-page pb-6">
//           <TouchableOpacity
//             className="w-full bg-primary py-4 rounded-xl items-center justify-center shadow-sm"
//             onPress={handleNext}
//           >
//             <Text className="text-white font-jakarta-semibold text-headline-md">
//               {activeIndex === 0 ? 'Next' : 'Next'}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//     </View>
//   );
// }


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
    <View className="flex-1 bg-white relative">

      <View className="absolute top-0 left-0 right-0 bottom-0 z-0 scale-110">
        <Image
          source={require('../../assets/images/onboarding_screen1.png')}
          style={{ width: '100%', height: '89%' }}
          contentFit="cover"

        />

      </View>


      <View className="flex-1 py-2 px-margin-page z-10">
        {/* Top Section */}
        <View className="w-full flex-row justify-end pt-4">
          <TouchableOpacity onPress={() => router.replace('/login')}>
            <Text className="text-white font-jakarta-semibold text-body-lg p-2 shadow-sm">Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Middle Section */}
        <View className="items-center w-full gap-2 flex-row pt-8 justify-start">
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

        <View className="w-full items-center gap-2 my-5">
          <Text className="text-surface-container-lowest font-jakarta-bold text-2xl text-left self-start">
            E-Rickshaw Spare parts
          </Text>
          <Text className="text-surface-container-lowest self-start font-jakarta-bold text-2xl text-left">& Service Platform</Text>
        </View>

        <View className="w-full h-[1px] bg-outline-variant mb-3" />

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
        <View className="w-full relative left-0 right-0 bottom-6 bg-[#ecf3fb] ">
          <TouchableOpacity
            className="w-full bg-primary py-4 rounded-md items-center justify-center "
            onPress={() => router.replace('/login')}
          >
            <Text className="text-on-primary font-jakarta-semibold text-headline-md">Get Started</Text>
          </TouchableOpacity>
          {/* 
        <Text className="text-outline-variant font-jakarta-medium text-label-sm text-center mt-4">
          By continuing, you agree to our{'\n'}Terms & Conditions and Privacy Policy
        </Text> */}
        </View>

      </View>
    </View>
  );
}

