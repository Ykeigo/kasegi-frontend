import "./App.css";
import CurrentGameArea from "./CurrentGameArea/CurrentGameArea";
import FinishedGameArea from "./FinishedGameArea/FInishedGameArea";
import { GameStatusProvider } from "./Providers/GameStatusProvider";
import { ChecklistTemplateProvider } from "./Providers/ChecklistTemplateProvider";
import { ChecklistsProvider } from "./Providers/ChecklistProvider";

import { useEffect, useState } from "react";

import axios from "axios";
import { LoginUserProvider } from "./Providers/LoginUserProvider";
import LoginManageArea from "./loginManageArea";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path={`/`} element={<Index />} />
    </Routes>
  );
}

function Index() {
  return (
    <LoginUserProvider>
      <ChecklistTemplateProvider>
        <ChecklistsProvider>
          <GameStatusProvider>
            <div className="App">
              <LoginManageArea />
              <CurrentGameArea />
              <FinishedGameArea />
            </div>
          </GameStatusProvider>
        </ChecklistsProvider>
      </ChecklistTemplateProvider>
    </LoginUserProvider>
  );
}

export default App;
