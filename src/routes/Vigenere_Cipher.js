import { useState } from "react";
import IsEmpty from "../utils/IsEmpty";
function generateKey(str, key) {
  key = key.split("");
  if (str.length == key.length) return key.join("");
  else {
    let temp = key.length;
    for (let i = 0; i < str.length - temp; i++) {
      key.push(key[i % key.length]);
    }
  }
  return key.join("");
}

// This function returns the encrypted text
// generated with the help of the key
function cipherText(str, key) {
  let cipher_text = "";

  for (let i = 0; i < str.length; i++) {
    if (str[i] === " ") {
      cipher_text += " ";
      continue;
    }
    // converting in range 0-25
    let charCode = str[i].charCodeAt(0);
    let x, upperCode;
    if (charCode >= 97 && charCode <= 122) {
      upperCode = str[i].toUpperCase().charCodeAt(0);
      x = (upperCode + key[i].charCodeAt(0)) % 26;

      // convert into alphabets(ASCII)
      x += "A".charCodeAt(0);
      cipher_text += String.fromCharCode(x).toLowerCase();
    } else {
      // convert into alphabets(ASCII)
      x = (charCode + key[i].charCodeAt(0)) % 26;
      x += "A".charCodeAt(0);
      cipher_text += String.fromCharCode(x);
    }
  }
  return cipher_text;
}

// This function decrypts the encrypted text
// and returns the original text
function originalText(cipherText, key) {
  let orig_text = "";

  for (let i = 0; i < cipherText.length; i++) {
    let charCode = cipherText[i].charCodeAt(0);
    // let charKey = key[i].charCodeAt(0);
    let x, upperCode;

    if (cipherText[i] === " ") {
      orig_text += " ";
      continue;
    }

    if (charCode >= 97 && charCode <= 122) {
      upperCode = cipherText[i].toUpperCase().charCodeAt(0);
      x = (upperCode - key[i].charCodeAt(0) + 26) % 26;
      // convert into alphabets(ASCII)
      x += "A".charCodeAt(0);
      orig_text += String.fromCharCode(x).toLowerCase();
    } else {
      x = (charCode - key[i].charCodeAt(0) + 26) % 26;
      // convert into alphabets(ASCII)
      x += "A".charCodeAt(0);
      orig_text += String.fromCharCode(x);
    }

    // converting in range 0-25
  }
  return orig_text;
}

// This function will convert the lower
// case character to Upper case
function LowerToUpper(s) {
  let str = s.split("");
  for (let i = 0; i < s.length; i++) {
    if (s[i] == s[i].toLowerCase()) {
      str[i] = s[i].toUpperCase();
    }
  }
  s = str.toString();
  return s;
}

// Driver code

const Vigenere = () => {
  const [plainText, setPlainText] = useState("");
  const [cipher, setCipher] = useState("");
  const [keyWord, setKeyWord] = useState("");
  const [showWarningEn, setShowWarningEn] = useState(false)
  const [showWarningDe, setShowWarningDe] = useState(false)


  function Encrypt(plainText, keyWord) {
    let key = generateKey(plainText, keyWord);
    let results = cipherText(plainText, key);
    return results;
  }

  function Decrypt(cipherText, keyWord) {
    console.log("decrypt: " + cipherText, typeof cipherText);
    let key = generateKey(cipherText, keyWord);
    let results = originalText(cipherText, key);
    return results;
  }

  return (
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
          {
            showWarningEn ? <label className="warning-empty" >Hãy nhập dữ liệu cần mã hóa</label> : ""
          }
        </div>

        <div className="col-3">
          <label className="label-key label" htmlFor="vigenere_key">
            Key
          </label>
          <textarea
            className=" key_shift"
            onChange={(e) => setKeyWord(e.target.value)}
            value={keyWord}
          >
            {keyWord}
          </textarea>

          <div className="btn-container">
            <button
              className="btn-encrypt"
              onClick={() => {
                IsEmpty(plainText) ? setShowWarningEn(true) : setShowWarningEn(false); setCipher(Encrypt(plainText, keyWord));
              }}
            >
              Encrypt
            </button>
            <button
              className="btn-decrypt"
              onClick={() => {
                IsEmpty(cipher) ? setShowWarningDe(true) : setShowWarningDe(false) ;setPlainText(Decrypt(cipher, keyWord));
              }}
            >
              Decrypt
            </button>
          </div>
        </div>

        <div className="col-3">
          <label htmlFor="vigenere-cipher-text">Cipher Text</label>
          <textarea
            className="text"
            id="vigenere-cipher-text"
            onChange={(e) => {
              setCipher(e.target.value);
              // setPlainText(Decrypt(cipher, keyWord))
            }}
            value={cipher}
          >
            {cipher}
          </textarea>
          {
            showWarningDe ? <label className="warning-empty" >Hãy nhập dữ liệu cần giải mã</label> : ""
          }
        </div>
      </div>
    </div>
  );
};

export default Vigenere;
