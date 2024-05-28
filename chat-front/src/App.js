import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import ProtectedRoute from "./routing/ProtectedRoute";
import NavigationLoginRoute from "./routing/NavigationLoginRoute";
import { Chat } from "./app/services/chat/chat";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route element={<NavigationLoginRoute />}> */}
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {/* </Route> */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Chat />}></Route>
        </Route>
        <Route path="/logout" element={<Logout />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
