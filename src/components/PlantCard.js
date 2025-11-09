import React, { useState } from "react";

function PlantCard({ plant, onPlantDelete }) {
  const [inStock, setInStock] = useState(true);
  const [price, setPrice] = useState(plant.price);

  function handlePlantDelete() {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "DELETE",
    })
      .then(() => {
        // notify the parent to remove the plant from state
        onPlantDelete(plant.id);
      })
      .catch((error) => console.error("Delete failed:", error));
  }

  function handleNewPrice(e) {
    e.preventDefault();
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: parseFloat(price) }),
    });
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {price}</p>

      <form onSubmit={handleNewPrice}>
        <input
          onChange={(e) => setPrice(e.target.value)}
          type="text"
          name="price"
          value={price}
        />
      </form>

      {inStock ? (
        <button onClick={() => setInStock(false)} className="primary">
          In Stock
        </button>
      ) : (
        <button onClick={() => setInStock(true)}>Out of Stock</button>
      )}

      <button onClick={handlePlantDelete}>Delete</button>
    </li>
  );
}

export default PlantCard;
