import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import {useSelector} from "react-redux"

function App() {
  const isAuth=useSelector((state)=>state.token)
  console.log(isAuth)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact  path='/register' element={<Register/>}/>
          <Route exact  path='/login' element={<Login/>}/>
          <Route exact path='/' element={isAuth?<Home/>:<Login/>}/>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
