import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import EmailVerificationPage from "./pages/EmailVerificationPage";

function App() {
 

  return (
    <div className="bg-yellow-50 h-[100vh] flex items-center justify-center">
      <Routes>
        <Route path="/" element={<SignUp/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<SignUp/>}></Route>
        <Route path="/email-verify" element={<EmailVerificationPage/>}></Route>
      </Routes>
    </div>
  )
}

export default App
