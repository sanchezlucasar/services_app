export interface Servicio {
    id: number;
    name: string;
    description: string;
    category: string;
}

export interface ToastProps {
    message: string;
    type: 'error' | 'success';
    onClose: () => void;
}

export interface Servicio {
    id: number;
    name: string;
    description: string;
    category: string;
}

export interface Slot {
    date: string;
    serviceId: number;
    availableTimeslots: string[];
}

export interface Props {
    servicios: Servicio[];
    slots: Slot[];
    dispatch: Dispatch<any>;
}

export interface CollapseContentProps {
    title: string;
    content: any[];
    id: number;
    dispatch: Dispatch<any>;
}

export interface Log {
    id: string;
    servicioId: string;
    timeSlot: string;
}

export interface TableFunctions {
    onSubmit?: (data: any) => void;
    onDelete?: (id: number) => void;
    onUpdate?: (selectedClient: any) => void;
}

export interface TableProps {
    data: any[];
    headers: string[];
    functions?: TableFunctions; // Haciendo que la prop sea opcional
}
