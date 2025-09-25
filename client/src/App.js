// src/App.js

import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "react-bootstrap";
import Login from "./components/login";
import Signup from "./components/Signup";
import Dashboard from "./pages/Dashboard";
import ClientDetails from "./pages/ClientDetails";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/usercreated" element={<ClientDetails />} />
            </Route>
            {/* <Route path="/client/:id" element={<ClientDetails />} /> */}
          </Routes>
        </Container>
      </main>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
}

export default App;
