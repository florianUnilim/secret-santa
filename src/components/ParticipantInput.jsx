// Ce composant affiche la liste des participants
// Il prend en props le tableau de participants : participants
// Il prend en props une fonction pour ajouter un participant : onAddParticipant
// Il prend en props une fonction pour supprimer un participant : onRemoveParticipant

import { useState } from "react";

export function ParticipantInput({
  participants,
  onAddParticipant,
  onRemoveParticipant,
}) {
  const [currentName, setCurrentName] = useState("");

  const addParticipant = () => {
    // On ajoute le participant seulement si le currentName n'est pas vide
    if (currentName !== "") {
      // Appel de la fonction onAddParticipant avec le nom courant
      onAddParticipant(currentName);
      // Reset du currentName
      setCurrentName("");
    }
  };

  return (
    <div className="">
      <div className="flex space-x-2">
        <input
          type="text"
        className="input flex-grow border-[#B22222] border-2 rounded-full bg-white pl-2 pr-2 "
          placeholder="Entrez un nom"
          value={currentName}
          onChange={(e) => setCurrentName(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addParticipant()}
        />
        <button className="button" onClick={addParticipant}>
          Ajouter
        </button>
      </div>
      <ul className="space-y-2">
        {participants.map((name, index) => (
          <li key={index} className=" flex font-secondary text-2xl p-2 gap-2">
            {name}
            <div className="space-x-2 ">
              <a
                className="text-black-500 hover:text-red-700"
                onClick={() => onRemoveParticipant(index)}
              >
                Supprimer
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
