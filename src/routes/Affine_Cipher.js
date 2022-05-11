import { useState } from "react";

const Affine = () => {
  const numbers = "1234567890";
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const isNumber = (x) => numbers.indexOf(x) > -1;
  const isLetter = (x) => letters.indexOf(x) > -1;
  const mod = (a, n) => ((a % n) + n) % n;

  const gcd = (a, b) => {
    for (let x = 1; x < b; x++) {
      if (((a % b) * x) % b === 1) {
        return x;
      }
    }
    return undefined;
  };

  const encode = (phrase, key) => {
    const { a, b } = key;
    let result = "";

    if (isNaN(gcd(a, letters.length))) {
      throw new Error("a and m must be coprime.");
    }
    for (var i = 0; i < phrase.length; i++) {
      if (phrase[i].charCodeAt(0) >= 65 && phrase[i].charCodeAt(0) <= 90) {
          if (phrase[i].charCodeAt(0) === 32) {
              result += ' ';
              continue
          }
        var alphaIndex = upperLetters.indexOf(phrase[i]);

        var troublesome = (a * alphaIndex + b) % upperLetters.length;
  
        phrase =
          phrase.substring(0, i) +
          upperLetters[troublesome] +
          phrase.substring(i + 1);
      }
      else {
        if (phrase[i].charCodeAt(0) === 32) {
            result += ' ';
            continue
        }
        var alphaIndex = letters.indexOf(phrase[i]);

        var troublesome = (a * alphaIndex + b) % letters.length;

        phrase =
          phrase.substring(0, i) +
          letters[troublesome] +
          phrase.substring(i + 1);
      }
    }
    return phrase;
  };

  const decode = (phrase, key) => {
    const { a, b } = key;
    let result = "";
    for (var i = 0; i < phrase.length; i++) {
      //Bruteforce the modular invert of the a
      if (phrase[i].charCodeAt(0) >= 65 && phrase[i].charCodeAt(0) <= 90) {
        if (phrase[i].charCodeAt(0) === 32) {
            result += ' ';
            continue
        }
        for (var j = 1; j < upperLetters.length; j++) {
            if ((a * j) % upperLetters.length == 1) var invert = j;
          }
    
          var alphaIndex = upperLetters.indexOf(phrase[i]);
    
          var troublesome = (invert * (alphaIndex - b)) % upperLetters.length;
          if (troublesome < 0) troublesome += upperLetters.length;
          phrase =
            phrase.substring(0, i) +
            upperLetters[troublesome] +
            phrase.substring(i + 1);
      }
      else {
        if (phrase[i].charCodeAt(0) === 32) {
            result += ' ';
            continue
        }
        for (var j = 1; j < letters.length; j++) {
          if ((a * j) % letters.length == 1) var invert = j;
        }

        var alphaIndex = letters.indexOf(phrase[i]);

        var troublesome = (invert * (alphaIndex - b)) % letters.length;
        if (troublesome < 0) troublesome += letters.length;
        phrase =
          phrase.substring(0, i) +
          letters[troublesome] +
          phrase.substring(i + 1);
      }
    }
    return phrase;
  };

  const [plainText, setPlainText] = useState("");
  const [cipherText, setCipherText] = useState("");
  const [keyA, setKeyA] = useState(1);
  const [keyB, setKeyB] = useState(1);

  console.log(plainText);
  console.log(cipherText);

  return (
    <div className="right-col">
      <div className="container">
        <div className="col-3">
          <label className="label-title">Plain text</label>
          <textarea
            className="text"
            type="text"
            onChange={(e) => setPlainText(e.target.value)}
            value={plainText}
          >
            {plainText}
          </textarea>
        </div>
        <div className="col-3">
          <div className="field field-number">
            <label className="label">slope / a</label>
            <div className="field-number__field">
              <button
                className="field-number__down"
                onClick={() =>
                  setKeyA((keyA) => (keyA - 2 === 13 ? keyA - 4 : keyA - 2))
                }
              >
                -
              </button>
              <div className="field-number__value">{keyA}</div>
              <button
                className="field-number__up"
                onClick={() =>
                  setKeyA((keyA) => (keyA + 2 === 13 ? keyA + 4 : keyA + 2))
                }
              >
                +
              </button>
            </div>
          </div>

          <div className="field field-number">
            <label className="label">intercept / b</label>
            <div className="field-number__field">
              <button
                className="field-number__down"
                onClick={() => setKeyB((keyB) => keyB - 1)}
              >
                -
              </button>
              <div className="field-number__value">{keyB}</div>
              <button
                className="field-number__up"
                onClick={() => setKeyB((keyB) => keyB + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="btn-container">
            <button
              className="btn-encrypt"
              onClick={() =>
                setCipherText(encode(plainText, { a: keyA, b: keyB }))
              }
            >
              Encrypt
            </button>
            <button
              className="btn-decrypt"
              onClick={() =>
                setPlainText(decode(cipherText, { a: keyA, b: keyB }))
              }
            >
              Decrypt
            </button>
          </div>
        </div>
        <div className="col-3">
          <label className="label-title">Cipher text</label>
          <textarea
            className="text"
            type="text"
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

export default Affine;
