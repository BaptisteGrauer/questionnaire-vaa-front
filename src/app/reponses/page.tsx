"use client";
import React, {useEffect, useState} from 'react';
import {Pie} from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';

// Enregistrement des composants nécessaires
ChartJS.register(ArcElement, Tooltip, Legend);

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

    if (loading) return <h1>Chargement des données...</h1>;


    // Fonction pour préparer les données pour le graphique
    const prepareChartData = (responses, questionIndex) => {
        const labels = [];
        const counts = {};
        const questionKey = `q${questionIndex}`;
        const responseLabels = questions[questionIndex].reponsesPossibles;

        responses.forEach((response) => {
            const value = response[questionKey];
            if (value !== null && value !== undefined) {
                if (Array.isArray(value)) {
                    value.forEach((v) => {
                        counts[v] = (counts[v] || 0) + 1;
                        if (!labels.includes(v)) {
                            labels.push(v);
                        }
                    });
                } else {
                    counts[value] = (counts[value] || 0) + 1;
                    if (!labels.includes(value)) {
                        labels.push(value);
                    }
                }
            }
        });

        // Convertir les numéros de labels en textes associés
        const fixedColors = [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
        ];

        return {
            labels: labels.map(label => responseLabels[label]), // Utiliser les textes associés
            datasets: [{
                label: `Réponses à la question ${questionIndex}`,
                data: labels.map(label => counts[label] || 0),
                backgroundColor: labels.map((_, index) => fixedColors[index % fixedColors.length]), // Utiliser les couleurs fixes
            }]
        };
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#fff', // Définir la couleur des textes des labels (ici rouge)
                    font: {
                        size: 14 // Optionnel : définir la taille de la police
                    }
                }
            },
            title: {
                display: true,
                text: `Réponses à la question`,
                color: '#0000FF', // Définir la couleur du titre (ici bleu)
                font: {
                    size: 16 // Optionnel : définir la taille de la police pour le titre
                }
            },
        },
    };

    const questions = {
        1: {
            "question": "À quel genre vous identifiez-vous ?",
            "reponsesPossibles": {
                1: "homme",
                2: "femme",
                3: "Autre / je ne souhaite pas préciser"
            }
        },
        2: {
            "question": "Quel âge avez-vous ?",
            "reponsesPossibles": {
                1: "Entre 12 et 25 ans",
                2: "Entre 26 et 45 ans",
                3: "Entre 46 et 60 ans",
                4: "60 ans et plus"
            }
        },
        3: {
            "question": "Sur une échelle de 1 à 5, 5 étant le meilleur, à quel point avez-vous apprécié cette expérience globale autour du va’a ?",
            "reponsesPossibles": {
                1: "1",
                2: "2",
                3: "3",
                4: "4",
                5: "5"
            }
        },
        4: {
            "question": "Quelle partie de l’événement avez-vous aimé(e) ? (plusieurs choix possibles)",
            "reponsesPossibles": {
                1: "Les interactions avec les intervenants",
                2: "Le documentaire",
                3: "Le dispositif interactif",
                4: "L’ambiance sonore",
                5: "Autre"
            }
        },
        5: {
            "question": "Est ce que ça vous a donné envie d’essayer ou même directement pratiquer ce sport ?",
            "reponsesPossibles": {
                1: "Oui",
                2: "À voir",
                3: "Pas vraiment"
            }
        },
        6: {
            "question": "Pensez-vous que ce sport pourrait plaire à quelqu’un dans votre entourage ?",
            "reponsesPossibles": {
                1: "Oui",
                2: "Non"
            }
        }
    }

    return (
        <>
            <div id="page-reponses">
                <header>
                    <h1>Réponses au questionnaire</h1>
                    <p id="nb-reponses">Nombre total de réponses : {data.length}</p>
                </header>
                <div className="liste-reponses">
                    {[1, 2, 3, 4, 5, 6].map((index) => (
                        <div key={index}>
                            <h2>{questions[index].question}</h2>
                            <Pie data={prepareChartData(data, index)} options={options}/>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}