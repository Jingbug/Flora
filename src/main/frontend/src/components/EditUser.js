import {Container, TextField} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function EditUser() {
    const [username] = useState(sessionStorage.getItem('user_name'))
    const [userid] = useState(sessionStorage.getItem('user_id'))
    const [email] = useState(sessionStorage.getItem('email'))
    const [tel] = useState(sessionStorage.getItem('tel'))


    return (
        <Container maxWidth="sm"
                   sx={{
                       display : 'flex',
                       flexDirection : 'column',
                       marginTop:'100px',
                       textAlign : 'center',
                       alignItems : 'center',
                       padding : '60px',
                       minHeight : '800px',
                       bgcolor : 'white',
                       fontFamily : "Nanum Myeongjo",
                       color :'#5b4936',
                   }}>
            <div className='editCont'>
                <h2>회원정보</h2>
                <hr className='proline'/>
                <div className='editBox'>
                    <div id='edi'>
                        이름 <TextField id='cus' value={username} readOnly/>
                    </div>
                    <div id='edi'>
                        아이디 <TextField id='cus' value={userid} readOnly/>
                    </div>
                    <div id='edi'>
                        현재 비밀번호 <TextField id='cus'/>
                    </div>
                    <div id='edi'>
                        새 비밀번호 <TextField id='cus'/>
                    </div>
                    <div id='edi'>
                        비밀번호 확인 <TextField id='cus'/>
                    </div>
                    <div id='edi'>
                        이메일 <TextField id='cus' value={email}/>
                    </div>
                    <div id='edi'>
                        전화번호 <TextField id='cus' value={tel}/>
                    </div>
                </div>
                <div className='btn_edit'>
                    <Button id="edit_btn" href='/mypage'>수정</Button>
                </div>
            </div>
        </Container>
    );
}
