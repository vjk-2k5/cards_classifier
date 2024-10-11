"use client";
import { Sidebar } from "@/components/ui/sidebar";
import { NavBar } from "@/components/ui/history/HistroyNavBar";
import HistoryMainContent from "@/components/ui/history/HistoryMainContent";

const HistoryLayout = () => {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
            <NavBar />
            <main className="p-6">
          <HistoryMainContent/>
        </main>
        </div>
      </div>
    );
  };
  export default HistoryLayout;