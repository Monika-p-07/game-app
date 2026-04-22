import React from 'react';

interface ScoreboardProps {
  p1Name: string;
  p2Name: string;
  p1Score: number;
  p2Score: number;
  currentRound: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ p1Name, p2Name, p1Score, p2Score, currentRound }) => {
  return (
    <div className="flex flex-col items-center gap-4 mb-12">
      <div className="text-gray-500 uppercase tracking-widest text-xs font-bold">
        Round {currentRound} of 6
      </div>
      <div className="flex items-center justify-between w-full max-w-md gap-8">
        <div className="flex flex-col items-center flex-1">
          <span className="text-sm font-medium text-gray-500 truncate w-full text-center">{p1Name}</span>
          <span className="text-5xl font-bold text-dark">{p1Score}</span>
        </div>
        <div className="text-2xl font-bold text-gray-300">:</div>
        <div className="flex flex-col items-center flex-1">
          <span className="text-sm font-medium text-gray-500 truncate w-full text-center">{p2Name}</span>
          <span className="text-5xl font-bold text-dark">{p2Score}</span>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
