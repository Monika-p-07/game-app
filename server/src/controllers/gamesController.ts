import { Request, Response } from 'express';
import Game from '../models/Game';

export const saveGame = async (req: Request, res: Response) => {
  try {
    const { player1_name, player2_name, winner, player1_score, player2_score, rounds } = req.body;
    
    if (!player1_name || !player2_name) {
      return res.status(400).json({ error: 'Player names are required' });
    }

    const newGame = new Game({
      player1_name,
      player2_name,
      winner,
      player1_score,
      player2_score,
      rounds,
    });

    await newGame.save();
    res.status(201).json(newGame);
  } catch (error) {
    console.error('Error saving game:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getGames = async (req: Request, res: Response) => {
  try {
    const games = await Game.find().sort({ played_at: -1 });
    res.json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
