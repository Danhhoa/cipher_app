import { useState } from 'react'


const Affine = () => {
    
    const numbers = "1234567890"
    const letters = "abcdefghijklmnopqrstuvwxyz"
    const isNumber = x => numbers.indexOf(x) > -1
    const isLetter = x => letters.indexOf(x) > -1
    const mod = (a, n) => ((a % n) + n) % n

    const gcd = (a, b) => {
        for (let x = 1; x < b; x++) {
            if ((a % b * x) % b === 1) {
            return x
            }
        }
        return undefined
    }

    const encode = (phrase, key) => {
        const {a, b} = key

        if (isNaN(gcd(a, letters.length))) {
            throw new Error("a and m must be coprime.")
        }
        return phrase
            .toLowerCase()
            .split("")
            .filter(x => isLetter(x) || isNumber(x))
            .map(x => {
                if (isNumber(x)) {
                    return x
                }
                return letters[(a * letters.indexOf(x) + b) % letters.length]
                })
            .flatMap((x, i, xs) => (i + 1 < xs.length) && (i + 1) % 1 === 0 ? [x, ""] : [x])
            .join(" ")
        };
        
    const decode = (phrase, key) => {
        const {a, b} = key
        if (isNaN(gcd(a, letters.length))) {
            throw new Error("a and m must be coprime.")
        }
        return phrase
            .split("")
            .filter(x => isLetter(x) || numbers.indexOf(x) > -1)
            .map(x => {
                if (isNumber(x)) {
                    return x
                }

                const z = gcd(a, letters.length) * (letters.indexOf(x) - b)
                return letters[mod(z, letters.length)]
            })
            .flatMap((x, i, xs) => (i + 1 < xs.length) && (i + 1) % 1 === 0 ? [x, ""] : [x])
            .join(" ")
    };

    const [plainText, setPlainText] = useState('')
    const [cipherText, setCipherText] = useState('')
    const [keyA, setKeyA] = useState(1)
    const [keyB, setKeyB] = useState(1)

    console.log(plainText) 
    console.log(cipherText)


    return (
        <div className="right-col">
            <h1> thuật toán Affine</h1>
            <div className="container">
                <div className="plain__content">
                <label className='label-title'>Encrypt</label>
                    <textarea className='text' type="text" onChange={e => setPlainText(e.target.value)} value={plainText}>
                        {plainText}
                    </textarea>
                </div>
                <div className="convert__content">
                    <div className="field field-number field--first">
                        <label className='label'>slope / a</label>
                        <div className="field-number__field">
                            <button className='field-number__down' onClick={() => setKeyA(keyA => keyA - 2 === 13 ? keyA - 4 : keyA - 2)}>-</button>
                            <div className="field-number__value">{keyA}</div>
                            <button className='field-number__up' onClick={() => setKeyA(keyA => keyA + 2 === 13 ? keyA + 4 : keyA + 2)}>+</button>
                        </div>
                    </div>
                    
                    <div className="field field-number field--second">
                        <label className='label'>intercept / b</label>
                        <div className="field-number__field">
                            <button className='field-number__down' onClick={() => setKeyB(keyB => keyB - 1)}>-</button>
                            <div className="field-number__value">{keyB}</div>
                            <button className='field-number__up' onClick={() => setKeyB(keyB => keyB + 1)}>+</button>
                        </div>
                    </div>
                    
                    <div className="btn-container">
                            <button onClick={() => setCipherText(encode(plainText, {a:keyA, b:keyB}))}>Encrypt</button>
                            <button onClick={() => setPlainText(decode(cipherText, {a:keyA, b:keyB}))}>Decrypt</button>
                    </div>
                </div>
                <div className="cipher__content">
                    <label className='label-title'>Decrypt</label>
                    <textarea className='text' type="text" onChange={e => setCipherText(e.target.value)} value={cipherText}>
                        {cipherText}
                    </textarea>
                </div>
            </div>
        </div>
    )
}

export default Affine;