import { useContext, useEffect, useState } from "react";
import "../assets/App.css";

const TabContent = ({ tab, products, id }) => {
  // console.log("탭값", tab);
  // console.log(id);
  let [fade, setFade] = useState("");

  useEffect(() => {
    // 애니메이션 기능 넣으려면 타이머 넣어야함
    let timer = setTimeout(() => {
      setFade("end");
    }, 100);

    return () => {
      clearTimeout(timer);
      setFade("");
    };
  }, [tab]);

  return (
    <div className={"start " + fade}>
      {tab == 0 ? <div>상품명 : {products[id - 1].title}</div> : null}
      {tab == 1 ? <div>상세정보 : {products[id - 1].content}</div> : null}
      {tab == 2 ? (
        <div>가격 : {products[id - 1].price.toLocaleString()}</div>
      ) : null}
    </div>
  );
};

export default TabContent;
