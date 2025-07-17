import { useState, useEffect } from "react";

// custom hook for tracking
/* 
  The current list of cities (including new ones added during the session): stagingCities
  Cities marked for deletion: deletedCityIds
  Pending changes for review before submission
*/
/* 
  Used in:
  + CreateProgramRefactored.jsx: Auto choosing city after selecting address
  + CitySelector.jsx: fetching city list for selection and add/delete staging cities
  + ...
*/
const useCityManagement = (cities) => {
  const [stagingCities, setStagingCities] = useState([]);
  const [deletedCityIds, setDeletedCityIds] = useState([]);

  // Initialize staging cities when cities are loaded
  useEffect(() => {
    setStagingCities(cities);
  }, [cities]);

  // Get combined cities (original + staging - deleted)
  // this will be shown in the <Select> element of the form
  const displayCities = stagingCities.filter(city => !deletedCityIds.includes(city.id));

  // Get pending changes for modal display
  // return a list of added and marked for removal city
  const getPendingChanges = () => {
    const newCities = stagingCities.filter(city => city.isStaging);
    const deletedCities = cities.filter(city => deletedCityIds.includes(city.id));

    return {
      newCities,
      deletedCities,
      //boolean to determine if pending change section will be shown or not
      hasChanges: newCities.length > 0 || deletedCities.length > 0
    };
  };

  // Revert specific changes
  const revertNewCity = (cityId) => {
    setStagingCities(prev => prev.filter(city => city.id !== cityId));
  };

  const revertDeletedCity = (cityId) => {
    setDeletedCityIds(prev => prev.filter(id => id !== cityId));
  };

  return {
    stagingCities,
    setStagingCities,
    deletedCityIds,
    setDeletedCityIds,
    displayCities,
    getPendingChanges,
    revertNewCity,
    revertDeletedCity
  };
};

export default useCityManagement;
