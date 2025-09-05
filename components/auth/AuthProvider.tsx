"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/stores/authStore";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { initializeAuth, loading, isInitialized } = useAuthStore();

  useEffect(() => {
    // 인증 상태 초기화
    const unsubscribe = initializeAuth();

    // 클린업
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  // 인증 초기화 중일 때 로딩 표시
  if (!isInitialized && loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#111111" }}
      >
        <div className="text-center">
          <div
            className="animate-spin w-12 h-12 border-2 border-t-transparent 
                      rounded-full mx-auto mb-4"
            style={{
              borderColor: "#CCFF00",
              borderTopColor: "transparent",
            }}
          />
          <p style={{ color: "#CCFF00" }} className="text-lg">
            인증 상태를 확인하는 중...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
