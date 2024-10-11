import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaTachometerAlt, FaTasks, FaCogs, FaSignOutAlt } from "react-icons/fa"; // Import icons from react-icons

export function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white border-r shadow-sm p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Card Classifier</h1>
      </div>

      <Separator className="my-4" />

      <nav className="space-y-4">
        <Link href="/dashboard">
          <Button variant="ghost" className="w-full justify-start">
            <FaTachometerAlt className="mr-2" /> {/* Icon for Dashboard */}
            Dashboard
          </Button>
        </Link>

        <Link href="/card-classifier">
          <Button variant="ghost" className="w-full justify-start">
            <FaTasks className="mr-2" /> {/* Icon for Card Classifier */}
            Card Classifier
          </Button>
        </Link>

        <Link href="/settings">
          <Button variant="ghost" className="w-full justify-start">
            <FaCogs className="mr-2" /> {/* Icon for Settings */}
            Settings
          </Button>
        </Link>

        <Link href="/logout">
          <Button variant="ghost" className="w-full justify-start">
            <FaSignOutAlt className="mr-2" /> {/* Icon for Logout */}
            Logout
          </Button>
        </Link>
      </nav>
    </div>
  );
}
