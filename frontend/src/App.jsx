import AppRouter from "./router";
import "./styles/globals.css"; // Global Tailwind styles

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppRouter />
    </div>
  );
};

export default App;
