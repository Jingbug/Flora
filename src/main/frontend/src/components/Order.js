import axios from "axios";
import {useEffect, useRef, useState} from "react";
import xml2js from "react-native-xml2js";
import {Container, TextField} from "@mui/material";
import {useLocation} from "react-router-dom";
import {useNavigate}from "react-router-dom";
import '../App.css';
import Button from "@mui/material/Button";
import DaumPostcode from "react-daum-postcode";
import Modal from 'react-modal';
import { loadPaymentWidget, PaymentWidgetInstance, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
import {nanoid} from "nanoid";

const URL = "http://apis.data.go.kr/1390804/NihhsTodayFlowerInfo01/selectTodayFlowerView01";

const selector = "#payment-widget";

export default function Order() {
    const clientKey = "test_ck_DnyRpQWGrN609dOMbm2brKwv1M9E"
    const customerKey = "YbX2HuSlsC9uVJW6N";

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const key = process.env.REACT_APP_API_KEY;
    const loc = useLocation();
    const [flowInfo, setFlowInfo] = useState(defaultData());
    const [dataNum, setDataNum] = useState(defaultDataNo());
    const [item, setItem] = useState(null);
    const [all_price, setAllPrice] = useState(localStorage.getItem("all_price"));

    const [postcode, setPostcode] = useState('');
    const [address, setAddress] = useState('');
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

    const paymentMethodsWidgetRef = useRef(null);
    const paymentWidgetRef = useRef(null);
    const handleComplete = (data) => {
        setPostcode(data.zonecode);
        setAddress(data.address);
        setIsAddressModalOpen(false);
    };
    function defaultData(){
        if(loc.state != null){
            return loc.state.value;
        }
        return null;
    };

    const navigate = useNavigate();

    function defaultDataNo(){
        if(flowInfo != null){
            return flowInfo;
        }
        return 1;
    };
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

    useEffect(() => {fetchData();
    }, [dataNum]);

    function showFlower(){
        if(flowInfo != null){
            setDataNum(flowInfo)
            setFlowInfo(null);
            return dataNum;
        } else {
            return dataNum;
        }
    };

    function onChange(e) {
      const detail_add = e.target.value;
      localStorage.setItem("detail_add", detail_add);
    };

    useEffect(() => {
        (async () => {
            const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

            const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
                "#payment-widget",
                { value: all_price },
                { variantKey: "DEFAULT" }
            );

            paymentWidgetRef.current = paymentWidget;
            paymentMethodsWidgetRef.current = paymentMethodsWidget;
        })();
    }, []);

    useEffect(() => {
        const paymentMethodsWidget = paymentMethodsWidgetRef.current;

        if (paymentMethodsWidget == null) {
            return;
        }

        paymentMethodsWidget.updateAmount(all_price);
    }, [all_price]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return null;


    return (
        <Container maxWidth='sm' className='purBody' sx={{
            display: 'flex', flexDirection: 'column', justifyContent: 'start',
            bgcolor : 'white',
            padding: '60px',
            marginTop: '100px',
            fontFamily : 'Nanum Myeongjo',
            textAlign : 'center',
            color :'#5b4936'
        }}>
            <h1>주문</h1>
            <hr className='proline'/>
            <h2>상품정보</h2>
                { item && item.map(function (a, i) {
                    return(
                        <div className='proinfo'>
                            <img src={item[i].flowerImg} alt="꽃 이미지 1" className='proimg'/>
                            <div className='protext'>
                                <p>{item[i].flowerName}</p>
                                <h2>{item[i].price} 원</h2>
                            </div>
                        </div>
                        )
                    })
                }
            <div className='basketPrice'>
                <h3 id='guPrice'>총 주문금액</h3>
                <h2>{all_price} 원</h2>
            </div>
            <hr className='proline'/>
            <div className='off_cont'>
                <h2>주문자 정보</h2>
                <div id='off'>
                    이름 <TextField placeholder='이름을 입력해주세요' id='cus'/>
                </div>
                <div id='off'>
                    이메일 <TextField placeholder='이메일을 입력해주세요' id='cus'/>
                </div>
                <div id='off'>
                    휴대전화 <TextField placeholder='-없이 번호만 입력해주세요' id='cus'/>
                </div>
            </div>
            <hr className='proline'/>
            <div className='postCon'>
                <h2>배송 정보</h2>
                <Modal
                    isOpen={isAddressModalOpen}
                    onRequestClose={() => setIsAddressModalOpen(false)}
                    contentLabel="주소 검색"

                    style={{
                        overlay: {
                            position: 'fixed',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center'
                        },
                        content: {
                            position:'relative',
                            width:'500px',
                            height:'430px'
                        }
                    }}
                >
                    <DaumPostcode onComplete={handleComplete} autoClose className='postCode' />
                </Modal>
                <div className='postCode'>
                <TextField placeholder='우편번호' value={postcode} id='pos' readOnly/>

                {!isAddressModalOpen && (
                    <Button onClick={() => setIsAddressModalOpen(true)} variant='outlined'
                            sx={{color:'#ca8a8b',
                                borderColor:'#ca8a8b',
                                marginLeft : '20px',
                                ':hover': {
                                    bgcolor:'#e0dcdb',
                                    borderColor:'#ca8a8b'
                                }}}
                    >주소 검색</Button>
                )}
                </div>
                <TextField placeholder='주소' value={address} id='pos' readOnly/><br/>
                <TextField placeholder='상세주소' onChange={onChange} id='pos'/>

            </div>
            <hr className='proline'/>
            <div className='payCon'>
                <div id="payment-widget"/>
            </div>

            <div className='orderBtn'>
                <Button variant='outlined'
                        sx={{color:'#ca8a8b',
                            borderColor:'#ca8a8b',
                            height:'40px',
                            marginTop:'20px',
                            width:'100px',
                            ':hover': {
                                bgcolor:'#e0dcdb',
                                borderColor:'#ca8a8b'
                    }}}
                        onClick={async () => {
                        const paymentWidget = paymentWidgetRef.current;
                        localStorage.setItem("postcode", postcode);
                        localStorage.setItem("address", address);
                        try {
                            await paymentWidget?.requestPayment({
                                orderId: nanoid(),
                                orderName: "토스 티셔츠 외 2건",
                                customerName: sessionStorage.getItem("user_name"),
                                customerEmail: "customer123@gmail.com",
                                successUrl: `${window.location.origin}/success`,
                                failUrl: `${window.location.origin}/fail`,
                            });
                        } catch (error) {
                            // 에러 처리하기
                            console.error(error);
                        }
                    }}
                >결제하기</Button>
            </div>
        </Container>
    );
}
