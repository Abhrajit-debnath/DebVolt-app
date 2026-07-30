import { useAuth } from "@/hooks/auth/useAuth";
import { notify } from "@/notifications/toast";
import { Modal, Text, TouchableOpacity, View } from "react-native"

type ConfirmLogoutModalProps = {
    isVisible: boolean;
    setIsvisible: (visible: boolean) => void;
}

const ConfirmLogoutModal = ({ isVisible, setIsvisible }: ConfirmLogoutModalProps) => {
    const { logoutUser } = useAuth();

    const handleLogout = async () => {
        await logoutUser();
        setIsvisible(false);
        notify("Logged out successfully", "success");
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => setIsvisible(false)}
        >
            <View className="flex-1 justify-center items-center bg-black/80 px-5">
                <View className="bg-surface-container w-full p-6 rounded-3xl items-center shadow-lg">
                    
                    <Text className="text-error font-jakarta-bold text-headline-md mb-2">Confirm Logout</Text>
                    <Text className="text-on-surface-variant font-jakarta-medium text-body-lg mb-8 text-center">
                        Are you sure you want to log out?
                    </Text>
                    
                    <View className="flex-row justify-center w-full">
                        <TouchableOpacity 
                            className="bg-surface-variant rounded-full py-3 px-8 mr-4 flex-1 items-center"
                            onPress={() => setIsvisible(false)}
                        >
                            <Text className="text-on-surface-variant font-jakarta-bold text-label-lg">
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            className="bg-error rounded-full py-3 px-8 flex-1 items-center"
                            onPress={handleLogout}
                        >
                            <Text className="text-on-error font-jakarta-bold text-label-lg">
                                Log Out
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ConfirmLogoutModal;
