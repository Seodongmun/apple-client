import { useOutletContext } from "react-router-dom";
import { useState } from "react";

export function useSort() {
  const { products, setProducts } = useOutletContext();
  const [sortedProducts, setSortedProducts] = useState(products);

  function sort() {
    const copy = [...products];
    copy.sort(function (a, b) {
      if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
      else if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
      else return 0;
    });
    setSortedProducts(copy);
  }

  return [sortedProducts, sort];
}
