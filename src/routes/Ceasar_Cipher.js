import { useState } from "react";

const Ceasar = () => {
  // Encrypts text using a shift od s
  function encrypt(plainText, shift) {
    let result = "";
    for (let i = 0; i < plainText.length; i++) {
      let char = plainText[i];
      let charCode = char.charCodeAt(0);
      if (charCode === 32) {
          result += ' '
          continue
      }
      if (charCode >= 65 && charCode <= 90) {
        let ch = String.fromCharCode(((charCode + shift - 65) % 26) + 65);
        result += ch;
      } else {
        console.log("thong");
        let ch = String.fromCharCode(((charCode + shift - 97) % 26) + 97);
        result += ch;
      }
    }
    return result;
  }

  function decrypt(cipherText, shift) {
    let result = "";
    //traverse text
    for (let i = 0; i < cipherText.length; i++) {
      //apply transformation to each character
      //Encrypt Uppercase letters
      let char = cipherText[i];
      let charCode = char.charCodeAt(0);
        if (charCode === 32 ) {
            result += ' '
            continue
        }

      if (charCode >= 65 && charCode <= 90) {
        result += String.fromCharCode(
          ((charCode + shift - 65) % 26) + 65);
      }
      //Encrypt Lowercase letters
      else {
        result += String.fromCharCode(
          ((charCode + shift - 97) % 26) + 97);
      }
    }
    return result;
  }
  // Driver code
  //  let text = "ATTACKATONCE";
  //  let s = 4;
  //  document.write("Text  : " + text + "<br>");
  //  document.write("Shift : " + s + "<br>");
  //  document.write("Cipher: " + encrypt(text, s) + "<br>");

  const [plainText, setPlainText] = useState("");
  const [cipherText, setCipherText] = useState("");
  const [shift, setShift] = useState(1);

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
        </div>

        <div className="col-3">
          <label className="label-key label" htmlFor="ceaser_shift">
            Shift
          </label>
          <button
            className="field-number__down"
            onClick={() => {
              shift - 1 <= 0 ? setShift(1) : setShift(shift - 1);
            }}
          >
            -
          </button>
          <div
            className="key_shift"
            onChange={(e) => setShift(e.target.value)}
            value={shift}
          >
            {shift}
          </div>
          <button
            className="field-number__up"
            onClick={() => setShift(shift + 1)}
          >
            +
          </button>

          <div className="btn-container">
            <button className="btn-encrypt"
              onClick={() => {
                setCipherText(encrypt(plainText, shift));
              }}
            >
              Encrypt
            </button>
            <button className="btn-decrypt"
              onClick={() => {
                setPlainText(decrypt(cipherText, 26 - shift));
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
            onChange={(e) => setCipherText(e.target.value)}
            value={cipherText}
          >
            {cipherText}
          </textarea>
        </div>
      </div>
    </div>
  );
};

export default Ceasar;
