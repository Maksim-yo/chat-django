import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import ProtectedRoute from "./routing/ProtectedRoute";
import { Chat } from "./app/services/chat/chat";
import { Test } from "./Test";
function App() {
  return (
    // <div className="wrapper">
    <BrowserRouter>
      <Routes>
        {/* <Route path="*" element={<Room chat_id={1} />}></Route> */}

        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {/* <Route element={<ProtectedRoute />}> */}
        <Route path="/" element={<Chat />}></Route>

        {/* <Route path="/" element={<HomePage />} /> */}
        {/* </Route> */}
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/test" element={<Test />}></Route>
      </Routes>
    </BrowserRouter>

    // </div>
  );
}

export default App;
