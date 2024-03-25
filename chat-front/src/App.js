import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import ProtectedRoute from "./routing/ProtectedRoute";
function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route
            path="/login"
            onEnter={() => console.log("Entered /")}
            element={<Login />}
          ></Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/" onEnter={() => console.log("Entered /")} />
          </Route>
          <Route path="/logout" element={<Logout />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
