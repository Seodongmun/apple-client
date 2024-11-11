import Input from "../../components/Input";
import StyledButton from "../../components/Button";
import { useState } from "react";
import { getProduct, removeProduct, updateProduct } from "../../api/product";
import { useAuth } from "../../contexts/AuthContext";
import Accordion from "react-bootstrap/Accordion";

const ProductEdit = ({ sellerProduct, setSellerProduct }) => {
  const [codeNum, setCodeNum] = useState(0);
  const [removeNum, setRemoveNum] = useState(0);
  const [isNull, setIsNull] = useState(false);
  const { id: loginId } = useAuth();
  const [findProduct, setFindProduct] = useState(null);
  const [product, setProduct] = useState([]);
  const [editProduct, setEditProduct] = useState({
    productCode: 0,
    title: "",
    content: "",
    price: 0,
    url: "",
    stock: 0,
    member: {
      id: loginId,
    },
  });

  const codeSubmit = async () => {
    const product = sellerProduct.find(
      (product) => product.productCode === Number(codeNum)
    );
    if (product) {
      console.log("찾은 상품:", findProduct);
      setFindProduct(findProduct); // 입력한 번호와 맞는 상품이 있는지
      setProduct(product); // 있다면 그 상품을 product에 set
      setIsNull(true); // 그리고 모달 띄우기용 boolean
    } else {
      alert("일치하는 상품이 없습니다.");
      setFindProduct(null);
      setProduct(null);
      setIsNull(false);
    }
    if (product) {
      let productCode = product.productCode;
      await getProduct(productCode);
    }
  };
  const editSubmit = async () => {
    await updateProduct(editProduct);
    alert("상품 업데이트 완료");
  };
  const deleteSubmit = async () => {
    try {
      if (removeNum !== 0 && removeNum !== "") {
        console.log(removeNum);
        await removeProduct(removeNum);
        alert("상품 삭제 완료");
      } else {
        alert("삭제할 상품이 없습니다");
      }
    } catch (error) {
      alert("삭제할 상품이 없습니다");
    }
  };

  return (
    <>
      <Input
        type="number"
        value={codeNum}
        change={(e) => setCodeNum(e.target.value)}
        tag={"코드"}
        label={"수정할 상품의 코드를 입력하세요"}
      />
      <StyledButton ButtonName={"확인"} onClick={codeSubmit}></StyledButton>
      {isNull ? (
        <div className="product-info">
          <Input
            tag={"상품이름"}
            type="text"
            placeholder={product.title}
            value={editProduct.title}
            change={(e) =>
              setEditProduct({ ...editProduct, title: e.target.value })
            }
          />
          <Input
            tag={"상품정보"}
            placeholder={product.content}
            value={editProduct.content}
            change={(e) =>
              setEditProduct({ ...editProduct, content: e.target.value })
            }
          />
          <Input
            tag={"상품가격"}
            placeholder={product.price}
            value={editProduct.price}
            change={(e) =>
              setEditProduct({ ...editProduct, price: e.target.value })
            }
          />
          <Input
            tag={"상품갯수"}
            placeholder={product.stock}
            value={editProduct.stock}
            change={(e) =>
              setEditProduct({ ...editProduct, stock: e.target.value })
            }
          />

          <StyledButton
            ButtonName={"상품 업데이트"}
            onClick={editSubmit}
          ></StyledButton>
        </div>
      ) : null}
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>상품 제거</Accordion.Header>
          <Accordion.Body>
            <Input
              label={"삭제할 상품의 코드를 입력하세요"}
              tag={"코드"}
              value={removeNum}
              change={(e) => setRemoveNum(e.target.value)}
            />
            <StyledButton
              ButtonName={"상품 삭제"}
              onClick={deleteSubmit}
            ></StyledButton>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default ProductEdit;
