'use client'
import React, { createContext, useReducer } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import selectedServicesReducer from "@/reducer/serviceReducer";

// Crear el contexto
export const SelectedServiceContext = createContext<any>(null);

export default function Providers({
    children
}: {
    children: React.ReactNode
}) {
    const client = new QueryClient();
    const initialState = { selectedService: 0, selectedAvailableShift: { serviceId: 0, shift: "" }, availableShifts: [] };
    const [state, dispatch] = useReducer(selectedServicesReducer, initialState);

    return (
        <SelectedServiceContext.Provider value={{ state, dispatch }}>
            <QueryClientProvider client={client}>
                {children}
            </QueryClientProvider>
        </SelectedServiceContext.Provider>
    );
}
