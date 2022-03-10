import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import NewPage from "./NewPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Registration />} />

        <Route exact path="/login" element={<Login />} />
        <Route exact path="/page" element={<NewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
