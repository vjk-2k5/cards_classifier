import React, { useState } from 'react';
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { Input } from '@/components/ui/input'; // Assuming you have an Input component
import { Label } from '@/components/ui/label'; // Assuming you have a Label component

export const SettingsMainContent = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform your update logic here
    console.log('Updated Profile: ', profile);
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg max-w-4xl">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>

      <form onSubmit={handleSubmit}>
        {/* Profile Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Profile Information</h3>

          <div className="mb-4">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2"
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2"
            />
          </div>
        </div>

        {/* Password Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Change Password</h3>

          <div className="mb-4">
            <Label htmlFor="password">New Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={profile.password}
              onChange={handleInputChange}
              placeholder="Enter a new password"
              className="w-full px-4 py-2"
            />
          </div>
        </div>

        {/* Save Changes Button */}
        <Button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900">
          Save Changes
        </Button>
      </form>

      {/* Additional Account Settings */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
        <Button variant="outline" className="w-full py-2 text-red-600 border-red-600 hover:bg-red-100">
          Deactivate Account
        </Button>
      </div>
    </div>
  );
};

export default SettingsMainContent;
