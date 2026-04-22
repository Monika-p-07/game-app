import React from 'react';
import type { Choice } from '../hooks/useGame';


// Using alternative icons from lucide that fit Stone, Paper, Scissors
// Lucide doesn't have a perfect "Stone" icon, "Circle" or "Disc" could work, but "Mountain" or similar is okay too.
// I'll use simple icons.

interface ChoiceButtonProps {
  choice: Choice;
  onClick: () => void;
  selected: boolean;
  disabled: boolean;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({ choice, onClick, selected, disabled }) => {
  const getIcon = () => {
    switch (choice) {
      case 'Stone': return '🪨';
      case 'Paper': return '📄';
      case 'Scissors': return '✂️';
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn w-full flex-col gap-2 h-32 border-2 transition-all ${
        selected 
          ? 'border-indigo bg-indigo/5 text-indigo' 
          : 'border-gray-100 hover:border-gray-300 bg-white'
      } ${disabled && !selected ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <span className="text-4xl">{getIcon()}</span>
      <span className="text-sm uppercase tracking-wider font-semibold">{choice}</span>
    </button>
  );
};

export default ChoiceButton;
