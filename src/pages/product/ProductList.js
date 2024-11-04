const ProductList = ({ sellerProduct }) => {
  return (
    <>
      {sellerProduct.map((product, i) => (
        <div key={i}>
          <h1>상품코드 : {product.productCode}</h1>
          <h1>상품이름 : {product.title}</h1>
          <h1>상품정보 : {product.content}</h1>
          <h1>상품가격 : {product.price}</h1>
          <h1>상품수량 : {product.stock}</h1>
          <h1>================================</h1>
        </div>
      ))}
    </>
  );
};

export default ProductList;
