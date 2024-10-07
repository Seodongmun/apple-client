import { useOutletContext } from "react-router-dom";
import { Card } from "./../components/Card";

const Main = () => {
  const { products, setProducts } = useOutletContext();

  return (
    <>
      <main>
        <div className="main-bg"></div>
        <div className="container">
          <Card />
          <div className="event-div">
            <h4>첫 주문시 양배추즙 서비스</h4>
            <button>클릭!</button>
          </div>
          <div className="event-div">
            <h4>생일기념 쿠폰받기</h4>
            <button>클릭!</button>
          </div>
        </div>

        <button
          onClick={() => {
            let copy = [...products];
            copy.sort(function (a, b) {
              if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
              else if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
              else return 0;
            });
            setProducts(copy);
          }}
        >
          알파벳 순 정렬
        </button>
      </main>
    </>
  );
};

export default Main;
