import Toast from "react-native-toast-message"

export const notify = (message: string, type: 'success' | 'error' | 'info' = 'info') => {

    Toast.show({
        type: type,
        text1: message,
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 50,
    })
}

