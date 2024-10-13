"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"; // Assuming the Button component is stored under components/ui/button in Next.js
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter } from '@/components/ui/alert-dialog'; // Keeping the AlertDialog the same

export const MainContent = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [classificationResult, setClassificationResult] = useState<string | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false); // Added state for loading

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleImageReset = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setClassificationResult(null);
    setAccuracy(null);
    setImageUrl(''); // Reset image URL
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      console.error('No image selected');
      return;
    }

    const formData = new FormData();
    formData.append('card', selectedImage);
    
    // Start loading
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/cards/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
      console.log(response.json());
      
    setClassificationResult(response.json().classification);
    setAccuracy(response.json().accuracy);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      // Stop loading
      setIsLoading(false);
    }
  };

  const openUploadDialog = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = (source: string) => {
    setOpenDialog(false);
    if (source === "local") {
      document.getElementById('file-input')?.click(); // Trigger local file upload
    } else if (source === "online-url") {
      if (imageUrl) {
        setPreviewUrl(imageUrl); // Set the preview URL to the user-provided image URL
      }
    }
  };

  // Helper function to determine progress bar color based on accuracy level
  const getProgressBarColor = (accuracy: number) => {
    if (accuracy >= 80) {
      return 'bg-green-500'; // Green for high accuracy
    } else if (accuracy >= 50) {
      return 'bg-yellow-500'; // Yellow for moderate accuracy
    } else {
      return 'bg-red-500'; // Red for low accuracy
    }
  };

  return (
    <div className="flex flex-row p-8 space-x-8">
      {/* Left Column for Image Upload */}
      <div className="flex flex-col items-start w-1/2">
        <h1 className="text-3xl font-bold text-black mb-4">Upload an Image</h1>
        <div className="flex items-center mb-4 border border-black rounded-md bg-gray-50 p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-black mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v3a2.5 2.5 0 002.5 2.5h13a2.5 2.5 0 002.5-2.5v-3m-4-6.5l-4-4m0 0l-4 4m4-4v12" />
          </svg>
          <Button
            variant="link"
            onClick={openUploadDialog}
            className="flex-1 p-2 outline-none bg-transparent"
          >
            Upload Image
          </Button>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {previewUrl && (
          <div className="flex flex-col items-center mt-4">
            <h2 className="text-lg font-semibold text-black mb-2">Image Preview:</h2>
            <img
              src={previewUrl}
              alt="Preview"
              className="w-64 h-auto border border-black rounded-md shadow-md"
            />
            <Button
              onClick={handleSubmit}
              className="mt-4 w-40 bg-black text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-gray-900 transition-colors"
            >
              Submit
            </Button>
            <Button
              onClick={handleImageReset}
              className="mt-2 w-40 bg-gray-600 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-gray-700 transition-colors"
            >
              Reset Image
            </Button>
          </div>
        )}

        {isLoading && (
           <div className="mt-4 flex items-center">
           <svg
             className="animate-spin h-5 w-5 mr-3 text-black-600"
             xmlns="http://www.w3.org/2000/svg"
             fill="none"
             viewBox="0 0 24 24"
           >
             <circle
               className="opacity-25"
               cx="12"
               cy="12"
               r="10"
               stroke="currentColor"
               strokeWidth="4"
             ></circle>
             <path
               className="opacity-75"
               fill="currentColor"
               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
             ></path>
           </svg>
           <p className="text-lg font-medium text-black-600">Processing image...</p>
         </div>
        )}
      </div>

      {/* Right Column for Classification Result */}
      <div className="flex flex-col items-start w-1/2">
        <h2 className="text-2xl font-semibold text-black mb-2">Image Classification</h2>
        <p className="text-lg text-gray-700 mb-4">
          {classificationResult ?? "No classification yet."}
        </p>
        <h2 className="text-2xl font-semibold text-black mb-2">Accuracy</h2>

        {accuracy !== null ? (
          <div className="w-full bg-gray-200 rounded-full h-6 mt-4 relative">
            <div
              className={`h-6 rounded-full ${getProgressBarColor(accuracy)}`}
              style={{ width: `${accuracy}%` }}
            ></div>
            <span className="absolute inset-0 flex justify-center items-center text-white font-medium">
              {accuracy}%
            </span>
          </div>
        ) : (
          <p className="text-lg text-gray-700">No accuracy data.</p>
        )}
      </div>

      {/* ShadCN AlertDialog for Upload Source Selection */}
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>Select Upload Source</AlertDialogHeader>
          <div className="space-y-4">
            <Button onClick={() => handleDialogClose("local")} className="w-full">Local File</Button>
            <Button onClick={() => handleDialogClose("google-drive")} className="w-full">Google Drive</Button>
            <Button onClick={() => handleDialogClose("online-url")} className="w-full">Fetch Image from URL</Button>
          </div>
          <div className="mt-4">
            {openDialog && (
              <input
                type="text"
                placeholder="Enter image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="border border-blue-300 rounded-md p-2 w-full"
              />
            )}
          </div>
          <AlertDialogFooter>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MainContent;
