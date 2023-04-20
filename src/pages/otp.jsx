import React, { useEffect, useState, useContext } from 'react'
import './otp.css'
import network from '../images/network.jpg'
import blob from '../images/blob.svg'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../src/context/authContext";
import $, { event } from 'jquery';
import { ClassNames } from '@emotion/react';

const Otp = () => {

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
      })
    
      const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
      }
    //   $('.digit-group').find('input').each(function() {
    //     $(this).attr('maxlength', 1);
    //     $(this).on('keyup', function(e) {
    //         var parent = $($(this).parent());
            
    //         if(e.keyCode === 8 || e.keyCode === 37) {
    //             var prev = parent.find('input#' + $(this).data('previous'));
                
    //             if(prev.length) {
    //                 $(prev).select();
    //             }
            // } else if((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
    //             var next = parent.find('input#' + $(this).data('next'));
                
    //             if(next.length) {
    //                 $(next).select();
    //             } else {
    //                 if(parent.data('autosubmit')) {
    //                     parent.submit();
    //                 }
    //             }
    //         }
    //     });
    // });
    const handleonChange= (event)=>{
      //  console.log();
        var elmnt = event.target;
        var next = elmnt.getAttribute("data-next");
        var prev = elmnt.getAttribute("data-previous");
        if((event.keyCode === 8 || event.keyCode === 37) & prev != null) {
            document.getElementById(event.target.name).value = '';
            elmnt.form.elements[prev].focus();
            console.log( event.target.form.elements[prev]);
            console.log("fdel");
        } else if(((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode === 39)&& next != null) {
            document.getElementById(event.target.name).value = elmnt.value;
            // elmnt.value ='';
            elmnt.form.elements[next].focus();
            console.log( event.target.form.elements[next]);
        }
       
                    
      
        // console.log(next);
        // console.log(prev);
       // event.target.form.elements['digit-2'].focus();
    }
    // const onKeyDown=(event)=>{
    //     if(event.keyCode === 8){
    //         console.log("fdel");
    //     }
    // }
    
      const [err, setErr] = useState(null);
    
      const navigate = useNavigate()
    
      const { login } = useContext(AuthContext);
    
      const handleLogin = async (e) => {
        e.preventDefault()
        try {
          await login(inputs);
          navigate("/")
        } catch (err) {
          setErr(err.response.data)
        }
      };

  

    console.log(inputs)

    return (
        <div>
            <section>
                {/* s<img src={blob} alt="header" /> */}
                {/* <div className='logincontent'>
                    <h1 class="heading">CONNECT JAMIA</h1>
                    <h2 class="tagline">Bridging alumni with students</h2>
                    <p className='loginp'>
                        Ever wondered where the graduates of our university end up? Wanted to ask
                        them for advice? Well, sign in and let us begin.
                    </p>
                </div> */}
                <div class="container">
                    <div class="user otpBx">
                        <div class="formBx">
                            
                            <form method="get" class="digit-group"  maxLength="1" data-group-name="digits" data-autosubmit="true" autocomplete="off">
                            <h2>Enter Otp</h2>
                                <input type="text" id="digit-1" maxLength="1" name="digit-1" onChange={handleonChange}  onKeyUp={handleonChange} data-next="digit-2" />
                                <input type="text" id="digit-2"  maxLength="1" name="digit-2" onChange={handleonChange}  onKeyUp={handleonChange} data-next="digit-3" data-previous="digit-1" />
                                <input type="text" id="digit-3"  maxLength="1" name="digit-3" onChaange={handleonChange} onKeyUp={handleonChange} data-next="digit-4" data-previous="digit-2" />
                                <span class="splitter">&ndash;</span>
                                <input type="text" id="digit-4"  maxLength="1" name="digit-4" onChange={handleonChange} onKeyUp={handleonChange} data-next="digit-5" data-previous="digit-3" />
                                <input type="text" id="digit-5"  maxLength="1" name="digit-5" onChange={handleonChange} onKeyUp={handleonChange} data-next="digit-6" data-previous="digit-4" />
                                <input type="text" id="digit-6"  maxLength="1" name="digit-6" onChange={handleonChange} onKeyUp={handleonChange} data-previous="digit-5" />
                                <input type="submit" className = "submitbtn" name="" value="Submit" />
                                <br/>
                                <input type="submit" name="" value="Re-Send OTP" />
                            </form>
                                                    </div>
                        <div class="imgBx"><img src="https://img.freepik.com/free-vector/new-message-concept-illustration_114360-666.jpg?w=1000&t=st=1682011633~exp=1682012233~hmac=334f29c7f7a0a926d9604196f2d41b68dfb01b59cc43bd47718e33313adaae6d" alt="" /></div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Otp