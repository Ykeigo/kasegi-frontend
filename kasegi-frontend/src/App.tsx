import "./App.css";
import CurrentGameArea from "./CurrentGameArea/CurrentGameArea";
import FinishedGameArea from "./FinishedGameArea/FInishedGameArea";
import { GameStatusProvider } from "./Providers/GameStatusProvider";
import { ChecklistTemplateProvider } from "./Providers/ChecklistTemplateProvider";
import { ChecklistsProvider } from "./Providers/ChecklistProvider";

function App() {
  return (
    <ChecklistTemplateProvider>
      <ChecklistsProvider>
        <GameStatusProvider>
          <div className="App">
            <CurrentGameArea />
            <FinishedGameArea />
          </div>
        </GameStatusProvider>
      </ChecklistsProvider>
    </ChecklistTemplateProvider>
  );
}

export default App;
