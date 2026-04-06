import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./pages/MainLayout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import InsightsPage from "./pages/Insights";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/insights" element={<InsightsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;