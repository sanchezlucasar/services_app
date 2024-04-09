import { useState, useEffect, useContext } from 'react';
import CollapseContent from './CollapseContent';
import { toast } from 'react-toastify';
import { Log, Props, Slot } from '@/app/types';
import { SelectedServiceContext } from '../../context/Providers';
import AvailableShifts from './AvailableShifts';
import ProgressBar from './ProgressBar';
import { useQuery } from '@tanstack/react-query';

const Formulario: React.FC<Props> = ({ servicios, slots, dispatch }) => {
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [step, setStep] = useState<number>(1);
    const { state, dispatch: dispatchService } = useContext(SelectedServiceContext);
    const { selectedAvailableShift, selectedService } = state;
    const [progress, setProgress] = useState<number>(0);
    const [selectedShift, setSelectedShift] = useState<string | null>(null); // Agregar estado para el horario seleccionado

    useEffect(() => {
        const totalSteps = 3;
        const calculatedProgress = (step - 1) / (totalSteps - 1) * 100;
        setProgress(calculatedProgress);
    }, [step]);

    const handleNextStep = () => {
        if (step === 1 && selectedService !== 0) {
            setStep(2);
        } else if (step === 2 && selectedAvailableShift.serviceId !== 0 && selectedAvailableShift.shift !== '') {
            setStep(3);
        } else if (step === 3) {
            setStep(4);
        }
    };

    const handleBackStep = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();

        if (step === 4) {
            setStep(3);
        } else if (step === 3) {
            setStep(2);
        } else if (step === 2 && selectedService !== 0) {
            setStep(1);
        }
    }

    const { data: services, error, isLoading, isError } = useQuery({
        queryKey: ['services'],
        queryFn: async () => {
            const response = await fetch(`http://localhost:3001/services/${selectedService}`);
            if (!response.ok) {
                throw new Error('No se pudieron obtener los datos');
            }
            return response.json();
        }
    });

    const slotSelected = slots.find(objeto => objeto.serviceId == selectedService);


    const categoriasUnicas: string[] = servicios !== undefined ? Array.from(new Set(servicios.map(servicio => servicio.category))) : [];

    const registerLog = async (data: any) => {

        try {
            const response = await fetch('http://localhost:3001/logs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Error al enviar la solicitud POST');
            }

            const responseData = await response.json();

            console.log('Respuesta del servidor:', responseData);
        } catch (error) {
            console.error('Error al enviar la solicitud POST:', error);
        }

    };

    const handleConfirmStep = async (slot: any) => {
        try {
            // buscamos el indice que tiene el horario seleccionado para eliminarlo de los disponibles
            const indexToRemove = slot.availableTimeslots.indexOf(selectedAvailableShift.shift);

            (indexToRemove !== -1) ? slot.availableTimeslots.splice(indexToRemove, 1) : console.log("El horario especificado no existe en la lista.");

            const response = await fetch(`http://localhost:3001/slots/${slot.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(slot), //actualizamos los slots, eliminando el horario que se solicitó
            });

            if (!response.ok) toast.error('No se pudo actualizar el horario disponible');
            const data = {
                detalle: `servicio :${services.name}, día: ${slot.date}, hora: ${selectedAvailableShift.shift}`
            };
            registerLog(data);
            toast.success('Se confirmo el Horario correctamente');

        } catch (error) {
            toast.error('Error al actualizar el horario disponible');
        }
    }


    return (
        <>
            <p className='m-2 font-bold'>{step === 1 ? 'Seleccionar Servicio' : step === 2 ? 'Seleccionar Horario' : step === 3 ? 'Confirmar Turno' : ''}</p>
            <ProgressBar progress={progress} />

            <div >
                <div className="border border-gray-500 m-2 p-1">
                    {categoriasUnicas && step === 1 && categoriasUnicas.length > 0 && categoriasUnicas.map((categoria: string, index: number) => {
                        const serviceCategory = servicios.filter(servicio => servicio.category === categoria);
                        return <CollapseContent key={index} id={index} title={categoria} content={serviceCategory} dispatch={dispatchService} />;
                    })}
                    {step === 2 && <AvailableShifts slots={slots} selectedShift={selectedShift} setSelectedShift={setSelectedShift} />}

                    {step === 3 &&
                        <div className='border border-base-500 h-screen' >
                            <div className="flex items-center " >
                                <div className="m-2">
                                    <h1 className="font-bold ">{services?.name}</h1>
                                    <p className="my-2">{services?.description}</p>
                                    <h2 className="font-bold "> Fecha: {slotSelected?.date}, {selectedAvailableShift.shift} </h2>
                                </div>
                            </div >
                        </div>

                    } </div>
                <div className='flex justify justify-between'>
                    <button
                        className="flex float-right btn btn-outline btn-success mx-2"
                        onClick={(e) => handleBackStep(e)}
                        disabled={(step === 1)}
                    >
                        Anterior
                    </button>
                    <button
                        className="flex float-right btn btn-outline btn-success mx-2"
                        onClick={handleNextStep}
                        disabled={(step === 1 && selectedService === 0) || step === 3 || (step === 2 && selectedAvailableShift.serviceId === 0 && selectedAvailableShift.shift === '')}
                        style={{ display: step === 3 ? 'none' : 'inline-block' }}

                    >
                        Siguiente
                    </button>
                    <button
                        className="flex float-right btn btn-outline btn-success mx-2"
                        onClick={slotSelected ? () => handleConfirmStep(slotSelected) : undefined}
                        disabled={step !== 3}
                        style={{ display: step !== 3 ? 'none' : 'inline-block' }}
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </>
    );
};

export default Formulario;
