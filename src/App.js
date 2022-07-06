import "./App.css";

import { useState } from "react";

import { Card } from "./components/Card";
import { useFetch } from "./hooks/useFetch";

const url = "http://localhost:3000/products";

function App() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const { data: items, httpRequest, loading, error } = useFetch(url);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "" || price === "") {
      alert("Por favor, insira os dados necessários");
      return;
    }

    const product = {
      name,
      price,
    };

    httpRequest(product, "POST");

    setName("");
    setPrice("");
  };

  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <h3>Adicionar produto</h3>
          <label>
            Nome:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Preço:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <input type="submit" value="Adicionar" />
        </form>
      </div>

      {loading && <span className="loading">Carregando dados..</span>}

      <div className="products-container">
        {error && <p>{error}</p>}
        {!error &&
          items &&
          items.map((item) => (
            <Card
              key={item.id}
              name={item.name}
              id={item.id}
              price={item.price}
              httpRequest={httpRequest}
              loading={loading}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
