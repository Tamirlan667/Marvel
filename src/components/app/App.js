import AppHeader from "../appHeader/AppHeader";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../../pages/Main";
import Comics from "../../pages/Comics";
const App = () => {
  return (
    <div className="app">
      <AppHeader />
      <main>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="comics" element={<Comics />}></Route>
        </Routes>
      </main>
    </div>
  );
};

export default App;
