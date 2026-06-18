import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { MembersProvider } from "./context/MembersContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import WelcomeScreen from "./pages/WelcomeScreen";
import LoginScreen from "./pages/LoginScreen";
import HomeScreen from "./pages/HomeScreen";
import CultosScreen from "./pages/CultosScreen";
import RegistroScreen from "./pages/RegistroScreen";
import ListaScreen from "./pages/ListaScreen";
import Placeholder from "./pages/Placeholder";

export default function App() {
  return (
    <AuthProvider>
      <MembersProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomeScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cultos"
              element={
                <ProtectedRoute>
                  <CultosScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cultos/registro"
              element={
                <ProtectedRoute>
                  <RegistroScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cultos/lista"
              element={
                <ProtectedRoute>
                  <ListaScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/departamentos"
              element={
                <ProtectedRoute>
                  <Placeholder title="Departamentos" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/relatorios"
              element={
                <ProtectedRoute>
                  <Placeholder title="Relatórios" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/perfil"
              element={
                <ProtectedRoute>
                  <Placeholder title="Perfil" />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </MembersProvider>
    </AuthProvider>
  );
}
