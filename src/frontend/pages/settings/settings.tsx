import { Autostart } from "./components/autostart/autostart";
import { Theme } from "./components/theme/theme";

export function Settings() {
  return (
    <div className="flex-grow-1 d-flex flex-column">
      <div className="border-bottom p-2">
        <h3>Settings</h3>
      </div>

      <div className="flex-grow-1 d-flex flex-column gap-2 p-2">
        <Autostart></Autostart>
        <Theme></Theme>
      </div>
    </div>
  );
}
