import { HashRouter, NavLink, Route, Routes } from "react-router-dom";
import { Database } from "../pages/database/database";
import { Settings } from "../pages/settings/settings";
import { OpcuaServer } from "../pages/opcua-server/opcua-server";
import { GlobalNotifycation } from "./notifycation/global-notifycations";
import { useSettingsBound } from "../pages/settings/services/settings-service";
import { useEffect, useState } from "react";
import { OpcuaClient } from "../pages/opcua-client/opcua-client";
import { OpcuaServerDetail } from "../pages/opcua-server/pages/opcua-server-detail";
import { useOpcuaServerBound } from "../pages/opcua-server/services/opcua-server.service";

export function Layout() {
  //const init = useSettingsBound((s) => s.init);
  //const initialized = useSettingsBound((s) => s.initialized);

  const { init } = useSettingsBound();

  const { initilized, initStatus } = useOpcuaServerBound();

  useEffect(() => {
    initStatus();
    init();
  }, [initStatus, init]);

  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    init();
  }, [theme, init]);

  if (!initilized) {
    return (
      <div className="h-100 d-flex flex-column justify-content-center align-items-center">
        <div className="spinner-border text-warning" role="status"></div>
      </div>
    );
  }

  return (
    <HashRouter>
      <div className="h-100 d-flex">
        <div className="d-flex flex-column border-end border-secondary-subtle">
          <div className="nav flex-column flex-fill">
            <NavLink
              to={"/database"}
              className={({ isActive }) =>
                `nav-link text-start ${isActive ? "active" : ""}`
              }
              style={{ whiteSpace: "nowrap" }}
            >
              <i className="bi bi-database pe-2"></i>
              Database
            </NavLink>
            <hr className="divider m-0"></hr>
            <NavLink
              to={"/opcua-server"}
              className={({ isActive }) =>
                `nav-link text-start ${isActive ? "active" : ""}`
              }
              style={{ whiteSpace: "nowrap" }}
            >
              <i className="bi bi-server pe-2"></i>
              OPC UA Server
            </NavLink>
            <hr className="divider m-0"></hr>
            <NavLink
              to={"opcua-client"}
              className={({ isActive }) =>
                `nav-link text-start ${isActive ? "active" : ""}`
              }
              style={{ whiteSpace: "nowrap" }}
            >
              <i className="bi bi-pc-display pe-2"></i>
              OPC UA Client
            </NavLink>
            <hr className="divider m-0"></hr>
          </div>

          <div className="nav flex-column">
            <hr className="divider m-0"></hr>
            <button
              className="nav-link text-start"
              onClick={() => {
                theme === "light" ? setTheme("dark") : setTheme("light");
              }}
            >
              {theme === "light" ? (
                <>
                  <i className="bi bi-lightbulb-fill pe-2"></i> Dark mode
                </>
              ) : (
                <>
                  <i className="bi bi-lightbulb pe-2"></i> Light mode
                </>
              )}
            </button>
            <hr className="divider m-0"></hr>
            <NavLink
              to={"/settings"}
              className={({ isActive }) =>
                `nav-link text-start ${isActive ? "active" : ""}`
              }
            >
              <i className="bi bi-gear pe-3"></i>
              Settings
            </NavLink>
          </div>
        </div>

        <div className="flex-grow-1 d-flex">
          <Routes>
            <Route path="/database" element={<Database></Database>}></Route>
            <Route path="/settings" element={<Settings></Settings>}></Route>
            <Route
              path="/opcua-server"
              element={<OpcuaServer></OpcuaServer>}
            ></Route>
            <Route
              path="/opcua-server/:opcuaServerId"
              element={<OpcuaServerDetail></OpcuaServerDetail>}
            ></Route>
            <Route
              path="/opcua-client"
              element={<OpcuaClient></OpcuaClient>}
            ></Route>
          </Routes>
        </div>
        <GlobalNotifycation />
      </div>
    </HashRouter>
  );
}
