import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import React, { forwardRef } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  #input-group {
    padding-top: 10px;
  }
  #form-control {
    height: 40px;
  }
  #input-span {
    margin-bottom: 10px;
  }
`;

// 커스텀한 컴포넌트에 ref를 쓰려면 forwardRef 지정해줘야함
// 아니면 사용되는 페이지에 className focus 주던가
const Input = forwardRef(
  ({ label, tag, type, placeholder, change, click, value, span }, ref) => {
    return (
      <StyledDiv>
        <label id="label" className="block text-sm mb-2">
          {label}
        </label>
        <InputGroup id="input-group" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            {tag}
          </InputGroup.Text>
          <Form.Control
            id="form-control"
            type={type}
            placeholder={placeholder}
            onChange={change}
            onClick={click}
            value={value}
            ref={ref}
            className="w-full px-4 py-3 border focus:outline-none width 100% "
          />
        </InputGroup>
        <span id="input-span">{span}</span>
      </StyledDiv>
    );
  }
);
export default Input;
