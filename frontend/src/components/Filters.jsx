import React, { useState, useEffect } from "react";
import { useFilterContext } from "./FilterContext";
import API_BASE_URL from "../config";

const Filters = () => {
  const { filters, updateFilters } = useFilterContext();
  const [clinics, setClinics] = useState([]);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [clinicsResponse, providersResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/clinics`).then((response) => response.json()),
          fetch(`${API_BASE_URL}/providers`).then((response) =>
            response.json()
          ),
        ]);
        setClinics(clinicsResponse);
        setProviders(providersResponse);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };

    fetchFilters();
  }, []);

  const handleClinicChange = (event) => {
    const clinic = event.target.value;
    updateFilters({ ...filters, clinic });
  };

  const handleProviderChange = (event) => {
    const provider = event.target.value;
    updateFilters({ ...filters, provider });
  };

  return (
    <div className="u-marginbottom--8">
      <label className="u-marginright--8">
        Clinic:
        <select value={filters.clinic} onChange={handleClinicChange}>
          <option value="">All</option>
          {clinics.map((clinic) => (
            <option key={clinic} value={clinic}>
              {clinic}
            </option>
          ))}
        </select>
      </label>
      <label className="u-marginright--8">
        Provider:
        <select value={filters.provider} onChange={handleProviderChange}>
          <option value="">All</option>
          {providers.map((provider) => (
            <option key={provider} value={provider}>
              {provider}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Filters;
