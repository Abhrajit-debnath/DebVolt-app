import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, useColorScheme, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useAuthStore } from '@/store/authStore';
import { useAuth } from '@/hooks/auth/useAuth';
import { notify } from '@/notifications/toast';
import ConfirmLogoutModal from '@/components/Auth/ConfirmLogoutModal';


const ProfileOption = ({ icon, title, isDestructive = false, onPress }: { icon: any, title: string, isDestructive?: boolean, onPress?: () => void }) => {
  const colorScheme = useColorScheme();

  // Dynamic colors for normal vs destructive (logout) actions
  const iconColor = isDestructive
    ? (colorScheme === 'dark' ? '#ffb4ab' : '#ba1a1a') // on-error-container
    : (colorScheme === 'dark' ? '#c4c6d0' : '#44474f'); // on-surface-variant

  const textColor = isDestructive
    ? 'text-error font-jakarta-bold'
    : 'text-on-surface font-jakarta-medium';

  return (
    <TouchableOpacity onPress={onPress} className="flex-row items-center justify-between py-4 border-b border-outline-variant">
      <View className="flex-row items-center">
        <View className={`w-10 h-10 rounded-full items-center justify-center mr-4 ${isDestructive ? 'bg-error-container' : 'bg-surface-variant'}`}>
          <Feather name={icon} size={20} color={iconColor} />
        </View>
        <Text className={`text-body-lg ${textColor}`}>{title}</Text>
      </View>
      <Feather name="chevron-right" size={20} color={colorScheme === 'dark' ? '#8d90a0' : '#74777f'} />
    </TouchableOpacity>
  );
};

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();

  const [openLogoutModal, setOpenLogoutModal] = React.useState(false);

  const user = useAuthStore(state => state.user);



  

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top + 100 }}>

      {
        openLogoutModal && (
          <ConfirmLogoutModal isVisible={openLogoutModal} setIsvisible={setOpenLogoutModal} />
        )
      }
      <ScrollView className="flex-1 px-margin-page" showsVerticalScrollIndicator={false}>

        {/* Page Title */}
        <Text className="text-on-background font-jakarta-bold text-headline-xl mb-6">My Profile</Text>

        {/* User Info Card */}
        <View className="bg-primary-container p-5 rounded-3xl flex-row items-center mb-8 shadow-sm">
          <View className="w-16 h-16 bg-primary rounded-full items-center justify-center mr-4 shadow-sm">
            <Feather name="user" size={28} color="#ffffff" />
          </View>
          <View className="flex-1">
            <Text className="text-on-primary-container font-jakarta-bold text-headline-md mb-1">{user?.name || 'User'}</Text>
               <Text className="text-on-primary-container font-jakarta-semibold text-body-sm mb-1">{user?.phone || ''}</Text>
            <Text className="text-on-primary-container/80 font-jakarta-bold text-body-md">{user?.role || ''}</Text>
          </View>
          <TouchableOpacity className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center">
            <Feather name="edit-2" size={18} color={colorScheme === 'dark' ? '#d0bcff' : '#6750a4'} />
          </TouchableOpacity>
        </View>

        {/* Options Menu */}
        <View className="bg-surface-container-low rounded-3xl p-5 mb-8 shadow-sm border border-outline-variant">
          <ProfileOption icon="package" title="My Orders" />
          <ProfileOption icon="map-pin" title="Saved Addresses" />
          <ProfileOption icon="credit-card" title="Payment Methods" />
          <ProfileOption icon="bell" title="Notifications" />
          <ProfileOption icon="settings" title="Settings" />
        </View>

        {/* Logout Section */}
        <View className="bg-surface-container-low rounded-3xl p-5 mb-10 shadow-sm border border-outline-variant">
          <ProfileOption icon="help-circle" title="Help & Support" />
          <ProfileOption icon="log-out" title="Log Out" isDestructive={true} onPress={()=>setOpenLogoutModal(true)} />
        </View>

      </ScrollView>
    </View>
  );
}
