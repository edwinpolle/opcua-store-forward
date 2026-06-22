import { useEffect } from "react";
import { useSettingsBound } from "../../services/settings-service";

export function Autostart() {
  const { autostart, update } = useSettingsBound();

  return (
    <div className="card">
      <div className="card-header">
        <h6> Autostart</h6>
      </div>

      <div className="card-body d-flex justify-content-between align-items-center">
        <span className="card-text">Run on startup?</span>

        <div className="btn-group" role="group">
          <input
            type="radio"
            className="btn-check"
            name="autostartRadio"
            id="autostartOn"
            checked={autostart}
            onChange={(e) => update(e.target.checked)}
          ></input>
          <label className="btn btn-outline-success" htmlFor="autostartOn">
            on
          </label>

          <input
            type="radio"
            className="btn-check"
            name="autostartRadio"
            id="autostartOff"
            checked={!autostart}
            onChange={(e) => update(!e.target.checked)}
          ></input>
          <label className="btn btn-outline-danger" htmlFor="autostartOff">
            off
          </label>
        </div>
      </div>
    </div>
  );
}
