import { Routes, Route, Navigate } from "react-router-dom";
import { MembersProvider } from "./context/MembersContext";
import Layout from "./components/Layout";

import WelcomeScreen from "./pages/WelcomeScreen";
import HomeScreen from "./pages/HomeScreen";
import CultosScreen from "./pages/CultosScreen";
import RegistroScreen from "./pages/RegistroScreen";
import ListaScreen from "./pages/ListaScreen";
import Placeholder from "./pages/Placeholder";

export default function App() {
  return (
    <MembersProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/cultos" element={<CultosScreen />} />
          <Route path="/cultos/registro" element={<RegistroScreen />} />
          <Route path="/cultos/lista" element={<ListaScreen />} />
          <Route
            path="/departamentos"
            element={<Placeholder title="Departamentos" />}
          />
          <Route
            path="/relatorios"
            element={<Placeholder title="Relatórios" />}
          />
          <Route path="/perfil" element={<Placeholder title="Perfil" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </MembersProvider>
  );
}
