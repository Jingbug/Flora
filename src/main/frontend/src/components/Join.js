import {Container} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import axios from "axios";

export default function Join() {
    const [account, setAccount] = useState({
        inputName: "", inputId: "", inputPw: "",inputPwCheck: "", inputPhone: "", inputEmail: ""
    });
    const {inputName, inputNick, inputId, inputPw, inputPwCheck, inputPhone, inputEmail} = account;
    const onChangeAccount = (e) => {
        setAccount({
            ...account,
            [e.target.name] : e.target.value,
        });
    };
    const OnClickSignUp = () => {
        console.log(account);
        if(inputPwCheck !== inputPw){
            alert("비밀번호를 확인해주세요");
            document.location.href = '/join';
        }
        axios.post("/api/users/signUp", {
            userName: inputName,
            userId: inputId,
            password: inputPw,
            tel: inputPhone,
            email: inputEmail,
        }).then(() => {
            alert("회원가입이 완료되었습니다!");
            document.location.href="/login";
        }).catch();
    };

    return (
        <Container maxWidth="sm"
                   sx={{
                       display : 'flex',
                       flexDirection : 'column',
                       marginTop:'100px',
                       textAlign : 'center',
                       alignItems : 'center',
                       padding : '60px',
                       height : '800px',
                       bgcolor : 'white',
                       fontFamily : "Nanum Myeongjo",
                       color :'#5b4936',
                   }}>
            <h1>
                회원 가입
            </h1>
            <hr className='proline'/>
            <div className='joinBox'>
                <input className='input' name='inputName'
                       value={inputName} onChange={onChangeAccount}
                       placeholder='이름'/>
                <input className='input' name="inputId"
                       value={inputId} onChange={onChangeAccount}
                       placeholder='아이디'/>
                <input className='password' name='inputPw'
                       value={inputPw} onChange={onChangeAccount}
                       type='password'
                       placeholder='비밀번호'/>
                <input className='password' name='inputPwCheck'
                       value={inputPwCheck} onChange={onChangeAccount}
                       type='password'
                       placeholder='비밀번호 확인'/>
                <input className='input' name='inputPhone'
                       value={inputPhone} onChange={onChangeAccount}
                       placeholder='전화번호'/>
                <input className='input' name='inputEmail'
                       value={inputEmail} onChange={onChangeAccount}
                       placeholder='이메일 입력'/>
            </div>
            <div className='btn_sub'>
                <Button id="join_btn" onClick={OnClickSignUp}>가입하기</Button>
            </div>
        </Container>
    );
}
