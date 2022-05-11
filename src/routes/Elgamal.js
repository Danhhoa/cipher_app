import { useState } from "react";
const bigInt = require("big-integer");

const Elgamal = () => {
  function random(min, max) {
    return bigInt.randBetween(min, max);
  }
  

  function gcd(a, b) {
    /*while (true) {
    if (a !== 0 && b !== 0) {
      if (a > b) {
        a = a % b;
      } else {
        b = b % a;
      }
    } else {
      return a + b;
    }
  }*/
    return bigInt.gcd(a, b);
  }

  function gen_key(q) {
    let key = random(bigInt(10).pow(20), q);
    while (parseInt(gcd(q, key)) != 1) {
      key = random(bigInt(10).pow(20), q);
    }
    return key;
  }

  function power(a, b, c) {
    /*let x = 1;
  let y = a;
  while (b > 0) {
    if (b % 2 != 0) {
      x = (x * y) % c;
    }
    y = (y * y) % c;
    b = parseInt(b / 2);
  }
  return x % c;*/
    return bigInt(a).modPow(b, c);
  }

  function encrypt(msg, q, h, g) {
    let en_msg = [];
    let k = gen_key(q);
    let s = power(h, k, q);
    let p = power(g, k, q);

    for (let i = 0; i < msg.length; i++) {
      en_msg.push(msg[i]);
    }

    console.log("g^k used: ", p);
    console.log("g^ak used: ", s);
    for (let i = 0; i < en_msg.length; i++) {
      en_msg[i] = s.multiply(en_msg[i].charCodeAt());
    }
    return [en_msg, p];
  }

  function decrypt(en_msg, p, key, q) {
    let dr_msg = [];
    let h = power(p, key, q);
    for (let i = 0; i < en_msg.length; i++) {
      dr_msg.push(String.fromCharCode(bigInt(en_msg[i]).divide(h)));
    }
    return dr_msg;
  }

  const [plainText, setPlainText] = useState("");
  const [cipherText, setCipherText] = useState("");
  let q = random(bigInt(10).pow(20), bigInt(10).pow(50));
  let g = random(2, q);
  let key = gen_key(q);
  let h = power(g, key, q);
  console.log("g used: ", g);
  console.log("g^a used: ", h);
  return (
    <>
      <div className="right-col">
        <div className="container">
          <div className="col-3">
            <label htmlFor="vigenere-plain-text">Plain Text</label>
            <textarea
              className="text"
              id="vigenere-plain-text"
              onChange={(e) => setPlainText(e.target.value)}
              value={plainText}
            >
              {plainText}
            </textarea>
          </div>

          <div className="btn-container">
            <button
              className="btn-encrypt"
              onClick={() => {
                console.log("Original Message:" + plainText);
                let [en_msg,p] = encrypt(plainText, q, h, g);
                console.log("mã hóa: " + en_msg);
                console.log("mã hóa: " + p);
                // let dr_msg = decrypt(en_msg, p, key, q);
                // let dmsg = dr_msg.join("");
                // console.log("Decrypted Message: ", dmsg);
                setCipherText(en_msg);
              }}
            >
              Encrypt
            </button>
            <button
              className="btn-decrypt"
              onClick={() => {
                // let dr_msg = decrypt(cipherText, p, key, q);
                // let dmsg = dr_msg.join("");
                // console.log("Decrypted Message: ", dmsg);
                // setPlainText(dmsg);
              }}
            >
              Decrypt
            </button>
          </div>

          <div className="col-3">
            <label htmlFor="vigenere-cipher-text">Cipher Text</label>
            <textarea
              className="text"
              id="vigenere-cipher-text"
              onChange={(e) => setCipherText(e.target.value)}
              value={cipherText}
            >
              {cipherText}
            </textarea>
          </div>
        </div>
      </div>
    </>
  );
};
export default Elgamal;
