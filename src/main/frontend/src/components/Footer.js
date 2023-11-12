import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";

export default function Footer() {
    return (
        <footer>
            <Box sx={{ display: 'flex', flexDirection:'row', justifyContent : 'space-between', alignItems:'end'}}>
                <div>
                    동양미래대학교<br/>
                    08221 서울시 구로구 경인로 445 ([구]고척동 62-160) 동양미래대학교<br/>
                    TEL. 02-2610-1700  /  FAX. 02-2688-5494
                </div>
                <Button sx={{color:'black', height:'20px'}} href="/seller">
                    Seller</Button>
            </Box>
        </footer>
    );
}