import { useAuthStore } from "@/store/authStore";
import { Redirect, useSegments } from "expo-router";
import { useEffect } from "react";

const AuthContext = ({ children }: { children: React.ReactNode }) => {
    const checkSession = useAuthStore((state) => state.checkSession);
    const isAppReady = useAuthStore((state) => state.isAppReady);
    const user = useAuthStore((state) => state.user);
    const segments = useSegments();

    useEffect(() => {
        checkSession();
    }, []);

    if (!isAppReady) return null;

    const inAuthGroup = segments[0] === '(auth)';
    const inOnboarding = segments[0] === 'onboarding';

    if (!user && !inAuthGroup && !inOnboarding) {
        return <Redirect href="/onboarding" />;
    }

    if (user && (inAuthGroup || inOnboarding)) {
        return <Redirect href="/home" />;
    }

    return <>{children}</>;
}

export default AuthContext;
