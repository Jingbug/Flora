import {Container, TextField} from "@mui/material";
import EditUser from "./EditUser";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import xml2js from "react-native-xml2js";
import Modal from "react-modal";
import Loading from "./Loading";

const URL = "http://apis.data.go.kr/1390804/NihhsTodayFlowerInfo01/selectTodayFlowerView01";

export default function MyPage() {
    const [username] = useState(sessionStorage.getItem('user_name'))
    const [userid] = useState(sessionStorage.getItem('user_id'))
    const [data, setData] = useState(null);
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const key = process.env.REACT_APP_API_KEY;
    const loc = useLocation();
    const [flowInfo, setFlowInfo] = useState(defaultData());
    const [dataNum, setDataNum] = useState(defaultDataNo());
    const nav = useNavigate();

    function defaultData(){
        if(loc.state != null){
            return loc.state.value;
        }
        return null;
    };
    function defaultDataNo(){
        if(flowInfo != null){
            return flowInfo;
        }
        return 1;
    }
    const fetchData = async () => {
        try {
            setError(null);
            setData(null);
            setLoading(true);

            const response = await axios.get(URL, {
                params: {
                    serviceKey: decodeURIComponent(key),
                    dataNo: showFlower(),
                },
            });

            // XML 데이터를 JSON으로 변환
            xml2js.parseString(response.data, (err, result) => {
                if (err) {
                    throw err;
                }
                const jsonData = JSON.stringify(result);
                var data1 = jsonData.slice(21);
                var data2 = data1.slice(0, -3);
                const result_data = JSON.parse(data2);

                console.log(result_data);
                console.log(flowInfo, dataNum);
                setData(result_data.result[0]);
            });
        } catch (e) {
            setError(e);
        }
        setLoading(false);

        axios.get(`../api/order/${sessionStorage.getItem("user_name")}`)
            .then((res) => {
                console.log(res.data.data);
                setItem(res.data.data);
            })
    };

    function showFlower(){
        if(flowInfo != null){
            setDataNum(flowInfo)
            setFlowInfo(null);
            return dataNum;
        } else {
            return dataNum;
        }
    };

    useEffect(() => {fetchData();
    }, [dataNum]);

    if (loading) return <Loading/>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return null;

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
            <div className='myInfoBox'>
                <div className='myInfo'>
                    <h2>{username}</h2>
                    <p>{userid}</p>
                </div>
                    <Button id='userEdit_btn' href='/editUser'>
                        회원정보수정
                    </Button>
            </div>
            <div className='orderStsBox'>
                <div className='orderSts1' id='orderSts'>
                    상품준비중
                    <h2>3</h2>
                </div>
                <div id='orderSts'>
                    배송중
                    <h2>0</h2>
                </div>
                <div className='orderSts3' id='orderSts'>
                    배송완료
                    <h2>0</h2>
                </div>
            </div>
            <h3 className='orderListT'>
                주문 내역
            </h3>
            {item && item.map(function (a, i) {
                return (
                        <div className='orderListBox'>
                        <h3>
                            {item[i].date}
                        </h3>
                        <div className='orderPro'>
                            <img src={item[i].flowerImg} alt="꽃 이미지 1" className='orderImg'/>
                            <div className='orderText'>
                                <h2 id='orItemT'>{item[i].flowNm}</h2>
                                <h2 id='orItemT'>{item[i].price}</h2>
                                <p id='orItemT'>수량 : 1 개</p>
                            </div>
                        </div>
                        </div>
                    )
                })
            }
        </Container>
    );
}
