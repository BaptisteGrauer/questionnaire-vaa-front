"use client"
import React, { useEffect, useState } from 'react';

export default function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL);
            const result = await res.json();

            setData(result);
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) return (
        <h1>Chargement des données...</h1>
    );

    return (
        <div>
            <h1>Liste des éléments</h1>
            <p>Nombre total de réponses : {data.length}</p>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.q1}, {item.q2}, {item.q3}, {item.q4}, {item.q5}, {item.q6}</li>
                ))}
            </ul>
        </div>
    );
}