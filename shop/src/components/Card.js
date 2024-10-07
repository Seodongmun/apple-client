import { Link, useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

function Card() {
  const { products } = useOutletContext();
  console.log(products); // 레이아웃에서 상품 데이터 옴

  return (
    <div className="row">
      {products.map((product, i) => (
        <div className="col-md-4" key={products.id} data-code={products.id}>
          <Link to={`/detail/${products[i].id - 1}`}>
            <img
              src={`https://codingapple1.github.io/shop/shoes${products[i].id}.jpg`}
              width="80%"
            />
          </Link>
          <h3>{products[i].title}</h3>
          <h4>{products[i].content}</h4>
          <p>{products[i].price.toLocaleString()}원</p>
        </div>
      ))}
    </div>
  );
}

export { Card };
