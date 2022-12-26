import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeContextProvider from "./contexts/ThemeContext";
import Homepage from "./pages/Homepage/Homepage";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import Footer from "./components/Footer/Footer";
import Signup from "./pages/Users/Signup";
import Signin from "./pages/Users/Signin";
import UserContextProvider from "./contexts/UserContext";
import MyFavorites from "./pages/MyFavorites/MyFavorites";

function App() {
  // console.log(baseUrl);

  return (
    <div className="App">
      <BrowserRouter>
        <UserContextProvider>
          <ThemeContextProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/moviedetails/:movieId" element={<MovieDetails />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/myfavorites" element={<MyFavorites />} />
            </Routes>
            <Footer />
          </ThemeContextProvider>
        </UserContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
