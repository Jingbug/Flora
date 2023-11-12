import axios from "axios";
import { useEffect, useState } from "react";
import xml2js from "react-native-xml2js";
import {Container} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import '../App.css';
import Button from "@mui/material/Button";
import {NavigateBefore, NavigateNext, ShoppingBasket} from "@mui/icons-material";
import Loading from "./Loading";

const URL = "http://apis.data.go.kr/1390804/NihhsTodayFlowerInfo01/selectTodayFlowerView01";

export default function Detail() {
    const [data, setData] = useState(null);
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const key = process.env.REACT_APP_API_KEY;
    const loc = useLocation();
    const [flowInfo, setFlowInfo] = useState(defaultData());
    const [dataNum, setDataNum] = useState(defaultDataNo());
    const nav = useNavigate();
    const [isLogin, setIsLogin] = useState(sessionStorage.getItem("user_id"));

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

    function handleClick (e) {
        if ((e.target.value) === 'Next'){
            if (dataNum === 365){
                alert('마지막 페이지입니다!!');
            } else{
                setDataNum(parseInt(dataNum)+1);
            }
        } else if ((e.target.value) === 'Before') {
            if (dataNum === 1){
                alert('마지막 페이지입니다!!')
            } else{
                setDataNum(parseInt(dataNum)-1);
            }
        }
    };

    function PurhadleClick(e) {
        if (isLogin === null) {
            alert("로그인 후 이용 가능합니다.");
            window.location.href = '/login';
        } else {
            const clickedData = e.currentTarget.value; // 클릭한 요소의 인덱스 추출
            nav('../order', { state: { value: clickedData } });
        }
    }

    function onClick () {
        if (isLogin === null){
            alert("로그인 후 이용 가능합니다.");
            window.location.href = '/login';
        } else {
            axios.post("../api/cart/new", {
                flowerName: data.flowNm[0],
                price: 15000,
                flowerImg: data.imgUrl1[0],
                userName: sessionStorage.getItem("user_name")
            })
                .then((res) => {
                    console.log(res);
                    alert("장바구니에 담았습니다!");
                })
                .catch();
        }
    };

    return (
        <div className='detail_body'>
            <Container fixed sx={{display: 'flex',justifyContent:'center', flexDirection:'column', alignItems:'center', marginTop:'100px'}}>
                <div className="detail_content">
                    <div className="flowerName">
                        <h1>{data.flowNm}</h1>
                        <p>{data.fEngNm}</p>
                    </div>
                    <hr/>

                    <div className='flower_img'>
                        <img src={data.imgUrl1} alt="꽃 이미지 1" />
                    </div>
                    <h2 className='flowerLan'>" {data.flowLang} "</h2>
                    <div className='detail_text'>
                        <p><strong>📋 설명</strong><br/> {data.fContent}</p>
                        <p><strong>📋 용도</strong><br/> {data.fUse}</p>
                        <p><strong>📋 기르는 법</strong><br/> {data.fGrow}</p>
                        <p><br/><strong>출처:</strong> {data.publishOrg}</p>

                        <div className='detail_bottom'>
                            <Button variant="outlined"
                                    value="add basket"
                                    endIcon={<ShoppingBasket/>}
                                    onClick={onClick}
                                    sx={{color:'#ca8a8b',
                                        borderColor:'#ca8a8b',
                                        height:'40px',
                                        marginTop:'20px',
                                        marginRight : '20px',
                                        ':hover': {
                                            bgcolor:'#e0dcdb',
                                            borderColor:'#ca8a8b'
                                        }}}>
                                바구니에 담기
                            </Button>
                            <Button className='purbtn'
                                    variant='outlined'
                                    value={data.dataNo}
                                    onClick={PurhadleClick}
                                    sx={{color:'#ca8a8b',
                                        borderColor:'#ca8a8b',
                                        height:'40px',
                                        marginTop:'20px',
                                        ':hover': {
                                            bgcolor:'#e0dcdb',
                                            borderColor:'#ca8a8b'
                                        }
                                    }}>
                                구매</Button>
                        </div>
                    </div>

                </div>
                <div className='pageBtn'>
                    <Button variant="outlined"
                            value="Before"
                            onClick={handleClick}
                            startIcon={<NavigateBefore/>}
                            sx={{color:'#ca8a8b',
                                borderColor:'#ca8a8b',
                                ':hover': {
                                    bgcolor:'#e0dcdb',
                                    borderColor:'#ca8a8b'
                                }}}>
                        Before
                    </Button>
                    <Button variant="outlined"
                            value="Next"
                            onClick={handleClick}
                            endIcon={<NavigateNext/>}
                            sx={{color:'#ca8a8b',
                                borderColor:'#ca8a8b',
                                ':hover': {
                                    bgcolor:'#e0dcdb',
                                    borderColor:'#ca8a8b'
                                }}}>
                        Next
                    </Button>
                </div>
            </Container>
        </div>
    );
}
