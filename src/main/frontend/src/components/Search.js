import {Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import xml2js from "react-native-xml2js";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Loading from "./Loading";

const URL = "https://apis.data.go.kr/1390804/NihhsTodayFlowerInfo01/selectTodayFlowerList01";
function Search() {
    const [flowerName, setFlowerName] = useState("");
    const [searchResult, setSearchResult] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [searchOption, setSearchOption] = useState(1);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedDay, setSelectedDay] = useState("");
    const key = process.env.REACT_APP_API_KEY;
    const nav = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSearchOptionChange = (event) => {
        setSearchOption(event.target.value);
        setSelectedMonth("");
        setSelectedDay("");
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
        setSelectedDay("");
    };

    const handleDayChange = (event) => {
        setSelectedDay(event.target.value);
    };

    // 선택된 월에 따라 해당 월의 일자 옵션을 동적으로 생성하는 함수
    const generateDayOptions = () => {
        if (selectedMonth === "") return []; // 선택된 월이 없으면 빈 배열 반환

        const monthDays = getDaysInMonth(selectedMonth); // 선택된 월의 총 일 수 계산

        return Array.from({ length: monthDays }, (_, index) => index + 1); // [1,2,...,monthDays] 배열 반환
    };

    // 선택된 월에 따라 해당 월의 총 일 수를 계산하는 함수
    const getDaysInMonth = (month) => {
        if (!month) return null;

        const year = new Date().getFullYear(); // 현재 연도 가져오기
        return new Date(year, month, 0).getDate(); // 현재 연도와 선택된 월로 날짜 객체 생성 후 마지막 날짜 반환
    };


    const fetchData = async () => {
        try {
            setError(null);
            setData(null);
            setLoading(true);
            const response = await axios.get(URL, {
                params: {
                    serviceKey: decodeURIComponent(key),
                    searchType: searchOption,
                    searchWord: flowerName,
                    fMonth: selectedMonth,
                    fDay: selectedDay
                },
            });

            // XML 데이터를 JSON으로 변환
            xml2js.parseString(response.data.toString(), (err, result) => {
                if (err) {
                    throw err;
                }
                const jsonData = JSON.stringify(result);
                var data1 = jsonData.slice(21);
                var data2 = data1.slice(0, -3);
                const result_data = JSON.parse(data2);

                console.log(result_data);
                setData(result_data.result);
                setLoading(false);
            });
        } catch (e) {
            setError(e);
        }
    };
    const handleInputChange = (event) => {
        setFlowerName(event.target.value);
        console.log(searchOption);
        console.log(selectedMonth, selectedDay);
    };

    const handleSearch = () => {
        setSearchResult(flowerName);
        console.log(flowerName);
        fetchData();
    };

    function DetailhandleClick(e) {
        const clickedData = e.currentTarget.textContent; // 클릭한 요소의 인덱스 추출
        const nav_Data = clickedData.split(' ')[0];
        console.log(nav_Data);
        nav('../detail', { state: { value: nav_Data } });
    }

    if (error) return <div>Error: {error.message}</div>;

    return (
        <Container maxWidth="lg" className='seBody'>
            <Container
                maxWidth="lg"
                className="search_con"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "110px",
                    padding: "30px",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor:'white'
                }}
            >
                <Box className="searchBox"
                     sx={{
                         display: "flex",
                         flexDirection : 'row',
                         justifyContent: "center",
                         alignItems : "center",
                         margin : "60px"
                     }}>
                    <FormControl variant="outlined"
                                 sx={{ marginRight: "20px"}}>
                        <Select
                            labelId="search-option-label"
                            id="search-option-select"
                            value={searchOption}
                            onChange={handleSearchOptionChange}
                            className = "search_opt"
                            variant="standard"
                            sx={{fontFamily:"Nanum Myeongjo"}}
                        >
                            <MenuItem value={0}>날짜</MenuItem>
                            <MenuItem value={1}>꽃 이름</MenuItem>
                            <MenuItem value={4}>꽃 말</MenuItem>
                        </Select>
                    </FormControl>
                    {searchOption === 0 ? (
                        <Box className="dateBox">
                            <select id="month-select" value={selectedMonth}
                                    onChange={handleMonthChange}
                                    className="monthSel">
                                <option value="">-</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                                <option value={11}>11</option>
                                <option value={12}>12</option>
                            </select>
                            <label htmlFor="month-select">월</label>

                            <select id="day-select" value={selectedDay}
                                    onChange={handleDayChange}
                                    className="daySel">
                                <option value="">-</option>
                                {generateDayOptions().map((day) => (
                                    <option key={day} value={day}>{day}</option>
                                ))}
                            </select>
                            <label htmlFor="day-select">일</label>
                        </Box>) : null}
                    {searchOption === 1 ? (
                        <TextField
                            placeholder= "꽃 이름을 입력하세요"
                            variant="standard"
                            value={flowerName}
                            onChange={handleInputChange}
                            className='searchInput'
                        />):null}
                    {searchOption === 4 ? (
                        <TextField
                            placeholder= "꽃말 입력"
                            variant="standard"
                            value={flowerName}
                            onChange={handleInputChange}
                            className='searchInput'
                        />):null}

                    <Button
                        onClick={handleSearch}
                        sx={{
                            height : "35px",
                            width : "70px",
                            color : "#e19a9a",
                            paddingLeft : "10px",
                            ':hover': {
                                bgcolor:'#e0dcdb',
                            }
                        }}>
                        <SearchIcon sx={{
                            width : '50px'
                        }}/>
                    </Button>
                </Box>
            </Container>
            {data && data.length > 0 ? (
                <Grid container maxWidth='lg'
                    sx={{
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                    }}>
                    {data.map((item, index) => (
                        <Grid item lg={4} sx={{display:'flex',justifyContent:'center'}}>
                        <div className="search_result_box">
                            <div key={index} onClick={DetailhandleClick}>
                                <img src={item.imgUrl1} alt={`flower-${index}`} />
                                <div className="result_text">
                                    <p className='itemNo'>{item.dataNo} </p>
                                    <p className='itemName'>{item.flowNm} </p>
                                    <p className="itemText">{item.flowLang}</p>
                                </div>
                            </div>
                        </div>
                        </Grid>
                    ))}
                </Grid>
            ) : null }
        </Container>
    );
}
export default Search;