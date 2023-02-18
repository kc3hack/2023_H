import React from 'react';
import './tColor.css';
import reportWebVitals from './reportWebVitals';
import { useNavigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";


reportWebVitals();


function Traffic(){

  const navigate = useNavigate()
    return(
        <>
         
          <Button
            className="trafficReturnButton"
            onClick={() => {
              navigate(`${process.env.PUBLIC_URL}/`);
            }}
            variant="outlined"
          >
            戻る
          </Button>
        <h2>JR西日本</h2>
      <iframe src="https://trafficinfo.westjr.co.jp/kinki_history.html" width="1000" height="500" ></iframe>
    <h2>阪神電車</h2>
      <iframe src="https://delay.fteinfo.com/train/10/l-35001/" width="1000" height="500"></iframe>
    <h2>他の全情報</h2>
      <li><a href="https://transit.yahoo.co.jp/diainfo/pref/27">西日本　全情報（from Yahoo）</a></li>
      <li><a href="https://traininfo.jreast.co.jp/train_info/">JR東日本</a></li>

      <p>ここに表示されている情報はいずれも以下の方々のものであり、こちらに著作権はございません。</p>
      <li><a href="https://trafficinfo.westjr.co.jp/kinki_history.html">JR西日本：Copyright © WEST JAPAN RAILWAY COMPANY All RIGHTS RESERVED.</a></li>
      <li><a href="https://delay.fteinfo.com/train/10/l-35001/">阪神電気鉄道：Copyright(C)2018 FTEINFO.COM, Allright Reserved.</a></li>
        </>
      )
    
  }

  export default Traffic; 