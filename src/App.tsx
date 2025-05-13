import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";

import { Claims } from "./pages/Claims";
import { Dashboard } from "./pages/Dashboard";
import { Incidents } from "./pages/Incidents";
import { Planning } from "./pages/Planning";
import { Tasks } from "./pages/Tasks";
import { Users } from "./pages/Users";

function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<AppLayout />}>
            <Route
              index
              element={<Dashboard />}
            />
            <Route
              path="users"
              element={<Users />}
            />
            <Route
              path="tasks"
              element={<Tasks />}
            />
            <Route
              path="planning"
              element={<Planning />}
            />
            <Route
              path="incidents"
              element={<Incidents />}
            />
            <Route
              path="claims"
              element={<Claims />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
