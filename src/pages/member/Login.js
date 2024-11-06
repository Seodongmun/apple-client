import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { login } from "../../api/member";
import { useAuth } from "../../contexts/AuthContext";
import "../../assets/login.css";
import Input from "../../components/Input";
import StyledButton from "../../components/Button";

const Login = () => {
  const navigate = useNavigate();

  // 구글 로그인
  const google = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };
  const signup = () => {
    navigate("/signup");
  };
  const { login: authLogin } = useAuth(); // login이 다른 함수명으로 있어서 이름을 변경

  const [member, setMember] = useState({
    id: "",
    password: "",
  });

  const activeEnter = (e) => {
    if (e.key === "Enter") {
      submit();
    }
  };

  // Enter 키로 로그인
  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === "Enter") {
        submit();
      }
    };
    window.addEventListener("keydown", handleEnter);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("keydown", handleEnter);
    };
  }, [member]);

  const submit = async () => {
    const result = await login(member);
    try {
      if (result.status === 200) {
        await login(member);
        authLogin(result.data);
        console.log(result.data);
        alert("로그인 성공!");
        window.location.href = "/";
      }
    } catch {
      alert("아이디나 비밀번호가 다릅니다");
    }
  };

  return (
    <>
      <div className="login-box">
        <div className="login-container">
          <h1>로그인</h1>

          <Input
            tag="아이디"
            type="text"
            placeholder="아이디를 입력해주세요"
            value={member.id}
            change={(e) => setMember({ ...member, id: e.target.value })}
          />
          <Input
            tag="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={member.password}
            change={(e) => setMember({ ...member, password: e.target.value })}
          />
          <div style={{ width: "50%", display: "flex" }}>
            <StyledButton
              ButtonName="로그인"
              onClick={submit}
              onKeyDown={activeEnter}
              tabIndex="0"
            />
            <StyledButton ButtonName="구글 로그인" onClick={google} />
            <StyledButton ButtonName="회원가입" onClick={signup} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
