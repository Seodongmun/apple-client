import { useNavigate, Link, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Navbar, Container, Nav } from "react-bootstrap";
import "../assets/header.css";
import { useEffect, useState } from "react";
import { getMember } from "../api/member";

const Header = () => {
  const navigate = useNavigate();
  const { id: loginId, token, logout } = useAuth();
  const [member, setMember] = useState([]);
  const memberAPI = async (loginId) => {
    const result = await getMember(loginId);
    setMember(result.data);
  };
  useEffect(() => {
    memberAPI(loginId);
  }, []);

  const Cart = () => {
    navigate(`/cart/${loginId}`);
  };
  const Seller = () => {
    navigate(`/seller/${loginId}`);
  };
  const Mypage = () => {
    navigate(`/mypage/${loginId}`);
  };
  const Login = () => {
    navigate("/login");
  };
  const Signup = () => {
    navigate("/signup");
  };

  if (token === null) {
    // 여기가 로그인 안했을때
    return (
      <div>
        <Navbar bg="light" data-bs-theme="light">
          <Container className="nav-header">
            <Navbar.Brand>
              <Link to={"/"}>도토리 다판다</Link>
            </Navbar.Brand>
          </Container>
          <Nav className="me-auto">
            <Nav.Link onClick={Login}>Login</Nav.Link>
            <Nav.Link onClick={Signup}>Signup</Nav.Link>
          </Nav>
        </Navbar>
      </div>
    );
  } else {
    // 여기가 로그인 했을때
    return (
      <div>
        <Navbar bg="light" data-bs-theme="light">
          <Container className="nav-header">
            <Navbar.Brand>
              <Link to={"/"}>도토리 다판다</Link>
            </Navbar.Brand>
          </Container>
          <Nav className="me-auto">
            <h5>{member.type}</h5>
            <h4 className="login-id">{loginId} 님 환영합니다!</h4>
            <Nav.Link onClick={Cart}>Cart</Nav.Link>
            {member.type === "seller" ? (
              <Nav.Link onClick={Seller}>SellerMenu</Nav.Link>
            ) : null}
            <Nav.Link onClick={Mypage}>Mypage</Nav.Link>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          </Nav>
        </Navbar>
      </div>
    );
  }
};

export default Header;
