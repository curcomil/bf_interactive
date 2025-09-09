import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./assets/Pages/Home";
import "../src/animations.css";
import "../src/styles.css";
import { AppProvider } from "./Context/Context";

function App() {
  return (
    <div
      className="min-h-screen bg-cover bg-center -z-10"
      style={{ backgroundImage: "url('/fondo.png')" }}
    >
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
