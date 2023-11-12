import {
    Container,
    FormControl,
    IconButton,
    MenuItem, Paper,
    Select,
    Table, TableBody,
    TableCell, TableContainer,
    TableHead,
    TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import xml2js from "react-native-xml2js";
import DeleteIcon from '@mui/icons-material/DeleteForeverOutlined'

const URL = "http://apis.data.go.kr/1390804/NihhsTodayFlowerInfo01/selectTodayFlowerView01";

export default function Seller() {
    const [username] = useState(sessionStorage.getItem('user_name'));
    const [usertel] = useState(parseInt(sessionStorage.getItem('tel')));
    const [data, setData] = useState(null);
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return null;


    return (
        <Container maxWidth="lg"
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
            <h2>주문목록</h2>
            <TableContainer component={Paper}>
                <Table className='SellerBox' size="small">
                    <TableHead className='cusMenu'>
                        <TableCell align="center">구매자 이름</TableCell>
                        <TableCell align="center">전화번호</TableCell>
                        <TableCell align="center">상품이름</TableCell>
                        <TableCell align="center">수량</TableCell>
                        <TableCell align="center">결제금액</TableCell>
                        <TableCell align="center">처리상태</TableCell>
                    </TableHead>
                    <TableBody className='orderPro'>
                            <TableCell align="center">{username}</TableCell>
                            <TableCell align="center">01012341234</TableCell>
                            <TableCell align="center">{data.flowNm}</TableCell>
                            <TableCell align="center">1</TableCell>
                            <TableCell align="center">15,000 원</TableCell>
                        <TableCell align="center">
                            <FormControl variant="outlined"
                                         sx={{ marginRight: "20px"}}>
                                <Select
                                    labelId="search-option-label"
                                    id="search-option-select"
                                    variant="standard"
                                    sx={{fontFamily:"Nanum Myeongjo",
                                        width:'100px',
                                        margin:'0px'
                                    }}
                                >
                                    <MenuItem>결제완료</MenuItem>
                                    <MenuItem>상품준비중</MenuItem>
                                    <MenuItem>배송중</MenuItem>
                                    <MenuItem>배송완료</MenuItem>
                                </Select>
                            </FormControl>
                        </TableCell>
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
