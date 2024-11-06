import { Card } from "./../components/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";

const Main = () => {
  return (
    <>
      <main>
        <Carousel data-bs-theme="dark">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={process.env.PUBLIC_URL + "/다람쥐2.jpg"}
              alt="Second slide"
              width="100%"
              height="500px"
              style={{ backgroundSize: "cover", backgroundPosition: "center" }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={process.env.PUBLIC_URL + "/a.jpg"}
              alt="Second slide"
              width="100%"
              height="500px"
              style={{ backgroundSize: "cover", backgroundPosition: "center" }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={process.env.PUBLIC_URL + "/bg.png"}
              alt="Third slide"
              width="100%"
              height="500px"
              style={{ backgroundSize: "cover", backgroundPosition: "center" }}
            />
          </Carousel.Item>
        </Carousel>
        <Container>
          <Row>
            <Col xs>
              <Card />
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};

export default Main;
