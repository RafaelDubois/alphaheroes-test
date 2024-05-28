import { createRoot } from "react-dom/client";
import Home from "./Home/Home.tsx";
import Profiles from "./Users/pages/Profiles/Profiles.tsx";
import Login from "./Users/pages/Login/Login.tsx";
import Register from "./Users/pages/Register/Register.tsx";
import Chapters from "./Exercices/pages/Chapters/Chapters.tsx";
import Exercises from "./Exercices/pages/Exercises/Exercises.tsx";
import Account from "./Users/pages/Account/Account.tsx";
import Monitoring from "./Users/pages/Monitoring/Monitoring.tsx";
import MonitoringID from "./Users/pages/Monitoring/MonitoringID.tsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScreenProvider from "./Context/components/ScreenProvider.tsx";
import { MyThemeProvider } from "./Context/components/ThemeProvider.tsx";
import InformationsModal from "./Shared/components/InformationsModal/InformationsModal.tsx";
// import LocationAwareModal from "./Context/components/LocationAwareModal.tsx";

// Création d'une racine DOM
const root = createRoot(document.getElementById("root")!);

// Rendu de l'application
root.render(
  <MyThemeProvider>
    <ScreenProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="profiles" element={<Profiles />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="chapters" element={<Chapters />} />
          <Route path="chapters/:chapterId/exercises" element={<Exercises />} />
          <Route path="account" element={<Account />} />
          <Route path="monitoring" element={<Monitoring />} />
          <Route
            path="monitoring/:profilName"
            element={<MonitoringID />}
          />
        </Routes>
        <InformationsModal />
        {/* <LocationAwareModal /> */}
      </BrowserRouter>
    </ScreenProvider>
  </MyThemeProvider>
);
