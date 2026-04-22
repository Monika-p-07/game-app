import React, { useState, useEffect } from 'react';
import { useGame } from '../hooks/useGame';
import type { Choice } from '../hooks/useGame';
import ChoiceButton from '../components/ChoiceButton';
import Scoreboard from '../components/Scoreboard';
import RoundResult from '../components/RoundResult';
import PlayerSetup from '../components/PlayerSetup';
import { saveGame } from '../api/api';

const GamePage: React.FC = () => {
  const [players, setPlayers] = useState<{ p1: string; p2: string } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const {
    currentRound,
    p1Choice,
    p2Choice,
    rounds,
    scores,
    gameOver,
    winner,
    revealRound,
    makeChoice,
    nextRound,
    resetGame
  } = useGame(players?.p1 || '', players?.p2 || '');

  const handleStart = (p1: string, p2: string) => {
    setPlayers({ p1, p2 });
  };

  useEffect(() => {
    if (gameOver && winner && players && !isSaving) {
      const saveData = async () => {
        setIsSaving(true);
        try {
          await saveGame({
            player1_name: players.p1,
            player2_name: players.p2,
            winner: winner === 'Tie' ? 'Tie' : winner,
            player1_score: scores.p1,
            player2_score: scores.p2,
            rounds: rounds.map(r => ({
              p1_choice: r.p1_choice,
              p2_choice: r.p2_choice,
              result: r.result
            }))
          });
        } catch (err) {
          console.error('Failed to save game:', err);
        }
      };
      saveData();
    }
  }, [gameOver, winner, players, scores, rounds]);

  if (!players) {
    return <PlayerSetup onStart={handleStart} />;
  }

  if (gameOver && winner && revealRound) {
    // Show final winner view
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="text-center space-y-4 fade-in">
          <div className="text-sm font-bold text-indigo uppercase tracking-widest">Tournament Complete</div>
          <h1 className="text-6xl font-black text-dark">
            {winner === 'Tie' ? "It's a Draw!" : `${winner} Wins!`}
          </h1>
          <div className="text-2xl text-gray-400 font-medium pt-4">
            Final Score: {scores.p1} - {scores.p2}
          </div>
          <div className="pt-12 flex gap-4 justify-center">
            <button onClick={resetGame} className="btn btn-primary px-8 py-4">Play Again</button>
            <button onClick={() => setPlayers(null)} className="btn btn-outline px-8 py-4">New Players</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Scoreboard 
        p1Name={players.p1} 
        p2Name={players.p2} 
        p1Score={scores.p1} 
        p2Score={scores.p2} 
        currentRound={currentRound}
      />

      {revealRound ? (
        <RoundResult 
          p1Choice={rounds[rounds.length - 1].p1_choice}
          p2Choice={rounds[rounds.length - 1].p2_choice}
          result={rounds[rounds.length - 1].result}
          p1Name={players.p1}
          p2Name={players.p2}
          onNext={nextRound}
          isGameOver={currentRound >= 6}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start py-8">
          {/* Player 1 Section */}
          <div className="space-y-6">
            <h2 className="text-center font-bold text-dark uppercase tracking-wider">{players.p1}</h2>
            <div className="grid grid-cols-3 gap-3">
              {(['Stone', 'Paper', 'Scissors'] as Choice[]).map((c) => (
                <ChoiceButton
                  key={c}
                  choice={c}
                  onClick={() => makeChoice(1, c)}
                  selected={p1Choice === c}
                  disabled={!!p1Choice}
                />
              ))}
            </div>
            {p1Choice && (
              <div className="text-center text-xs font-bold text-indigo bg-indigo/5 py-2 rounded uppercase tracking-widest fade-in">
                Choice Hidden
              </div>
            )}
          </div>

          {/* Player 2 Section */}
          <div className="space-y-6">
            <h2 className="text-center font-bold text-dark uppercase tracking-wider">{players.p2}</h2>
            <div className="grid grid-cols-3 gap-3">
              {(['Stone', 'Paper', 'Scissors'] as Choice[]).map((c) => (
                <ChoiceButton
                  key={c}
                  choice={c}
                  onClick={() => makeChoice(2, c)}
                  selected={p2Choice === c}
                  disabled={!!p2Choice}
                />
              ))}
            </div>
            {p2Choice && (
              <div className="text-center text-xs font-bold text-indigo bg-indigo/5 py-2 rounded uppercase tracking-widest fade-in">
                Choice Hidden
              </div>
            )}
          </div>
        </div>
      )}

      {!revealRound && (
        <div className="mt-12 text-center text-gray-400 text-sm italic">
          {!p1Choice && !p2Choice ? "Waiting for both players..." : 
           p1Choice && !p2Choice ? `Waiting for ${players.p2}...` : 
           !p1Choice && p2Choice ? `Waiting for ${players.p1}...` : ""}
        </div>
      )}
    </div>
  );
};

export default GamePage;
