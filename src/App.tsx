import { Outlet } from "react-router-dom";
import Navigation from "./routes/Navigation";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-600 text-white flex flex-col">
      <header className="w-full flex p-3 bg-gray-800 justify-center">
        <Navigation />
      </header>
      <main className="flex-1 p-3">
        <Outlet />
      </main>
      <footer className="w-full p-3 justify-center flex bg-gray-700">footer</footer>
    </div>
  );
};

export default App;
