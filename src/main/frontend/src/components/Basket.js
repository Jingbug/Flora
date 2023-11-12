import {Checkbox, Container, Grid, IconButton, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import xml2js from "react-native-xml2js";
import DeleteIcon from '@mui/icons-material/DeleteForeverOutlined'
import {CheckBox} from "@mui/icons-material";
import Loading from "./Loading";

const URL = "http://apis.data.go.kr/1390804/NihhsTodayFlowerInfo01/selectTodayFlowerView01";

export default function Basket() {
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

        axios.get(`../api/cart/${sessionStorage.getItem("user_name")}`)
            .then((res) => {
                console.log(res.data.data);
                setItem(res.data.data);
            })
            .catch();
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

    let sum_price = 0;
    const all_list = JSON.stringify(item);

    if (item) {
        sum_price = item.reduce((acc, currentItem) => acc + currentItem.price, 0);
    }

    function PurhadleClick(e) {
        if (isLogin === null) {
            alert("로그인 후 이용 가능합니다.");
            window.location.href = '/login';
        } else {
            const clickedData = e.currentTarget.value; // 클릭한 요소의 인덱스 추출
            localStorage.setItem("all_price", sum_price);
            localStorage.setItem("all_list", all_list);
            nav('../order', { state: { value: clickedData}});
        }
    }

    useEffect(() => {fetchData();
    }, [dataNum]);

    if (loading) return <Loading/>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return null;

    function onDel (e) {
        console.log(e.currentTarget.value);
        const seq = e.currentTarget.value;

        axios.delete(`../api/cart/del/${seq}`)
            .then((res) => {
                console.log(res);
                alert("삭제되었습니다!!");
                window.location.href = "/basket";
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
                       padding : '60px',
                       minHeight : '800px',
                       bgcolor : 'white',
                       fontFamily : "Nanum Myeongjo",
                       color :'#5b4936',
                   }}>
            <div className='basketBox'>
                <h2>꽃바구니</h2>
                <Grid container className='orderPro'>
                    { item && item.map(function (a, i) {
                        return(
                            <Grid item sm={12}>
                            <div className='basketItem'>
                                <Checkbox defaultChecked sx={{
                                    height: '30px', color: '#ca8a8b',
                                    '&.Mui-checked': {
                                        color: '#ca8a8b'
                                    }
                                }}/>
                                <img src={item[i].flowerImg} alt="꽃 이미지 1" className='orderImg'/>
                                <div className='orderText'>
                                    <h2 id='orItemT'>{item[i].flowerName}</h2>
                                    <h2 id='orItemT'>{item[i].price} 원</h2>
                                </div>
                                <IconButton sx={{
                                    color: 'rgba(166,166,166,0.73)',
                                    width: '24px',
                                    height: '24px',
                                    alignSelf: 'center',
                                    marginRight: '10px'
                                }} value={item[i].seq}
                                onClick={onDel}>
                                <DeleteIcon/>
                                </IconButton>
                            </div>
                            </Grid>
                            )
                        })
                    }
                </Grid>


                <div className='basketPrice'>
                    <h3 id='guPrice'>총 주문금액</h3>
                    <h2>{sum_price} 원</h2>
                </div>
                <div className='basketBox_bottom'>
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
        </Container>
    );
}
