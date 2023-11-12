import './App.css';
import { Route, Routes} from "react-router-dom";
import Main from "./Main";
import Detail from "./components/Detail";
import {Header} from "./components/Header";
import  List from "./components/List";
import Search from "./components/Search";
import Order from "./components/Order";
import Login from "./components/Login";
import Join from "./components/Join";
import MyPage from "./components/MyPage";
import EditUser from "./components/EditUser";
import Basket from "./components/Basket";
import Footer from "./components/Footer";
import Seller from "./components/Seller"
import SuccessPage from "./components/SuccessPage";
import FailPage from "./components/FailPage";
export default function App() {
  return (
        <div className='App'>
            <Header/>
            <Routes>
                <Route exact path="/" element={<Main/>}></Route>
                <Route path="/detail" element={<Detail/>}></Route>
                <Route path="/list" element={<List/>}></Route>
                <Route path="/search" element={<Search/>}></Route>
                <Route path="/order" element={<Order/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/join" element={<Join/>}></Route>
                <Route path="/mypage" element={<MyPage/>}></Route>
                <Route path="/edituser" element={<EditUser/>}></Route>
                <Route path="/basket" element={<Basket/>}></Route>
                <Route path="/success" element={<SuccessPage/>}></Route>
                <Route path="/fail" element={<FailPage/>}></Route>
                <Route path="/seller" element={<Seller/>}></Route>
            </Routes>
            <Footer/>
        </div>
  );
}

