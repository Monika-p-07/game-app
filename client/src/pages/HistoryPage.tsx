import React, { useEffect, useState } from 'react';
import { getGames } from '../api/api';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface GameRecord {
  _id: string;
  player1_name: string;
  player2_name: string;
  winner: string;
  player1_score: number;
  player2_score: number;
  rounds: Array<{
    p1_choice: string;
    p2_choice: string;
    result: string;
  }>;
  played_at: string;
}

const HistoryPage: React.FC = () => {
  const [games, setGames] = useState<GameRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getGames();
        setGames(data);
      } catch (err) {
        console.error('Failed to fetch games:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-gray-400 font-medium">Loading history...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-dark">Game History</h1>
        <p className="text-gray-500 mt-2">Past matches and results.</p>
      </div>

      <div className="card overflow-hidden !p-0">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Player 1</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Player 2</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Score</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Winner</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {games.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-400">No games played yet.</td>
              </tr>
            ) : (
              games.map((game) => (
                <React.Fragment key={game._id}>
                  <tr 
                    onClick={() => toggleExpand(game._id)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {formatDate(game.played_at)}
                    </td>
                    <td className="px-6 py-4 font-medium text-dark">{game.player1_name}</td>
                    <td className="px-6 py-4 font-medium text-dark">{game.player2_name}</td>
                    <td className="px-6 py-4 font-bold text-dark">
                      {game.player1_score} - {game.player2_score}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                        game.winner === 'Tie' ? 'bg-gray-100 text-gray-500' : 'bg-indigo/10 text-indigo'
                      }`}>
                        {game.winner === 'Tie' ? 'Draw' : game.winner}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {expandedId === game._id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </td>
                  </tr>
                  {expandedId === game._id && (
                    <tr className="bg-gray-50/50">
                      <td colSpan={6} className="px-6 py-6">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 fade-in">
                          {game.rounds.map((round, idx) => (
                            <div key={idx} className="bg-white p-3 rounded border border-gray-100 shadow-sm flex flex-col items-center gap-2">
                              <div className="text-[10px] font-bold text-gray-400 uppercase">Round {idx + 1}</div>
                              <div className="flex gap-2 items-center">
                                <span title="P1 Choice">{round.p1_choice === 'Stone' ? '🪨' : round.p1_choice === 'Paper' ? '📄' : '✂️'}</span>
                                <span className="text-[10px] font-bold text-gray-200">VS</span>
                                <span title="P2 Choice">{round.p2_choice === 'Stone' ? '🪨' : round.p2_choice === 'Paper' ? '📄' : '✂️'}</span>
                              </div>
                              <div className={`text-[10px] font-bold ${
                                round.result === 'P1 Wins' ? 'text-indigo' : 
                                round.result === 'P2 Wins' ? 'text-indigo' : 'text-gray-400'
                              }`}>
                                {round.result === 'P1 Wins' ? 'P1 W' : round.result === 'P2 Wins' ? 'P2 W' : 'Tie'}
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryPage;
