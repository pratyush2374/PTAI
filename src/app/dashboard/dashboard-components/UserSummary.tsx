import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Activity, Flame, Award, Calendar, TrendingUp, Clock } from 'lucide-react';

interface SummaryData {
  totalCaloriesBurnt: number;
  totalCaloriesGained: number;
  summary: string;
}

const UserSummary: React.FC = () => {
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/generate-user-summary');
        if (response.data && response.data.success) {
          setSummaryData(response.data.summary);
        } else {
          setError('Failed to load summary data');
        }
      } catch (err) {
        setError('Error fetching summary data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummaryData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !summaryData) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-600">Unable to load your fitness summary. Please try again later.</p>
      </div>
    );
  }

  // Process summary text for better presentation
  const paragraphs = summaryData.summary.split('\n').filter(p => p.trim() !== '');
  
  // Extract timeline estimate from summary (assumes there's a mention of months)
  const timelineMatch = summaryData.summary.match(/(\d+)[-\s](\d+)\s*months/i);
  const estimatedTimeRange = timelineMatch ? `${timelineMatch[1]}-${timelineMatch[2]} months` : "Coming soon";

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-4xl mx-auto my-6">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
        <h2 className="text-white text-xl font-bold flex items-center">
          <Activity className="mr-2" size={20} />
          Your Weekly Fitness Journey Summary
        </h2>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 flex items-center border border-blue-100">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <Flame className="text-orange-500" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Calories Burnt</p>
              <p className="text-2xl font-bold text-gray-800">{summaryData.totalCaloriesBurnt.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 flex items-center border border-blue-100">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <TrendingUp className="text-green-500" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Estimated Timeline</p>
              <p className="text-2xl font-bold text-gray-800">{estimatedTimeRange}</p>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Award className="text-indigo-500 mr-2" size={20} />
            Personal Summary
          </h3>
          
          <div className="space-y-3">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed">{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Action Items */}
        <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Clock className="text-indigo-500 mr-2" size={20} />
            Recommended Actions
          </h3>
          
          <ul className="space-y-2">
            <li className="flex items-start">
              <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-2 mt-0.5">
                <span className="text-sm font-bold text-indigo-600">1</span>
              </div>
              <span className="text-gray-700">Increase activity level beyond sedentary lifestyle</span>
            </li>
            <li className="flex items-start">
              <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-2 mt-0.5">
                <span className="text-sm font-bold text-indigo-600">2</span>
              </div>
              <span className="text-gray-700">Follow structured program with both cardio and strength training</span>
            </li>
            <li className="flex items-start">
              <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-2 mt-0.5">
                <span className="text-sm font-bold text-indigo-600">3</span>
              </div>
              <span className="text-gray-700">Incorporate core exercises in each workout session</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
        <p className="text-gray-600 text-sm flex items-center">
          <Calendar className="text-gray-500 mr-2" size={16} />
          Your plan will be continuously adjusted based on your performance
        </p>
      </div>
    </div>
  );
};

export default UserSummary;