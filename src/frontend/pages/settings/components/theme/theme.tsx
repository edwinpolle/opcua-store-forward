import { useSettingsBound } from "../../services/settings-service";

export function Theme() {
  const { theme, updateTheme } = useSettingsBound();
  return (
    <div className="card">
      <div className="card-header">
        <h6> Theme</h6>
      </div>

      <div className="card-body d-flex justify-content-between align-items-center">
        <span className="card-text">Dark mode</span>

        <div className="btn-group" role="group">
          <input
            type="radio"
            className="btn-check"
            name="themeRadio"
            id="themeOn"
            checked={theme === "dark"}
            onChange={() => {
              updateTheme("dark");
            }}
          ></input>
          <label className="btn btn-outline-success" htmlFor="themeOn">
            on
          </label>

          <input
            type="radio"
            className="btn-check"
            name="themeRadio"
            id="themeOff"
            checked={theme === "light"}
            onChange={(e) => {
              updateTheme("light");
            }}
          ></input>
          <label className="btn btn-outline-danger" htmlFor="themeOff">
            off
          </label>
        </div>
      </div>
    </div>
  );
}
