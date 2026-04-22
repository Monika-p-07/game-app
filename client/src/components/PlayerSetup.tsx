import React, { useState } from 'react';

interface PlayerSetupProps {
  onStart: (p1: string, p2: string) => void;
}

const PlayerSetup: React.FC<PlayerSetupProps> = ({ onStart }) => {
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (p1.trim() && p2.trim() && p1.length <= 20 && p2.length <= 20) {
      onStart(p1.trim(), p2.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-dark">Enter Player Names</h1>
          <p className="mt-2 text-gray-500">6 Rounds. One Winner. Good luck.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="p1" className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                Player 1
              </label>
              <input
                id="p1"
                type="text"
                value={p1}
                onChange={(e) => setP1(e.target.value)}
                maxLength={20}
                required
                placeholder="Enter name"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-indigo transition-colors"
              />
            </div>
            <div>
              <label htmlFor="p2" className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                Player 2
              </label>
              <input
                id="p2"
                type="text"
                value={p2}
                onChange={(e) => setP2(e.target.value)}
                maxLength={20}
                required
                placeholder="Enter name"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-indigo transition-colors"
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="btn btn-primary w-full py-4 text-lg"
          >
            Start Game
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlayerSetup;
