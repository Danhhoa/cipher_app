import './App.css';
import { NavLink, Outlet, Link } from "react-router-dom";


function App() {
const ciphers = ['Ceasar', 'Transposition', 'Affine', 'Vigenere', 'Hill', 'RSA']


  return (
    <div className="App">
      <h2>Thuật toán mã hóa cơ bản</h2>
      <div className='content-section'>
      <div className='lef-col'>
      {ciphers.map((cipher, index)=> (
        <NavLink key={index} to={`/ciphers/${cipher}`} style={{textDecoration:'none'}}>
        <h4>{cipher}</h4>
      </NavLink>
      )) 
      }
      </div>
      
 
      <Outlet />
      </div>
      
    </div>
  );
}

export default App;
