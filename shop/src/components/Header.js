import { useNavigate, Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

const Header = () => {
  const navigate = useNavigate();

  const Cart = () => {
    navigate("/cart");
  };

  const Login = () => {
    navigate("/login");
  };

  const Signup = () => {
    navigate("/signup");
  };

  const Logout = () => {
    // 토큰 없애는 로직
  };

  const Event = () => {
    navigate("/event");
  };
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container className="nav-header">
          <Navbar.Brand>
            <Link to={"/"}>도토리 다판다</Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={Cart}>Cart</Nav.Link>
          </Nav>
        </Container>
        <Nav className="me-auto">
          <Nav.Link onClick={Login}>Login</Nav.Link>
          <Nav.Link onClick={Signup}>Signup</Nav.Link>
          <Nav.Link></Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
