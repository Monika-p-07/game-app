import React from 'react';
import type { Choice, Result } from '../hooks/useGame';

interface RoundResultProps {
  p1Choice: Choice;
  p2Choice: Choice;
  result: Result;
  p1Name: string;
  p2Name: string;
  onNext: () => void;
  isGameOver: boolean;
}

const RoundResult: React.FC<RoundResultProps> = ({ 
  p1Choice, 
  p2Choice, 
  result, 
  p1Name, 
  p2Name, 
  onNext,
  isGameOver
}) => {
  const getResultMessage = () => {
    if (result === 'Tie') return "It's a Tie!";
    if (result === 'P1 Wins') return `${p1Name} wins the round!`;
    return `${p2Name} wins the round!`;
  };

  const getChoiceIcon = (choice: Choice) => {
    switch (choice) {
      case 'Stone': return '🪨';
      case 'Paper': return '📄';
      case 'Scissors': return '✂️';
    }
  };

  return (
    <div className="fade-in flex flex-col items-center gap-8 py-8 border-y border-gray-100 my-8">
      <div className="flex items-center justify-center gap-12 sm:gap-24">
        <div className="flex flex-col items-center gap-2">
          <span className="text-5xl">{getChoiceIcon(p1Choice)}</span>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">{p1Name}</span>
        </div>
        <div className="text-xl font-bold text-gray-200">VS</div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-5xl">{getChoiceIcon(p2Choice)}</span>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">{p2Name}</span>
        </div>
      </div>
      
      <div className="text-2xl font-bold text-dark">{getResultMessage()}</div>
      
      <button onClick={onNext} className="btn btn-primary px-12">
        {isGameOver ? 'See Final Result' : 'Next Round'}
      </button>
    </div>
  );
};

export default RoundResult;
