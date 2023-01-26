import "./App.css";
import { Navbar, ViewParkings } from "components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("parkingAppToken")) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="Sectors">
      <Navbar />
      <ViewParkings />
    </div>
  );
}

export default App;
