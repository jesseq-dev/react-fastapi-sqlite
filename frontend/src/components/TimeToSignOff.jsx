import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import API_BASE_URL from "../config";
import Filters from "./Filters";
import { useFilterContext } from "./FilterContext";

const TimeToSignOff = () => {
  const [data, setData] = useState([]);
  const { filters } = useFilterContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(
          `${API_BASE_URL}/time-to-sign-off?provider=${filters.provider}&clinic=${filters.clinic}`
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
      <h2>Time to Sign Off</h2>
      <Filters />
      <LineChart width={600} height={300} data={data}>
        <XAxis dataKey="hourOfDay" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="numEncounters" stroke="#8884d8" />
      </LineChart>
    </>
  );
};

export default TimeToSignOff;
