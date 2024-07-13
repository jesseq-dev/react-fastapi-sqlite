import React, { createContext, useContext, useState } from "react";

type Filters = {
  clinic: string;
  provider: string;
};

type FilterContextType = {
  filters: Filters;
  updateFilters: (newFilters: Filters) => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [filters, setFilters] = useState({
    clinic: localStorage.getItem("clinic") || "",
    provider: localStorage.getItem("provider") || "",
  });

  const updateFilters = (newFilters: Filters) => {
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

export const useFilterContext = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
};
