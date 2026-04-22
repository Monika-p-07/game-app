import { useState, useEffect } from 'react';

export type Choice = 'Stone' | 'Paper' | 'Scissors';
export type Result = 'P1 Wins' | 'P2 Wins' | 'Tie';

export interface Round {
  p1_choice: Choice;
  p2_choice: Choice;
  result: Result;
}

export const useGame = (player1: string, player2: string) => {
  const [currentRound, setCurrentRound] = useState(1);
  const [p1Choice, setP1Choice] = useState<Choice | null>(null);
  const [p2Choice, setP2Choice] = useState<Choice | null>(null);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [scores, setScores] = useState({ p1: 0, p2: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [revealRound, setRevealRound] = useState(false);

  const determineResult = (c1: Choice, c2: Choice): Result => {
    if (c1 === c2) return 'Tie';
    if (
      (c1 === 'Stone' && c2 === 'Scissors') ||
      (c1 === 'Paper' && c2 === 'Stone') ||
      (c1 === 'Scissors' && c2 === 'Paper')
    ) {
      return 'P1 Wins';
    }
    return 'P2 Wins';
  };

  const makeChoice = (player: 1 | 2, choice: Choice) => {
    if (gameOver) return;

    if (player === 1) {
      setP1Choice(choice);
    } else {
      setP2Choice(choice);
    }
  };

  useEffect(() => {
    if (p1Choice && p2Choice) {
      const res = determineResult(p1Choice, p2Choice);
      const newRound: Round = { p1_choice: p1Choice, p2_choice: p2Choice, result: res };
      
      setRounds(prev => [...prev, newRound]);
      
      if (res === 'P1 Wins') setScores(s => ({ ...s, p1: s.p1 + 1 }));
      if (res === 'P2 Wins') setScores(s => ({ ...s, p2: s.p2 + 1 }));
      
      setRevealRound(true);

      if (currentRound >= 6) {
        setGameOver(true);
      }
    }
  }, [p1Choice, p2Choice]);

  const nextRound = () => {
    if (currentRound < 6) {
      setCurrentRound(currentRound + 1);
      setP1Choice(null);
      setP2Choice(null);
      setRevealRound(false);
    } else {
      // Finalize game
      if (scores.p1 > scores.p2) setWinner(player1);
      else if (scores.p2 > scores.p1) setWinner(player2);
      else setWinner('Tie');
    }
  };

  const resetGame = () => {
    setCurrentRound(1);
    setP1Choice(null);
    setP2Choice(null);
    setRounds([]);
    setScores({ p1: 0, p2: 0 });
    setGameOver(false);
    setWinner(null);
    setRevealRound(false);
  };

  return {
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
  };
};
