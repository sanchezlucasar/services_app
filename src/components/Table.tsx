'use client'
import { useState } from "react";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import { TableProps } from "@/app/types";

const Table = ({ data, headers, functions }: TableProps) => {
    const [tooltipContent, setTooltipContent] = useState<string>("");

    const { onSubmit, onDelete, onUpdate } = functions || {};

    // Estado para el número de página actual
    const [currentPage, setCurrentPage] = useState(1);

    // Función para cambiar de página
    const handlePageChange = (pageNumber: any) => {
        setCurrentPage(pageNumber);
    };

    // Cálculo de índices de inicio y fin para la paginación
    const itemsPerPage = 5;
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentData = data.slice(firstIndex, lastIndex);

    const segmentStartIndex = (currentPage - 1) * itemsPerPage + 1;
    const segmentEndIndex = Math.min(currentPage * itemsPerPage, data.length);
    const segmentDescription = `Mostrando del ${segmentStartIndex} al ${segmentEndIndex} de ${data.length}`;

    return (
        <div className="table-container ">
            <table className="table" >
                <thead className="bg-violet-400  text-white">
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/2">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className=" bg-white-400 text-left">
                    {currentData.map((item: any, rowIndex: number) => (
                        <tr
                            className="border-neutral-200"
                            key={rowIndex}
                        >
                            {Object.values(item).map((value: any, cellIndex) => (
                                <td key={cellIndex}>
                                    {value.toString()}
                                </td>
                            ))}

                            <td className="p-3 text-center flex justify-center">
                                {onUpdate && (
                                    <button
                                        onClick={() => onUpdate(item)}
                                        className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                                        title="Modificar"
                                    >
                                        <PencilIcon className="w-4 h-4" />
                                    </button>
                                )}

                                {onDelete && (
                                    <button
                                        onClick={() => onDelete(item.id)}
                                        className="bg-red-400 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                                        title="Eliminar"
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
            <div className="flex justify-end mx-20">
                <div>
                    {/* Segmentación de la página */}
                    <p>
                        <button
                            className="mx-2"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <SkipPreviousIcon />
                        </button>
                        <button
                            className="mx-2"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={lastIndex >= data.length}
                        >
                            <SkipNextIcon />
                        </button>
                        {segmentDescription}
                    </p>
                </div>

            </div>
        </div >
    )
}

export default Table
