
"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button'; 
import { Input } from '@/components/ui/input';   
import { Label } from '@/components/ui/label';   

type result = {
  _id: string;
  imagePath: string;
  classificationResult: string;
  accuracy: number;
  createdAt: string;
};

const HistoryMainContent = () => {
  const [history, setHistory] = useState<result[]>([]);  
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true); 


  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/images/results');
        const data = await response.json();

        if (data && data.data) {
          setHistory(data.data);  
        }
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);  
      }
    };

    fetchHistory();
  }, []);


  const filteredHistory = history.filter((entry) =>
    entry.classificationResult.toLowerCase().includes(filter.toLowerCase())
  );

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold text-center mb-8">Classification History</h1>

      <div className="flex justify-center mb-6">
        <div className="w-full max-w-md">
          <Label className="block mb-2 text-lg">Search by Classification:</Label>
          <Input
            type="text"
            placeholder="Search classification..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {loading && <p className="text-center">Loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {!loading && filteredHistory.length > 0 ? (
          filteredHistory.map((entry) => (
            <div key={entry._id} className="bg-white rounded-lg shadow-lg p-4">
      
              <img
                src={`http://localhost:5000/${entry.imagePath}`} 
                
                alt={entry.classificationResult}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
                
              <div className="text-center">
                <h2 className="text-xl font-semibold">{entry.classificationResult}</h2>
                <p className="text-gray-600">Accuracy: {entry.accuracy.toFixed(2)}%</p>
                <p className="text-gray-500">Created At: {new Date(entry.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))
        ) : (
          !loading && (
            <p className="col-span-full text-center text-gray-600">
              No classification history found.
            </p>
          )
        )}
      </div>

      {history.length > 0 && (
        <div className="flex justify-center mt-10">
          <Button
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-500"
            onClick={handleClearHistory}
          >
            Clear History
          </Button>
        </div>
      )}
    </div>
  );
};

export default HistoryMainContent;
