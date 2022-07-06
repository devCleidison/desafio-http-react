import "./styles.css";

export const Card = ({ id, name, price, httpRequest, loading }) => {
  return (
    <div className="card">
      <span className="card-title">{name}</span>
      <span className="card-price">{new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
      }).format(price)}</span>

      {loading && (
        <input
          type="button"
          value="Remover"
          disabled
          style={{ backgroundColor: "#202020" }}
        />
      )}

      {!loading && (
        <input
          type="button"
          value="Remover"
          onClick={() => httpRequest(id, "DELETE")}
        />
      )}
    </div>
  );
};
