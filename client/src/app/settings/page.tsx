"use client"
import { NavBar } from "@/components/ui/settings/SettingsNavBar";
import * as React from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { SettingsMainContent } from "@/components//ui/settings/SettingsMainContent";


export const SettingsLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <NavBar />
        {/* Main Page Content */}
        <main className="p-6">
          <SettingsMainContent/>
        </main>
      </div>
    </div>
  );
};
export default SettingsLayout;