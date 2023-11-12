import {Container} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import Button from "@mui/material/Button";

export default function Login() {
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");
    const handleInputId = (e) => {
        setInputId(e.target.value);
    };
    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    };

    const OnClickLogin = () => {
        console.log("click login");
        console.log("ID : ", inputId);
        console.log("PW : ", inputPw);
        axios.post("../api/users/login", {
            userId: inputId,
            password: inputPw,
        })
            .then((res) => {
                console.log(res.data.data);
                if(res.data.result === null){
                    alert("입력하신 아이디 또는 비밀번호가 일치하지 않습니다.");
                } else if(res.data.data.userId === inputId){
                    console.log("login Success!!!", res.data.status);
                    sessionStorage.setItem("user_id", res.data.data.userId);
                    sessionStorage.setItem("user_name", res.data.data.userName);
                    sessionStorage.setItem("email", res.data.data.email);
                    sessionStorage.setItem("tel", res.data.data.tel);
                    document.location.href='/';
                }
            })
            .catch();
    };

    return (
        <Container maxWidth="sm"
                    sx={{
                        display : 'flex',
                        flexDirection : 'column',
                        marginTop:'100px',
                        textAlign : 'center',
                        alignItems : 'center',
                        padding : '80px',
                        height : '800px',
                        bgcolor : 'white',
                        fontFamily : "Nanum Myeongjo",
                    }}>
            <h1>로그인</h1>
            <div className='loginBox'>
                <input className='input'
                       placeholder='아이디'
                       value={inputId}
                       name='input_id'
                       onChange={handleInputId}
                />
                <input className='input'
                       placeholder='비밀번호'
                       type='password'
                       value={inputPw}
                       name='input_pw'
                       onChange={handleInputPw}
                />
                <Button onClick={OnClickLogin}
                        variant="contained"
                        sx={{
                            marginTop:'20px',
                            color : '#574b3e',
                            bgcolor :'#f3efee',
                            boxShadow : 'none',
                            height : '35px',
                            padding: '20px 0',
                            ':hover': {
                                bgcolor:'#574b3e',
                                color : '#f3efee'
                            }
                        }}
                >로그인</Button>
            </div>
            <div className='loginBtm'>
                <Button href='/join' className='goJoin' > 회원가입 </Button>
            </div>
        </Container>
    );
}
