'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface PersonDetails {
  code: string;
  name: string;
  age: string;
  job: string;
}

interface ApiResponse {
  person_details: PersonDetails;
}

export default function Home() {
  const [data, setData] = useState<PersonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      const response = await axios.get<ApiResponse>(`${apiUrl}/api/demo`);
      setData(response.data.person_details);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          <h1 className="text-5xl font-bold text-white text-center mb-8 drop-shadow-lg">
            🎓 Student Information
          </h1>

          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-500/20 backdrop-blur border border-red-400 text-white px-6 py-4 rounded-2xl mb-6">
              <p className="font-semibold">❌ Error: {error}</p>
              <p className="text-sm mt-2">Make sure backend server is running on port 3000</p>
            </div>
          )}

          {data && !loading && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">🆔</span>
                  <div>
                    <p className="text-white/70 text-sm font-medium">Student Code</p>
                    <p className="text-white text-2xl font-bold">{data.code}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">👤</span>
                  <div>
                    <p className="text-white/70 text-sm font-medium">Name</p>
                    <p className="text-white text-2xl font-bold">{data.name}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">🎂</span>
                  <div>
                    <p className="text-white/70 text-sm font-medium">Age</p>
                    <p className="text-white text-2xl font-bold">{data.age} years old</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">💼</span>
                  <div>
                    <p className="text-white/70 text-sm font-medium">Occupation</p>
                    <p className="text-white text-2xl font-bold">{data.job}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <button
              onClick={fetchData}
              disabled={loading}
              className="bg-white/20 hover:bg-white/30 disabled:bg-white/10 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 border-2 border-white/40 hover:border-white/60 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 backdrop-blur-md"
            >
              {loading ? '🔄 Loading...' : '🔄 Refresh Data'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-white/70 text-sm">
              API: <span className="font-mono bg-white/20 px-3 py-1 rounded-lg">GET /api/demo</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
