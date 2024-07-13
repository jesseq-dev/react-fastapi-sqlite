import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import API_BASE_URL from "../config";
import Filters from "./Filters";
import { useFilterContext } from "./FilterContext";

const GeneralPracticeMetrics = () => {
  const [data, setData] = useState([]);
  const { filters } = useFilterContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(
          `${API_BASE_URL}/general-practice-metrics?provider=${filters.provider}&clinic=${filters.clinic}`
        );
        const json = await data.json();
        setData(json);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchData();
  }, [filters.clinic, filters.provider]);

  return (
    <>
      <h2>General Practice Metrics</h2>
      <Filters />
      <BarChart width={600} height={300} data={data}>
        <XAxis dataKey="clinicState" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="num" fill="#8884d8" />
      </BarChart>
    </>
  );
};

export default GeneralPracticeMetrics;
