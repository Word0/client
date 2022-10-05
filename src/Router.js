import React from "react";
import { Routes, Route } from "react-router-dom";

import MainPage from "./components/Main";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage type="lotto" />} />
      <Route path="/lotto" element={<MainPage type="lotto" />} />
      <Route path="/pension" element={<MainPage type="pension" />} />
      <Route exact path="/sp2000" element={<MainPage type="sp2000" />} />
      <Route exact path="/sp1000" element={<MainPage type="sp1000" />} />
      <Route exact path="/sp500" element={<MainPage type="sp500" />} />
    </Routes>
  );
}

export default Router;
