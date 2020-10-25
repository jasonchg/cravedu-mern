import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <div className="App">
      <Header />
      <HomeScreen />
      <Footer />
    </div>
  );
}

export default App;
