import { useState, useContext } from "react";
import { SelectedServiceContext } from "../../context/Providers";
import { Slot } from "@/app/types";
import { log } from "console";

const AvailableShifts = ({ slots, selectedShift, setSelectedShift }: { slots: Slot[], selectedShift: string | null, setSelectedShift: (shift: string | null) => void }) => {
    const { state, dispatch: serviceDispatch } = useContext(SelectedServiceContext);
    const { selectedService } = state;

    const handleOnSelectShift = (availableSlot: string, serviceId: number) => {
        setSelectedShift(availableSlot);
        serviceDispatch({ type: 'SET_AVAILABLE_SHIFT', serviceId, shift: availableSlot });
    };

    // Filtramos los datos segun el serviceId 
    const filteredSlots = slots.filter(slot => slot.serviceId == selectedService);

    return (
        <div className="h-screen" >
            {filteredSlots && filteredSlots.length > 0 && filteredSlots.map(dateSlot => (
                <div key={dateSlot.date}>
                    <h2 className="p-1 m-2">{dateSlot.date}</h2>
                    <p className="p-1 m-2">Select Available Shift</p>
                    <div className="grid grid-cols-3 gap-3">
                        {dateSlot.availableTimeslots.map(availableSlot => (
                            <button
                                key={availableSlot}
                                className={`btn btn-outline btn-primary p-1 m-1 ${selectedShift == availableSlot ? 'bg-violet-400 text-white' : ''}`}
                                onClick={() => handleOnSelectShift(availableSlot, dateSlot.serviceId)}
                            >
                                {availableSlot}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
export default AvailableShifts;
