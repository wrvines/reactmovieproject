import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeContextProvider from "./contexts/ThemeContext";
import Homepage from "./pages/Homepage/Homepage";

function App() {
  // console.log(baseUrl);

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeContextProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
          </Routes>
        </ThemeContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
