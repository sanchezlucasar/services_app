'use client'
import Table from "@/components/Table";
import { useQuery } from "@tanstack/react-query";

const PageLog = () => {

    const { data: logs, error, isLoading, isError } = useQuery({
        queryKey: ['logs'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3000/logs');
            if (!response.ok) {
                throw new Error('No se pudieron obtener los datos');
            }
            return response.json();
        }
    });
    const headers = ["id", "Detalle"]
    return (

        <div className="flex justify-center items-center  h-screen" >
            <div className=" m-8 p-8 h-screen w-full m-5">

                <h2 className="text-2xl font-bold">
                    Registros
                </h2>

                <div className="row-span-1 my-20">
                    {logs && (<Table data={logs} headers={headers} />)}
                </div>
            </div>
        </div >


    )
}

export default PageLog;
