import { Link, useOutletContext } from "react-router-dom";
import "../assets/card.css";

function Card() {
  const { products } = useOutletContext();
  return (
    <div className="row">
      {products.map((product, i) => (
        <div
          className="col-md-4"
          key={product.productCode}
          data-code={product.productCode}
        >
          <Link to={`/detail/${product.productCode}`}>
            <img
              style={{ width: "300px", height: "200px" }}
              src={`https://codingapple1.github.io/shop/shoes${product.productCode}.jpg`}
            />
          </Link>
          <h3>{product.title}</h3>
          <h4>{product.content}</h4>
          <p>{product.price.toLocaleString()}원</p>
        </div>
      ))}
    </div>
  );
}

export { Card };
