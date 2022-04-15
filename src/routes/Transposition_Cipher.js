import { useState, useEffect } from 'react'

const Transposition = () => {

    // This is only a SKELETON file for the 'Rail Fence Cipher' exercise. It's been provided as a
    // convenience to get you started writing code faster.
    //
    const encode = (input, rails) => {
        if (!input) return input
        const arr = input.split('')
        let res = [...Array(rails)].map(i => [])
        let i = 0
        let direction = 'down'
        while (arr.length) {
            res[i].push(arr[0])
            arr.shift()
            if (i >= rails - 1) direction = 'up'
            else if (i === 0) direction = 'down'
            i = direction === 'down' ? i + 1 : i - 1
        }

        res = res.reduce((prev, curr) => prev.concat(curr)).join('')
            return res
    }
    
    const decode = (input, rails) => {
        if (!input) return input
        const arr = input.split('')
        let res = [...Array(rails)].map(i => [])
        let row = 0
        let col = 0
        // create the matrix
        while (row < rails) {
            res[row].push('-')
            col++
            if (col === arr.length) {
            row++
            col = 0
            }
        }
        // insert placeholders
        let direction = 'down'
        row = 0
        col = 0
        while (col < arr.length) {
            res[row][col] = '*'
            col++
            if (row >= rails - 1) direction = 'up'
            else if (row === 0) direction = 'down'
            row = direction === 'down' ? row + 1 : row - 1
        }
        // replace placeholders for letters
        row = 0
        col = 0
        while (arr.length) {
            if (res[row][col] === '*') {
            res[row][col] = arr[0]
            arr.shift()
            }
            col++
            if (col === res[row].length) {
            col = 0
            row++
            }
        }
        // read the message
        const realRes = []
        row = 0
        col = 0
        direction = 'down'
        while (col < res[0].length) {
            realRes.push(res[row][col])
            col++
            if (row >= rails - 1) direction = 'up'
            else if (row === 0) direction = 'down'
            row = direction === 'down' ? row + 1 : row - 1
        }
        return realRes.join('')
    }

    const [plainText, setPlainText] = useState('')
    const [cipherText, setCipherText] = useState('')

    const [key, setKey] = useState(1)

    console.log(decode('GeeksforGeeks', 4))
    
    console.log(key)



    return (
        <div className="right-col">
            <h1> thuật toán Rail Fence - Transposition</h1>
            <div className="container">
                <div className="plain__content">
                    <textarea className='text' type="text" onChange={e => setPlainText(e.target.value)} value={plainText}>
                        {plainText}
                    </textarea>
                </div>
                <div className="convert__content transposition">
                    <div className="field field-number field--first field-transposition">
                        <label className='label'>KEY</label>
                        <div className="field-number__field">
                            <button className='field-number__down' onClick={() => setKey(key => key - 1)}>-</button>
                            <div className="field-number__value">{key}</div>
                            <button className='field-number__up' onClick={() => setKey(key => key + 1)}>+</button>
                        </div>
                    </div>   
                    <div className="btn-container btn-transposition">
                            <button onClick={() => setCipherText(encode(plainText, key))}>Encrypt</button>
                            <button onClick={() => setPlainText(decode(cipherText, key))}>Decrypt</button>
                    </div>
                </div>
                <div className="cipher__content">
                    <textarea className='text' type="text" onChange={e => setCipherText(e.target.value)} value={cipherText}>
                        {cipherText}
                    </textarea>
                </div>
            </div>
        </div>
    )
}

export default Transposition;