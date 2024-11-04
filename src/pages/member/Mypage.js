import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import StyledButton from "../../components/Button";
import "../../assets/mypage.css";
import Input from "../../components/Input";
import Resign from "./Resign";
import { useState, useEffect, useRef } from "react";
import { updateMember } from "../../api/member";
import { useAuth } from "../../contexts/AuthContext";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import DaumAddress from "../../components/Address";

const Mypage = () => {
  const { id: loginId } = useAuth();
  // console.log("로그인 아이디 = " + loginId);
  const { id: paramsId } = useParams();
  // console.log("파라미터 아이디 = " + paramsId);
  const navigate = useNavigate();
  const [showAddress, setShowAddress] = useState(false);
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  const [member, setMember] = useState({
    id: loginId,
    password: "",
    name: "",
    email: "",
    phone: "",
    addr: "",
    addrDetail: "",
  });
  const [addr, setAddr] = useState({
    address: "",
    zonecode: "",
    jibunAddress: "",
  });

  // 주소 변경 시 멤버 정보에 업데이트
  useEffect(() => {
    setMember((prevMember) => ({
      ...prevMember,
      addr: addr.address, // addr.address 값을 member.addr에 반영
    }));
  }, [addr]);

  // focus 시점
  const pwdRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);

  // 비밀번호
  const pwdRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  const [pwdCheck, setPwdCheck] = useState(false);
  useEffect(() => {
    const result = pwdRegex.test(member.password);
    if (result === true) {
      setPwdCheck(true);
    } else {
      setPwdCheck(false);
    }
  }, [member.password]);

  // 이메일
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [emailCheck, setEmailCheck] = useState(false);
  useEffect(() => {
    const result = emailRegex.test(member.email);
    if (result === true) {
      setEmailCheck(true);
    } else {
      setEmailCheck(false);
    }
  }, [member.email]);

  // 전화번호
  const phoneRegex = /^(01[0-2,5][0-9])-?([0-9]{3,4})-?([0-9]{4})$/;
  const [phoneCheck, setPhoneCheck] = useState(false);
  useEffect(() => {
    const result = phoneRegex.test(member.phone);
    if (result === true) {
      setPhoneCheck(true);
    } else {
      setPhoneCheck(false);
    }
  }, [member.phone]);

  const updateSubmit = async () => {
    if (pwdCheck && emailCheck && phoneCheck) {
      console.log("업데이트 실행 할떄의 토큰 " + localStorage.getItem("token"));
      await updateMember(member);
      alert("수정되었습니다");
      navigate("/");
    } else if (!pwdCheck) {
      pwdRef.current.focus();
      alert("비밀번호를 확인해주세요");
    } else if (!emailCheck) {
      emailRef.current.focus();
      alert("이메일을 확인해주세요");
    } else if (!phoneCheck) {
      phoneRef.current.focus();
      alert("전화번호를 확인해주세요");
    }
  };

  if (loginId === null || paramsId !== loginId) {
    // 여기 에러페이지
    return <Navigate to="/error" />;
  }

  return (
    <>
      <div className="mypage-box">
        <div className="mypage-container" style={{ marginTop: "20%" }}>
          <Card
            style={{
              width: "25rem",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card.Img
              variant="top"
              src="https://seodongmun.github.io/DongsImg/10.jpg"
            />
            <Card.Body>
              <Card.Title>프로필 사진</Card.Title>
              <div className="image-button">
                <StyledButton ButtonName="수정"></StyledButton>
                <StyledButton ButtonName="기본"></StyledButton>
              </div>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <Input
                type="text"
                tag="이름"
                value={member.name}
                change={(e) => setMember({ ...member, name: e.target.value })}
              />
              <Input
                ref={pwdRef}
                type="password"
                tag=" * 비밀번호"
                value={member.password}
                change={(e) =>
                  setMember({ ...member, password: e.target.value })
                }
              />
              {pwdCheck ? null : "비밀번호를 입력해주세요"}
              <Input
                ref={emailRef}
                type="text"
                tag=" * 이메일"
                value={member.email}
                change={(e) => setMember({ ...member, email: e.target.value })}
              />
              {emailCheck ? null : "이메일을 입력해주세요"}
              <Input
                ref={phoneRef}
                type="text"
                tag=" * 전화번호"
                value={member.phone}
                change={(e) => setMember({ ...member, phone: e.target.value })}
              />
              {phoneCheck ? null : "전화번호를 입력해주세요"}
              <Input
                type="text"
                tag="* 주소"
                value={member.addr}
                change={(e) => setMember({ ...member, addr: e.target.value })}
              />
              <Input
                type="text"
                tag="* 상세주소"
                value={member.addrDetail}
                change={(e) =>
                  setMember({ ...member, addrDetail: e.target.value })
                }
              />
              {showAddress && <DaumAddress addr={addr} setAddr={setAddr} />}
              <StyledButton
                ButtonName={"주소선택"}
                onClick={() => setShowAddress(!showAddress)}
              ></StyledButton>
            </ListGroup>
            <StyledButton
              ButtonName="회원정보 수정"
              onClick={updateSubmit}
            ></StyledButton>
            <StyledButton
              ButtonName={"회원탈퇴"}
              onClick={toggle}
            ></StyledButton>
            {modal ? <Resign /> : null}
          </Card>
        </div>
      </div>
    </>
  );
};
export default Mypage;
