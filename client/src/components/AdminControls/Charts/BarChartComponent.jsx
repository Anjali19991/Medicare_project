import { useState, useEffect } from 'react';
import { BarChart } from '@tremor/react';
import { useAuth } from "../../../AuthContext";

export function BarChartComponent() {
    const [chartData, setChartData] = useState([]);
    const { token } = useAuth();
    const API_ENDPOINT = 'http://localhost:3000';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                };

                const getResponseData = async (url) => {
                    const response = await fetch(url, { headers });
                    const data = await response.json();
                    return data;
                };

                const registrationsResponse = await getResponseData(`${API_ENDPOINT}/user/getAllUsers`);
                const registrationsData = registrationsResponse || [];

                const registrationsCount = registrationsData.users?.length || 0;

                setChartData(prevData => [
                    // ...prevData,
                    {
                        date: new Date().toISOString(),
                        'Registrations': registrationsCount,
                    },
                ]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        const intervalId = setInterval(fetchData, 1 * 60 * 60 * 1000);

        return () => clearInterval(intervalId);
    }, [token, API_ENDPOINT]);

    const dataFormatter = (number) => Intl.NumberFormat('us').format(number).toString();

    return (
        <BarChart
            data={chartData}
            index="date"
            categories={['Registrations']}
            colors={['teal']}
            valueFormatter={dataFormatter} 
            yAxisWidth={100}
            onValueChange={(v) => console.log(v)}
        />
    );
}
