import { Navigate, useNavigate } from "react-router-dom";
import StyledButton from "../components/Button";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>페이지를 찾을수 없습니다</h1>
      <StyledButton
        ButtonName={"홈으로 돌아가기"}
        onClick={() => navigate("/")}
      ></StyledButton>
      <img
        style={{ width: "100%" }}
        src={process.env.PUBLIC_URL + "/다람쥐2.jpg"}
      />
    </div>
  );
};

export default Error;
