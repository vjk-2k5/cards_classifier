"use client";
import * as React from "react";
import { NavBar } from "@/components/ui/card-classifier/CardClassifierNavBar";
import { Sidebar } from "@/components/ui/sidebar";
import{ MainContent } from "@/components/ui/card-classifier/CardClassifierMainContent";

export const ImgClasMainLayout = () => {
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
          <MainContent/>
        </main>
      </div>
    </div>
  );
};
export default ImgClasMainLayout;

