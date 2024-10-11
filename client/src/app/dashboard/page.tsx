// src/app/dashboard/page.tsx
"use client";
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/ui/sidebar';
import { DashboardNavBar } from '@/components/ui/DashBoard/DashBoardNavBar';

const Dashboard = () => {
  const router = useRouter(); // Use useRouter for navigation

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      <div className="flex-1">
        {/* Header */}
        <DashboardNavBar />
        <div className="flex justify-around items-center h-screen bg-gray-100">
          {/* Image Classifier Card */}
          <Card className="max-w-xs bg-black text-white rounded-lg shadow-lg p-6">
            <CardHeader className="text-center">
              <h2 className="text-4xl font-bold">Image Classifier</h2>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-300">
                Classify uploaded images based on different categories.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                className="bg-gray-800 text-white hover:bg-gray-600"
                onClick={() => router.push('/card-classifier')} // Use router.push for navigation
              >
                Go to Classifier
              </Button>
            </CardFooter>
          </Card>

          {/* Image Recognizer Card */}
          <Card className="max-w-xs bg-gray-900 text-white rounded-lg shadow-lg p-6">
            <CardHeader className="text-center">
              <h2 className="text-4xl font-bold">Image Recognizer</h2>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-300">
                Upload an image and recognize objects or patterns in it.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                className="bg-gray-800 text-white hover:bg-gray-600"
                onClick={() => router.push('#')} // Use router.push for navigation
              >
                Go to Recognizer
              </Button>
            </CardFooter>
          </Card>

          {/* Placeholder Card */}
          <Card className="max-w-xs bg-gray-950 text-white rounded-lg shadow-lg p-6">
            <CardHeader className="text-center">
              <h2 className="text-4xl font-bold">Coming Soon</h2>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-300">Placeholder for future functionality.</p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button disabled className="bg-gray-700 text-gray-400 cursor-not-allowed">
                Stay Tuned
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
