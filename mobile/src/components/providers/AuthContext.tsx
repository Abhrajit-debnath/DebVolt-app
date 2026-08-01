import { useAuthStore } from "@/store/authStore";
import { Redirect, useSegments, usePathname } from "expo-router";

const AuthContext = ({ children }: { children: React.ReactNode }) => {
    const isAppReady = useAuthStore((state) => state.isAppReady);
    const user = useAuthStore((state) => state.user);
    const segments = useSegments();

    if (!isAppReady) return null;

    const inAuthGroup = segments[0] === '(auth)';
    const inOnboarding = segments[0] === 'onboarding';
    const pathname = usePathname();
    const isRoot = pathname === '/';

    if (!user && !inAuthGroup && !inOnboarding && !isRoot) {
        return <Redirect href="/onboarding" />;
    }

    if (user && (inAuthGroup || inOnboarding)) {
        return <Redirect href="/home" />;
    }

    return <>{children}</>;
}

export default AuthContext;
