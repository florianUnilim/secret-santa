import { useState } from "react";
import Snowfall from 'react-snowfall';
import { WelcomeScreen } from "./components/WelcomeScreen";
import { ParticipantInput } from "./components/ParticipantInput";
import { AssignmentDisplay } from "./components/AssignmentDisplay";

export default function App() {
  // Tableau des participants
  const [participants, setParticipants] = useState([]);
  // Tableau des assignments
  const [assignments, setAssignments] = useState([]);
  // Etat de l'application welcome | input | assignments
  const [currentScreen, setCurrentScreen] = useState("welcome");

  // Fonction pour ajouter un participant
  const addParticipant = (name) => {
    setParticipants([...participants, name]);
  };

  // Fonction pour supprimer un participant
  const removeParticipant = (index) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  // Fonction pour distribuer les cadeaux
  const distributeGifts = () => {
    // S'il n'y a pas assez de participants, on affiche une alerte
    if (participants.length < 3) {
      alert("Il faut au moins 3 participants pour faire un Secret Santa !");
      return;
    }

    // On mélange le tableau des participants
    const shuffled = [...participants].sort(() => Math.random() - 0.5);
    // On crée un nouveau tableau d'assignments
    const newAssignments = shuffled.map((giver, index) => ({
      giver,
      receiver: shuffled[(index + 1) % shuffled.length],
    }));

    // On met à jour le state des assignments
    setAssignments(newAssignments);
    // On affiche l'écran des assignments
    setCurrentScreen("assignments");
  };

  // Fonction pour recommencer l'application
  const resetApp = () => {
    setParticipants([]);
    setAssignments([]);
    setCurrentScreen("welcome");
  };

  return (
    
    <div className="container mx-auto bg-gradient-to-l from-red-500 to-red-700 h-screen flex flex-col items-center justify-center">
      
      <div className="w-full max-w-md">
        
        {currentScreen === "welcome" && (
          <WelcomeScreen onStart={() => setCurrentScreen("input")} />
        )}
        {currentScreen === "input" && (
          <div className="flex flex-col bg-white p-8 rounded-lg shadow-lg mx-3 ">
            <h2 className="text-2xl font-bold mb-6 text-center font-base">
              Ajoutez les participants
            </h2>
            <ParticipantInput
              onAddParticipant={addParticipant}
              participants={participants}
              onRemoveParticipant={removeParticipant}
            />
            <div className="mt-6">
              <button className="button w-full" onClick={distributeGifts}>
                Distribuer les cadeaux
              </button>
              <Snowfall />
            </div>
          </div>
        )}
        {currentScreen === "assignments" && (
          <div className="flex flex-col bg-white p-8 rounded-lg shadow-lg mx-3 font-base">
            <Snowfall />
            <h2 className="text-2xl font-bold mb-6 text-center">
              Attributions des cadeaux
            </h2>
            <AssignmentDisplay assignments={assignments} />
            <div className="mt-6">
              <button className="button w-full" onClick={resetApp}>
                Recommencer
              </button>
              <img src="./perenoel.png" alt="pere noel" className="absolute bottom-0 z-10 w-4/5"/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
