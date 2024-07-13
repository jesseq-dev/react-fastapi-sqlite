import { BrowserRouter, Route, Routes } from "react-router-dom";
import GeneralPracticeMetrics from "./components/GeneralPracticeMetrics";
import TimeToSignOff from "./components/TimeToSignOff";
import Home from "./components/Home";
import Layout from "./components/Layout";
import { FilterProvider } from "./components/FilterContext";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/general-practice-metrics"
            element={
              <FilterProvider>
                <GeneralPracticeMetrics />
              </FilterProvider>
            }
          />
          <Route
            path="/time-to-sign-off"
            element={
              <FilterProvider>
                <TimeToSignOff />
              </FilterProvider>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
