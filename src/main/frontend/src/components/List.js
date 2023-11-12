import axios from "axios";
import { useEffect, useState } from "react";
import xml2js from "react-native-xml2js";
import {useNavigate} from "react-router-dom";
import {Container, Grid, Box} from "@mui/material";
import {NavigateBefore, NavigateNext, ShoppingBasket} from "@mui/icons-material";
import Button from "@mui/material/Button";
import addimg from "../img/G2.png";
import Loading from "./Loading";

const URL = "http://apis.data.go.kr/1390804/NihhsTodayFlowerInfo01/selectTodayFlowerList01";
export default function Main() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const key = process.env.REACT_APP_API_KEY;
    const [pageNum, setPageNum] = useState(1);
    const nav = useNavigate();



    const fetchData = async () => {
        setLoading(true);
        try {
            setError(null);
            setData(null);

            const response = await axios.get(URL, {
                params: {
                    serviceKey: decodeURIComponent(key),
                    pageNo: pageNum,
                    numOfRows: 12
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
                setData(result_data);
                setLoading(false);
            });
        } catch (e) {
            setError(e);
        }

    };

    useEffect(() => {
        fetchData();
    }, [pageNum]);

    if (loading) return <Loading/>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return null;
    function handleClick (e) {
        if ((e.target.value) === 'Next'){
            if (pageNum === 37){
                alert('마지막 페이지입니다!!');
            } else{
                setPageNum(pageNum+1);
            }
        } else if ((e.target.value) === 'Before') {
            if (pageNum === 1){
                alert('마지막 페이지입니다!!')
            } else{
                setPageNum(pageNum-1);
            }
        }
    };

    function DetailhandleClick(e) {
        const clickedData = e.currentTarget.textContent; // 클릭한 요소의 인덱스 추출
        const sData = clickedData.split(' ');
        console.log(sData[0]);
        nav('../detail', { state: { value: sData[0] } });
    }

    return (
        <div className='listBody2'>
            <Grid container className='listBody'>
                {
                    data.result && data.result.map(function (a, i) {
                        return(
                            <Grid item lg={3} md={4} sm={6} xs={12} className='listItem'>
                                <div className='listItem2'>
                                    <div className='listTem' onClick={DetailhandleClick}>
                                        <div className='itemNo'>{data.result[i].dataNo}</div>
                                        <img src={data.result[i].imgUrl1} className='itemImg'/> <br/>
                                        <div className='itemText'>
                                            <h2 className='itemName'> {data.result[i].flowNm} </h2>
                                            <p className='itemLan'>" {data.result[i].flowLang} "</p>
                                        </div>
                                    </div>
                                    <Button variant="outlined"
                                            value="add basket"
                                            sx={{color:'#ca8a8b',
                                                borderColor:'#ca8a8b',
                                                ':hover': {
                                                    bgcolor:'#ffffff',
                                                    borderColor:'#ca8a8b'
                                                }}}>
                                        바구니에 담기
                                    </Button>
                                </div>

                            </Grid>
                        )
                    })
                }
            </Grid>
            <div className='pageBtn'>
                <Button variant="outlined"
                        value="Before"
                        onClick={handleClick}
                        startIcon={<NavigateBefore/>}
                        sx={{color:'#ca8a8b',
                            borderColor:'#ca8a8b',
                            ':hover': {
                                bgcolor:'#e0dcdb',
                                borderColor:'#ca8a8b',
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
        </div>
    );
}