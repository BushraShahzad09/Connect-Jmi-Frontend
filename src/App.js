import './App.css';
import{BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import {QueryClient, QueryClientProvider} from 'react-query'
import Register from './pages/Register';
import Login2 from './pages/Login2';
import Otp from './pages/OTP';

function App() {
  const queryClient=new QueryClient()
  
  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
    <BrowserRouter>
        <Routes>
        <Route index element={<Navigate to="/login2" replace />} /> 
          <Route path="/login2" element={<Login2 />}></Route>
          <Route path='/otp' element={<Otp />}></Route>
          <Route path="/home" element={<Home />}></Route>
          {/* <Route path="/register" element={<Register/>}></Route> */}
          {/* <Route path="/login" element={<Login />}></Route> */}
          {/* <Route path="/add" element={<Share />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
    </QueryClientProvider>
  );
}

export default App;