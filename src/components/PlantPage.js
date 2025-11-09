import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then((data) => setPlants(data));
  }, []);

  // add a new plant
  function onPlantSubmit(newPlant) {
    setPlants([...plants, newPlant]);
  }

  // delete plant
  function onPlantDelete(id) {
    setPlants(plants.filter((plant) => plant.id !== id));
  }

  //filter plants based on search input
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onPlantSubmit={onPlantSubmit} />
      <Search searchInput={searchInput} onSearch={setSearchInput} />
      <PlantList plants={filteredPlants} onPlantDelete={onPlantDelete} />
    </main>
  );
}

export default PlantPage;
