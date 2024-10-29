import Header from "./Components/Header/Header";
import './App.scss';
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
