import React, { createContext, useContext, useState } from 'react';

const PlanningContext = createContext();

export const PlanningProvider = ({ children }) => {
  const [form, setForm] = useState({
    // Existing fields
    coupleNames: '',
    weddingDate: '',
    location: '',
    guestCount: '',
    theme: '',
    budget: '',

    // Add planner-specific fields
    plannerName: '',
    weddingType: '',
    plannerNotes: '',
  });

  return (
    <PlanningContext.Provider value={{ form, setForm }}>
      {children}
    </PlanningContext.Provider>
  );
};

export const usePlanning = () => useContext(PlanningContext);
