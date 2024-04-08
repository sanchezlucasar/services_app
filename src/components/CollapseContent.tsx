import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { SelectedServiceContext } from "../../context/Providers";
import { CollapseContentProps } from "@/app/types";

const CollapseContent: React.FC<CollapseContentProps> = ({ title, content }) => {
    const [expanded, setExpanded] = useState(false);
    const { state, dispatch: dispatchService } = useContext(SelectedServiceContext);
    const { selectedService } = state;

    useEffect(() => {
        console.log("selectedService actualizado:", selectedService);
    }, [selectedService]);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement>, id: number) => {
        e.stopPropagation();
        (selectedService === id) ? toast.error("Ese servicio ya se encuentra seleccionado") : dispatchService({ type: 'SET_SERVICE', id });
        console.log(id);
        console.log(selectedService);
    };
    return (
        <div className="border border-base-300 m-1 p-1">
            <div tabIndex={0} className={`collapse collapse-plus bg-base-200 ${expanded ? 'collapse-expanded' : ''}`}>
                <div className="collapse-title text-xl font-medium" onClick={toggleExpanded}>
                    {title}
                </div>
                <div className="collapse-content">
                    {content && content.length > 0 && content.map(detalle => (
                        <div key={detalle.id} className="flex flex-col">
                            <div className="border border-base-300 m-1 p-1">
                                <h1 className="font-bold">{detalle.name}</h1>
                                <p>{detalle.description}</p>
                            </div>
                            <a
                                key={`button-${detalle.id}`} // Agregar una key única para el botón
                                className={`btn-sel btn btn-outline btn-primary ${selectedService === detalle.id ? 'bg-violet-400 text-white' : ''}`}
                                onClick={(e) => handleButtonClick(e, detalle.id)}
                            >
                                {selectedService === detalle.id ? 'Seleccionado' : 'Seleccionar'}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CollapseContent;
