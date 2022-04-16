import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Ceasar from './routes/Ceasar_Cipher'
import Transposition from "./routes/Transposition_Cipher"
import Affine from "./routes/Affine_Cipher"
import Vigenere from "./routes/Vigenere_Cipher"
import Hill from "./routes/Hill_Cipher"

ReactDOM.render(
    <BrowserRouter basename='/cipher_app'>
        <Routes>
        <Route path='/' element={<App/>}>
          <Route path="/ciphers/Ceasar" element={<Ceasar />} ></Route>
          <Route path='/ciphers/Transposition' element={<Transposition />} ></Route>
          <Route path='/ciphers/Affine' element={<Affine />} ></Route>
          <Route path='/ciphers/Vigenere' element={<Vigenere />} ></Route>
          <Route path='/ciphers/Hill' element={<Hill />} ></Route>
        </Route>
        </Routes>


    </BrowserRouter>,
  document.getElementById('root')
);

