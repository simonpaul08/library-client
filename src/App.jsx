import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardLayout from "./components/DashboardLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./pages/Dashboard";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useAuthContext()
  return (
    <>
      <Routes>
        <Route path="/register" element={currentUser ? <Navigate to="/"/> :<Register />} />
        <Route path="/login" element={currentUser ? <Navigate to="/"/> :<Login />}/>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
