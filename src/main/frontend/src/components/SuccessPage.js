import { useSearchParams } from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

export default function SuccessPage() {
    const searchParams = new URLSearchParams(window.location.search);
    const [item, setItem] = useState(null);
    var fn_arr = [];
    // 서버로 승인 요청
    const fetchData = async () => {
        axios.post("https://api.tosspayments.com/v1/payments/confirm", {
            paymentKey : searchParams.get("paymentKey"),
            amount : searchParams.get('amount'),
            orderId : searchParams.get('orderId')
        },{
            headers: { Authorization : "Basic dGVzdF9za19HakxKb1ExYVZaMTZYZWRBNmExSjN3NktZZTJSOg==" }
    }).then((res) => {
            setItem(res.data.totalAmount);
            console.log(res);
        }).catch();

        const list_arr = localStorage.getItem("all_list");
        const parse_arr = JSON.parse(list_arr);

        for(const e of parse_arr){
            console.log(e.flowerName);
            axios.post("../api/order/new",{
                flowerName: e.flowerName,
                price: e.price,
                flowerImg: e.flowerImg,
                userName: sessionStorage.getItem("user_name"),
                postNum: localStorage.getItem("postcode"),
                address: localStorage.getItem("address"),
                detailAddress: localStorage.getItem("detail_add")
            }).then((res) => {
                console.log(res);
                for(const e2 of parse_arr){
                    axios.delete(`../api/cart/del/${e2.seq}`)
                        .then((res) => {
                            console.log(res);
                            localStorage.clear();
                        })
                        .catch();
                }
            })
        }

        alert('결제 완료!!');
        window.location.href='../mypage';
    };

    useEffect(() => {fetchData();
    }, []);

    return (
        <div>
            <h1>결제 성공</h1>
            <div>총 주문 금액: {item}</div>
        </div>
    );
}
