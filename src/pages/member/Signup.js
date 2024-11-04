import Input from "../../components/Input";
import "../../assets/signup.css";
import { signup } from "../../api/member";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import DaumAddress from "../../components/Address";
import StyledButton from "../../components/Button";

const Signup = () => {
  const navigate = useNavigate();
  // 멤버 정보
  const { members } = useOutletContext();
  const [addr, setAddr] = useState({
    address: "",
    zonecode: "",
    jibunAddress: "",
  });

  const [member, setMember] = useState({
    id: "",
    password: "",
    name: "",
    email: "",
    phone: "",
    addr: "",
    addrDetail: "",
    type: "",
  });

  // 아이디
  const idRegex = /^(?=.{6,20}$)(?!.*[^\w!@#$%^&*]).*$/;
  const [idCheck, setIdCheck] = useState(false);
  const [idDupCheck, setIdDupCheck] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  useEffect(() => {
    // 정규표현식 체크
    const result = idRegex.test(member.id);
    if (result === true) {
      setIdCheck(true);
    } else {
      setIdCheck(false);
    }
    // 중복체크
    // map으로 상태체크를 하면 마지막 요소의 체크 결과만 반영되므로 true false 조건 거는건 지향
    // some은 배열안에 true 있을시 반환
    // every는 배열안에 false 있을시 반환
    const dupCheck = members.some((a) => a.id === member.id);
    console.log("중복체크 = " + dupCheck); // 중복시 true
    setIdDupCheck(dupCheck);
  }, [member.id]);

  // 주소 변경 시 멤버 정보에 업데이트
  useEffect(() => {
    setMember((prevMember) => ({
      ...prevMember,
      addr: addr.address, // addr.address 값을 member.addr에 반영
    }));
  }, [addr]);

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

  // focus 시점
  const idRef = useRef(null);
  const pwdRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const submit = async () => {
    if (
      idCheck &&
      pwdCheck &&
      emailCheck &&
      phoneCheck &&
      member.type !== null &&
      member.type !== ""
    ) {
      alert("회원가입 성공");
      const result = await signup(member);
      console.log("회원가입 submit = " + result);
      navigate("/login");
    } else if (idDupCheck) {
      idRef.current.focus();
      alert("이미 있는 아이디입니다");
    } else if (!idCheck) {
      idRef.current.focus();
      alert("아이디를 확인해주세요");
    } else if (!pwdCheck) {
      pwdRef.current.focus();
      alert("비밀번호를 확인해주세요");
    } else if (!emailCheck) {
      emailRef.current.focus();
      alert("이메일을 확인해주세요");
    } else if (!phoneCheck) {
      phoneRef.current.focus();
      alert("전화번호를 확인해주세요");
    } else {
      alert("회원 유형을 선택해주세요");
    }
  };
  return (
    <>
      <div className="signup-box">
        <div className="signup-container">
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 shadow-md max-w-md w-full">
              <h1
                className="text-3xl font-bold text-center mb-8"
                style={{ fontSize: "2rem" }}
              >
                회원가입
              </h1>
              <div className="container">
                <Input
                  ref={idRef}
                  className="memberId"
                  tag="아이디"
                  type="text"
                  placeholder="아이디를 입력해주세요"
                  value={member.id}
                  change={(e) => setMember({ ...member, id: e.target.value })}
                />
                <h4>
                  {!idCheck || member.id === ""
                    ? "최소 6자 이상, 20자 사이 / 공백금지 / 특수문자 금지 / 대소문자 숫자 특수문자 가능"
                    : null}
                </h4>
                <h1>
                  {!idCheck || member.id === ""
                    ? "아이디를 확인해주세요"
                    : null}
                </h1>
                <h1>{idDupCheck ? "이미 있는 아이디입니다" : null}</h1>

                <div>
                  <Input
                    ref={pwdRef}
                    tag="비밀번호"
                    type="password"
                    placeholder="비밀번호를 입력해주세요"
                    value={member.password}
                    change={(e) =>
                      setMember({ ...member, password: e.target.value })
                    }
                  />
                  <h4>
                    {!pwdCheck || member.password === ""
                      ? "최소 8자 이상 대,소문자 특수문자 포함"
                      : null}
                  </h4>
                  <h1>
                    {!pwdCheck || member.password === ""
                      ? "비밀번호를 확인해주세요"
                      : null}
                  </h1>
                </div>
                <div>
                  <Input
                    ref={nameRef}
                    tag="이름"
                    type="text"
                    placeholder="이름을 입력하세요"
                    value={member.name}
                    change={(e) =>
                      setMember({ ...member, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Input
                    ref={emailRef}
                    tag="email"
                    type="email"
                    placeholder="이메일을 입력해주세요"
                    value={member.email}
                    change={(e) =>
                      setMember({ ...member, email: e.target.value })
                    }
                  />
                  <h1>
                    {!emailCheck || member.email === ""
                      ? "이메일을 확인해주세요"
                      : null}
                  </h1>
                </div>
                <div>
                  <Input
                    ref={phoneRef}
                    tag="전화번호"
                    type="text"
                    placeholder="전화번호를 입력해주세요"
                    value={member.phone}
                    change={(e) =>
                      setMember({ ...member, phone: e.target.value })
                    }
                  />
                  <h1>
                    {!phoneCheck || member.phone === ""
                      ? "전화번호를 확인해주세요"
                      : null}
                  </h1>
                  <h4>
                    {!phoneCheck || member.phone === ""
                      ? "- 빼고 입력하세요"
                      : null}
                  </h4>
                  <Input
                    tag="주소"
                    type="text"
                    placeholder="주소"
                    value={addr.address}
                    change={(e) =>
                      setMember({ ...member, addr: e.target.value })
                    }
                  />
                  <Input
                    tag="상세주소"
                    type="text"
                    placeholder="상세주소"
                    value={addr.addrDetail}
                    change={(e) =>
                      setMember({ ...member, addrDetail: e.target.value })
                    }
                  />
                  {showAddress && <DaumAddress addr={addr} setAddr={setAddr} />}
                  <div style={{ display: "flex" }}>
                    <StyledButton
                      ButtonName={"주소선택"}
                      onClick={() => setShowAddress(!showAddress)}
                    ></StyledButton>
                    <div
                      style={{
                        display: "flex",
                        textAlign: "center",
                        justifyContent: "center",
                        width: "200px",
                        height: "50px",
                      }}
                    >
                      <label>
                        <input
                          type="radio"
                          name="userType"
                          value="member"
                          checked={member.type === "member"}
                          onChange={() =>
                            setMember({ ...member, type: "member" })
                          }
                        />
                        일반회원
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="userType"
                          value="seller"
                          checked={member.type === "seller"}
                          onChange={() =>
                            setMember({ ...member, type: "seller" })
                          }
                        />
                        판매자
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="bg-black text-white w-full py-3 font-bold rounded hover:bg-red-600 "
                  onClick={submit}
                >
                  회원가입
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
