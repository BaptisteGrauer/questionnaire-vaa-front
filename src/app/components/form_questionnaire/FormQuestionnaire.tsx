"use client";
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import Check from "@/app/components/icons/check";
import $ from "jquery"

const FormQuestionnaire = () => {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [loading, setLoading] = useState(false);
    const [confirmation, setConfirmation] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({
        'question-1': '',
        'question-2': '',
        'question-3': '',
        'question-4': '',
        'question-5': '',
        'question-6': ''
    });
    const [formKey, setFormKey] = useState(0);  // Utilisé pour forcer le re-render du formulaire

    useEffect(() => {

        const chargement = $("#chargement")

        if (chargement) {
            if (loading) {
                chargement.removeClass("visually-hidden");
            }
            else {
                chargement.addClass("visually-hidden");
            }
        }
    }, [loading]);

    useEffect(() => {

        const confirmationPopup = $("#confirmation")
        confirmationPopup.on('click', () => {setConfirmation(false)})

        if (confirmationPopup) {
            if (confirmation) {
                confirmationPopup.removeClass("visually-hidden");
            }
            else {
                confirmationPopup.addClass("visually-hidden");
            }
        }
    }, [confirmation]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [name]: value
        }));
    };

    const isNextButtonDisabled = () => {
        const currentQuestionKey = `question-${currentIndex}`;
        return !answers[currentQuestionKey];
    };

    const submitHandler = async (form) => {
        form.preventDefault();
        setLoading(true);

        const q1 = Number(answers['question-1']);
        const q2 = Number(answers['question-2']);
        const q3 = Number(answers['question-3']);
        const q4 = Number(answers['question-4']);
        const q5 = Number(answers['question-5']);
        const q6 = Number(answers['question-6']);

        const url = `${apiUrl}?q1=${q1}&q2=${q2}&q3=${q3}&q4=${q4}&q5=${q5}&q6=${q6}`;
        const options = { method: 'POST' };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            console.log(data);
            setConfirmation(true)
        } catch (error) {
            console.error(error);
        }

        // Réinitialiser le formulaire après la soumission
        form.target.reset();
        setAnswers({
            'question-1': '',
            'question-2': '',
            'question-3': '',
            'question-4': '',
            'question-5': '',
            'question-6': ''
        });

        setFormKey((prevKey) => prevKey + 1);  // Changer la clé pour forcer le re-render
        setLoading(false);
        setCurrentIndex(0); // Revenir au début après soumission si nécessaire
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => prevIndex - 1);
    };

    return (
        <div>
            <form className="questionnaire" onSubmit={submitHandler} key={formKey}>
                <div id="carousel-vaa" className="carousel slide">
                    <div className="carousel-inner">
                        <div className={`carousel-item ${currentIndex === 0 ? 'active' : ''}`}>
                            <div className="question">
                                <button id="start-button" onClick={handleNext}>Commencer le questionnaire</button>
                            </div>
                        </div>

                        <div className={`carousel-item ${currentIndex === 1 ? 'active' : ''}`}>
                            <div className="question">
                                <label htmlFor="question-1">À quel genre vous identifiez-vous ?</label>
                                <div>
                                    <div>
                                        <input type="radio" value="1" name="question-1" id="q1-1"
                                               onChange={handleChange} required/>
                                        <label htmlFor="q1-1">Homme</label>
                                    </div>
                                    <div>
                                        <input type="radio" value="2" name="question-1" id="q1-2"
                                               onChange={handleChange} required/>
                                        <label htmlFor="q1-2">Femme</label>
                                    </div>
                                    <div>
                                        <input type="radio" value="3" name="question-1" id="q1-3"
                                               onChange={handleChange} required/>
                                        <label htmlFor="q1-3">Autre / je ne souhaite pas préciser</label>
                                    </div>
                                </div>
                                <div className="form-controls">
                                    <button onClick={handleNext} disabled={isNextButtonDisabled()}>Question suivante
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={`carousel-item ${currentIndex === 2 ? 'active' : ''}`}>
                            <div className="question">
                                <label htmlFor="question-2">Quel âge avez-vous ?</label>
                                <div>
                                    <div>
                                        <input type="radio" value="1" name="question-2" id="q2-1"
                                               onChange={handleChange} required/>
                                        <label htmlFor="q2-1">Entre 12 et 25 ans</label>
                                    </div>
                                    <div>
                                        <input type="radio" value="2" name="question-2" id="q2-2"
                                               onChange={handleChange} required/>
                                        <label htmlFor="q2-2">Entre 26 et 45 ans</label>
                                    </div>
                                    <div>
                                        <input type="radio" value="3" name="question-2" id="q2-3"
                                               onChange={handleChange} required/>
                                        <label htmlFor="q2-3">Entre 46 et 60 ans</label>
                                    </div>
                                    <div>
                                        <input type="radio" value="4" name="question-2" id="q2-4"
                                               onChange={handleChange} required/>
                                        <label htmlFor="q2-4">60 ans et plus</label>
                                    </div>
                                </div>
                                <div className="form-controls">
                                    <button onClick={handlePrev}>Question précédente</button>
                                    <button onClick={handleNext} disabled={isNextButtonDisabled()}>Question suivante
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={`carousel-item ${currentIndex === 3 ? 'active' : ''}`}>
                            <div className="question">
                                <label htmlFor="question-3">Sur une échelle de 1 à 5, 5 étant le meilleur, <br/>à quel
                                    point avez-vous
                                    apprécié cette expérience globale autour du va’a ?</label>
                                <div className="horizontal">
                                    <div>
                                        <input type="radio" value="1" name="question-3" id="q3-1"
                                               onChange={handleChange} required/>
                                        <label htmlFor="q3-1">1</label>
                                    </div>
                                    <div>
                                        <input type="radio" value="2" name="question-3" id="q3-2"
                                               onChange={handleChange} required/>
                                        <label htmlFor="q3-2">2</label>
                                    </div>
                                    <div>
                                        <input type="radio" value="3" name="question-3" id="q3-3"
                                               onChange={handleChange} required/>
                                        <label htmlFor="q3-3">3</label>
                                    </div>
                                    <div>
                                        <input type="radio" value="4" name="question-3" id="q3-4"
                                               onChange={handleChange} required/>
                                        <label htmlFor="q3-4">4</label>
                                    </div>
                                    <div>
                                        <input type="radio" value="5" name="question-3" id="q3-5"
                                               onChange={handleChange} required/>
                                        <label htmlFor="q3-5">5</label>
                                    </div>
                                </div>
                                <div className="form-controls">
                                    <button onClick={handlePrev}>Question précédente</button>
                                    <button onClick={handleNext} disabled={isNextButtonDisabled()}>Question suivante
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={`carousel-item ${currentIndex === 4 ? 'active' : ''}`}>
                            <div className="question">
                                <label htmlFor="question-4">Quelle partie de l’événement avez-vous aimé(e) ?</label>
                                <div>
                                    <div>
                                        <input type="radio" value="1" name="question-4" id="q4-1"
                                               onChange={handleChange} required/>
                                        <label htmlFor="q4-1">Les interactions avec les intervenants</label>
                                    </div>
                                    <div>
                                        <input type="radio" value="2" name="question-4" id="q4-2"
                                               onChange={handleChange} required/>
                                        <label htmlFor="q4-2">Le documentaire</label>
                                    </div>
                                    <div>
                                        <input type="radio" value="3" name="question-4" id="q4-3"
                                               onChange={handleChange} required/>
                                        <label htmlFor="q4-3">Le dispositif interactif</label>
                                    </div>
                                    <div>
                                        <input type="radio" value="4" name="question-4" id="q4-4"
                                               onChange={handleChange} required/>
                                        <label htmlFor="q4-4">L’ambiance sonore</label>
                                    </div>
                                    <div>
                                        <input type="radio" value="5" name="question-4" id="q4-5"
                                               onChange={handleChange} required/>
                                        <label htmlFor="q4-5">Autre</label>
                                    </div>
                                </div>
                                <div className="form-controls">
                                    <button onClick={handlePrev}>Question précédente</button>
                                    <button onClick={handleNext} disabled={isNextButtonDisabled()}>Question suivante
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={`carousel-item ${currentIndex === 5 ? 'active' : ''}`}>
                            <div className="question">
                                <label htmlFor="question-5">Est ce que ça vous a donné envie d’essayer ou même
                                    directement
                                    pratiquer ce sport ?</label>
                                <div>
                                    <div>
                                        <input type="radio" value="1" name="question-5" id="q5-1"
                                               onChange={handleChange} required/>
                                        <label htmlFor="q5-1">Oui</label>
                                    </div>
                                    <div>
                                        <input type="radio" value="2" name="question-5" id="q5-2"
                                               onChange={handleChange} required/>
                                        <label htmlFor="q5-2">À voir</label>
                                    </div>
                                    <div>
                                        <input type="radio" value="3" name="question-5" id="q5-3"
                                               onChange={handleChange} required/>
                                        <label htmlFor="q5-3">Pas vraiment</label>
                                    </div>
                                </div>
                                <div className="form-controls">
                                    <button onClick={handlePrev}>Question précédente</button>
                                    <button onClick={handleNext} disabled={isNextButtonDisabled()}>Question suivante
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={`carousel-item ${currentIndex === 6 ? 'active' : ''}`}>
                            <div className="question">
                                <label htmlFor="question-6">Pensez-vous que ce sport pourrait plaire à quelqu’un dans
                                    votre
                                    entourage ?</label>
                                <div className="horizontal">
                                    <div>
                                        <input type="radio" value="1" name="question-6" id="q6-1"
                                               onChange={handleChange} required/>
                                        <label htmlFor="q6-1">Oui</label>
                                    </div>
                                    <div>
                                        <input type="radio" value="2" name="question-6" id="q6-2"
                                               onChange={handleChange} required/>
                                        <label htmlFor="q6-2">Non</label>
                                    </div>
                                </div>
                                <div className="form-controls">
                                    <button onClick={handlePrev}>Question précédente</button>
                                    <input type="submit" value="Envoyer les réponses"
                                           disabled={isNextButtonDisabled()}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div id="chargement" className="visually-hidden">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            <div id="confirmation" className="visually-hidden">
                <div>
                    <Check/>
                </div>
                <p>Réponse enregistrée avec succès</p>
            </div>
        </div>
    );
};

export default FormQuestionnaire;