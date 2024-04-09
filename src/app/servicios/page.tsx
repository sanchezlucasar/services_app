'use client'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import '../../app/globals.css'
import Form from '@/components/Form';
import { SelectedServiceContext } from '../../../context/Providers';
import { useContext } from 'react';

const ServiciosPage = () => {
    const { selectedService, dispatch } = useContext(SelectedServiceContext);
    const queryClient = useQueryClient();

    const { data: servicios, error, isLoading, isError } = useQuery({
        queryKey: ['servicios'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3001/services');
            if (!response.ok) {
                throw new Error('No se pudieron obtener los datos');
            }
            return response.json();
        }
    });

    const { data: slots, error: errorSlots, isLoading: isLoadinerrorSlots, isError: isErrorSlots } = useQuery({
        queryKey: ['slots'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3001/slots');
            if (!response.ok) {
                throw new Error('No se pudieron obtener los datos');
            }
            return response.json();
        }
    });


    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }


    return (
        <div className="flex justify-center items-center " >
            <div className=" w-full m-5">
                {slots && servicios && <Form servicios={servicios} slots={slots} dispatch={dispatch} />}
            </div>
        </div >
    );
}

export default ServiciosPage;
