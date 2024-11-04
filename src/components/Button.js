import Button from "react-bootstrap/Button";
import styled from "styled-components";

const Style = styled.div`
  width: 50%;
`;

const StyledButton = ({ ButtonName, onClick, type, span }) => {
  return (
    <Style>
      <div>
        <Button variant="outline-primary" onClick={onClick} type={type}>
          {ButtonName}
        </Button>{" "}
      </div>
    </Style>
  );
};

export default StyledButton;
