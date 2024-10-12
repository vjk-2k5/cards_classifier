
import { SheetDemo } from "@/components/ui/Profile";
import { MainNavBar } from "@/components/ui/NavBar";

export const NavBar = () => {
    return (
      <header>
        <div className="container mx-auto flex justify-between p-4">
          <h1 className="text-lg font-bold">Card Classifier</h1>
            <MainNavBar/>
            <SheetDemo />
        </div>
      </header>
    );
  };
  
  export default NavBar;