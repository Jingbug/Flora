import React from 'react';
import {Background, LoadingText} from './Styles';
import Spinner from '../img/spinner2.gif';

export default function Loading() {
    return (
        <Background>
            <img src={Spinner} alt="로딩중" width="10%"/>
        </Background>
    );
};