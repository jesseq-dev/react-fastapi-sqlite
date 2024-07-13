import React, { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    clinic: localStorage.getItem("clinic") || "",
    provider: localStorage.getItem("provider") || "",
  });

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
    localStorage.setItem("clinic", newFilters.clinic);
    localStorage.setItem("provider", newFilters.provider);
  };

  return (
    <FilterContext.Provider value={{ filters, updateFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
