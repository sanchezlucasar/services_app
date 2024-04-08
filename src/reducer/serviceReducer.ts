// Define el tipo de acción para actualizar tanto el servicio como el turno seleccionados
type Action = { type: 'SET_SERVICE', id: number } | { type: 'SET_AVAILABLE_SHIFT', serviceId: number, shift: string };

// Define el nuevo tipo de estado que incluye tanto el servicio seleccionado como el turno seleccionado
type State = { selectedService: number, selectedAvailableShift: { serviceId: number, shift: string } };

// Define el reducer que actualiza el estado basado en las acciones
const selectedServicesReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_SERVICE': {
            return { ...state, selectedService: action.id };
        }
        case 'SET_AVAILABLE_SHIFT':
            return { ...state, selectedAvailableShift: { serviceId: action.serviceId, shift: action.shift } };
        default:
            return state;
    }
};

export default selectedServicesReducer;
