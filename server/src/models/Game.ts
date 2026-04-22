import mongoose, { Schema, Document } from 'mongoose';

interface IRound {
  p1_choice: string;
  p2_choice: string;
  result: string;
}

export interface IGame extends Document {
  player1_name: string;
  player2_name: string;
  winner: string;
  player1_score: number;
  player2_score: number;
  rounds: IRound[];
  played_at: Date;
}

const GameSchema: Schema = new Schema({
  player1_name: { type: String, required: true },
  player2_name: { type: String, required: true },
  winner: { type: String, required: true },
  player1_score: { type: Number, required: true },
  player2_score: { type: Number, required: true },
  rounds: [
    {
      p1_choice: { type: String, required: true },
      p2_choice: { type: String, required: true },
      result: { type: String, required: true },
    },
  ],
  played_at: { type: Date, default: Date.now },
});

export default mongoose.model<IGame>('Game', GameSchema);
