import './App.css';
import { NavLink, Outlet, Link } from "react-router-dom";


function App() {
const ciphers = ['Ceasar', 'Transposition', 'Affine', 'Vigenere', 'Hill']


  return (
    <div className="App">
      <h1>Đây là trang chủ có 4 nút</h1>
      <div className='content-section'>
      <div className='lef-col'>
      {ciphers.map((cipher, index)=> (
        <NavLink key={index} to={`/ciphers/${cipher}`}>
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
