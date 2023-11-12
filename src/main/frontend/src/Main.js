import axios from "axios";
import { useEffect, useState } from "react";
import xml2js from "react-native-xml2js";
import {Container} from "@mui/material";
import Box from "@mui/material/Box";
import img01 from "./img/01.png";
import Loading from "./components/Loading";

const URL = " http://apis.data.go.kr/1390804/NihhsTodayFlowerInfo01/selectTodayFlower01";
export default function Main() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const key = process.env.REACT_APP_API_KEY;

    const fetchData = async () => {
        try {
            setError(null);
            setData(null);
            setLoading(true);

            const response = await axios.get(URL, {
                params: {
                    serviceKey: decodeURIComponent(key)
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


                console.log(result_data.result[0].flowNm);
                setData(result_data.result[0]);
            });
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };

    useEffect(() => {fetchData();
    }, []);

    if (loading) return <Loading/>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return null;

    return (
        <div>
            <Container maxWidth="1500px"
                       className='main_screen'
                       sx={{display:'flex',
                           width:'100vw',
                           margin:'0px',
                        }}>
            </Container>
            <Container fixed sx={{
                marginTop: '200px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <div className='tdTitle'>
                    <img src={img01}/>
                    <p className='todayFlo'>오늘의 꽃</p>
                </div>
                <Box className='recContent'>
                    <div className='recText'>
                        <div className='recfName'>
                            <h2 className='hName'> {data.flowNm}</h2>
                            <p className='eName'> {data.fEngNm}</p>
                        </div>
                        <p className='recfLan'>" {data.flowLang} "</p>
                    </div>
                    <img src={data.imgUrl3} alt="꽃 이미지 3" />
                </Box>
            </Container>
        </div>
    );
}
