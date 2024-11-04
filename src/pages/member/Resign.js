import StyledButton from "../../components/Button";
import Input from "../../components/Input";
import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { passwordCheck, resignMember } from "../../api/member";

const Resign = () => {
  // 회원탈퇴 할때 해야할거
  // 1. 로그인한 상태여야 접근가능 (시큐리티)
  const { id } = useAuth();
  const [boolean, setBoolean] = useState(false);
  const [member, setMember] = useState({ password: "" });

  // 비밀번호 확인
  const checkSubmit = async () => {
    try {
      const result = await passwordCheck(member);
      console.log("통신 결과 = " + result.status);
      if (result.status === 200) {
        setBoolean(true);
        alert("비밀번호 확인완료");
      }
    } catch (error) {
      alert("비밀번호가 다릅니다");
      console.log("에러 = " + error);
    }
  };
  // 회원탈퇴
  const submit = async () => {
    await resignMember(id);
  };

  return (
    <>
      <div>
        {!boolean ? (
          <>
            <Input
              tag="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={member.password}
              change={(e) => setMember({ ...member, password: e.target.value })}
            />
            <StyledButton
              ButtonName={"비밀번호 확인"}
              onClick={checkSubmit}
            ></StyledButton>
          </>
        ) : null}

        {boolean ? (
          <StyledButton
            className="resignSubmit"
            ButtonName={"진짜나가게?"}
            onClick={submit}
          ></StyledButton>
        ) : null}
      </div>
    </>
  );
};

export default Resign;
