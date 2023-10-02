import "./App.css";
import CurrentGameArea from "./CurrentGameArea/CurrentGameArea";
import FinishedGameArea from "./FinishedGameArea/FInishedGameArea";
import { GameStatusProvider } from "./Providers/GameStatusProvider";
import { ChecklistTemplateProvider } from "./Providers/ChecklistTemplateProvider";
import { GameMatchesProvider } from "./Providers/GameMatchProvider";

import { CurrentChecklistTemplateIdProvider } from "./Providers/CurrentChecklistTemplateIdProvider";

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
      <CurrentChecklistTemplateIdProvider>
        <ChecklistTemplateProvider>
          <GameMatchesProvider>
            <GameStatusProvider>
              <LoginManageArea />
              <div className="App">
                <CurrentGameArea />
                <FinishedGameArea />
              </div>
            </GameStatusProvider>
          </GameMatchesProvider>
        </ChecklistTemplateProvider>
      </CurrentChecklistTemplateIdProvider>
    </LoginUserProvider>
  );
}

export default App;
