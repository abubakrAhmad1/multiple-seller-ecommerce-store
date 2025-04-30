import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>MULTI SELLER APP</h1>
      <Outlet />
    </div>
  );
}

export default App;
