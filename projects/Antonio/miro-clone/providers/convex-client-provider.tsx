"use client";

import React from "react";
import {Authenticated, AuthLoading, ConvexReactClient} from "convex/react";
import {ClerkProvider, useAuth} from "@clerk/nextjs";
import {ConvexProviderWithClerk} from "convex/react-clerk";
import {Loading} from "@/components/auth/loading";

interface ConvexClientProviderProps {
    children: React.ReactNode;
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider = ({children}: ConvexClientProviderProps) => {
    return (
        <ClerkProvider publishableKey="pk_test_c3VyZS1mb3dsLTQuY2xlcmsuYWNjb3VudHMuZGV2JA">
            <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
                <Authenticated>
                    {children}
                </Authenticated>
                <AuthLoading>
                    <Loading/>
                </AuthLoading>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
};    