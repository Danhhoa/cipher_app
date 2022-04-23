import { JSEncrypt } from "jsencrypt";
import { useState } from "react";

const RSA = () => {
  function Encrypt(text) {
    const encrypt = new JSEncrypt();
    // Generate a RSA key pair using the `JSEncrypt` library.
    const crypt = new JSEncrypt({ default_key_size: 2048 });
    const PublicPrivateKey = {
      PublicKey: crypt.getPublicKey(),
      PrivateKey: crypt.getPrivateKey(),
    };
    const publicKey = PublicPrivateKey.PublicKey;
    setPubKey(publicKey);
    const privateKey = PublicPrivateKey.PrivateKey;
    setPriKey(privateKey)

    // Assign our encryptor to utilize the public key.
    encrypt.setPublicKey(publicKey);
    const cipherText = encrypt.encrypt(text);
    return cipherText;
  }
  //   Encrypt()

  function Decrypt(cipherText, privateKey) {
    // Decrypt with the private key...
    const decrypt = new JSEncrypt();
    decrypt.setPrivateKey(privateKey);
    const plainText = decrypt.decrypt(cipherText);
    return plainText;
  }

  const [plainText, setPlainText] = useState("");
  const [cipherText, setCipherText] = useState("");
  const [pubKey, setPubKey] = useState("");
  const [priKey, setPriKey] = useState("");
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
          <label htmlFor="publicKey">Public Key</label>
          <textarea className="text" id="publicKey" onChange={(e) => setPubKey(e.target.value)} value={pubKey}>{pubKey}</textarea>
         
        </div>
        <div className="col-3">
        <div className="btn-container">
            <button className="btn-encrypt"
              onClick={() => {
                setCipherText(Encrypt(plainText));
              }}
            >
              Encrypt
            </button>
            <button className="btn-decrypt"
              onClick={() => {
                setPlainText(Decrypt(cipherText, priKey));
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
          <label htmlFor="privateKey">Private Key</label>
          <textarea className="text" id="privateKey" onChange={(e) => setPriKey(e.target.value)} value={priKey}>{priKey}</textarea>
        </div>
      </div>
    </div>
  );
};

export default RSA;
