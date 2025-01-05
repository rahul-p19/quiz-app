'use client'
import React, { useEffect, useState } from 'react';
import getLeaderboard from './getLeaderboard';
import { StarsBackground } from '@/components/ui/stars-background';

interface user {
  name: string;
  year: string;
  department: string;
  score: number;
}

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<user[]>([]);

  const fetchLeaderboard = async () => {
    try {
      const res = await getLeaderboard();
      setLeaderboard(res);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [])

  return (
    <>
      <StarsBackground className='-z-10' />
      <div className="min-h-screen bg-gradient-to-b from-black/50 via-stone-900/50 to-blue-900/50 flex flex-col items-center py-4 sm:p-10 gap-y-6">
        <h2 className="text-3xl sm:text-5xl text-center font-bold text-white">
          Leaderboard
        </h2>
        <div className="w-5/6 sm:w-full max-w-[100vw] bg-[#00081480] backdrop-blur-sm text-white rounded-sm overflow-hidden border">
          <ul className='grid grid-cols-2 sm:grid-cols-4 text-lg border-b'>
            <li className="px-4 py-2 ">Name</li>
            <li className="px-4 py-2 hidden sm:inline">Year</li>
            <li className="px-4 py-2 hidden sm:inline">Department</li>
            <li className="px-4 py-2 ">Score</li>
          </ul>
          <div>
            {leaderboard.map((user: any, idx: number) => (
              <ul key={idx} className='grid grid-cols-2 sm:grid-cols-4'>
                <li className="px-4 py-2 ">{user.name}</li>
                <li className="px-4 py-2 hidden sm:inline">{user.year}</li>
                <li className="px-4 py-2 hidden sm:inline">{user.department}</li>
                <li className="px-4 py-2 ">{user.score}</li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Leaderboard
