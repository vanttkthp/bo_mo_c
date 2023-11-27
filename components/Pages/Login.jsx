// import { Link } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// function Login (props) {
//   localStorage.removeItem("isAdmin");
//   localStorage.removeItem("isUser");

//   const [user, setUser] = useState({
//     email: "",
//     password: "",
//   });

//   function handleInputChange(e) {
//     const { name, value } = e.target;
//     setUser((prevState) => ({ ...prevState, [name]: value }));
//   }

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!user.email || !user.password) {
//       alert("Vui lòng điền đầy đủ thông tin!");
//       return;
//     }

//     try {
//       const response = await axios.post(`http://localhost:8080/login`, user);
//       const { status, data } = response;
//       if (status === 200 && data.status === "ok") {
//         const username = data.name;
//         const userRole = data.role; // Lấy giá trị role từ phản hồi
//         localStorage.setItem("userEmail", user.email);
//         localStorage.setItem("userName", username);
//         alert("Successful login!");

//         if (userRole === "Admin") { // Sử dụng giá trị userRole thay vì user.role
//           localStorage.setItem("isAdmin", "true");
//           localStorage.setItem("adminRole", userRole);
//           window.location.href = "/bookscontroller";
//         } else {
//           localStorage.setItem("isUser", "true");
//           window.location.href = "/";
//         }
//       } else {
//         alert("Wrong account or password!");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Please double check your account, password, or role");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card mt-5 shadow">
//             <div className="card-body">
//               <h5 className="card-title mb-4">Login</h5>
//               <form onSubmit={(e) => handleLogin(e)}>
//                 <div className="mb-3">
//                   <label htmlFor="email" className="form-label">
//                     Username
//                   </label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="email"
//                     name="email"
//                     value={user.email}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="password" className="form-label">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     id="password"
//                     name="password"
//                     value={user.password}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 {/* <div className="form-group">
//                   <label htmlFor="role">Role</label>
//                   <select
//                     className="form-control"
//                     name="role"
//                     value={user.role}
//                     onChange={handleInputChange}
//                   >
//                     <option value="" disabled></option>
//                     <option value="Admin">Admin</option>
//                     <option value="User">User</option>
//                   </select>
//                 </div> */}

//                 <div className="d-grid">
//                   <button className="btn btn-outline-dark" type="submit">
//                     Login
//                   </button>
//                 </div>
//               </form>
//               <div className="text-center mt-4">
//                 <p>
//                   Don't have an account?{" "}
//                   <Link to="/signup" style={{ color: "black" }}>
//                     Create an account
//                   </Link>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// export default Login;
import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from './firebase';
import { NavLink, useNavigate } from 'react-router-dom'
 
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/home")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
       
    }
 
    return(
        <>
            <main >        
                <section>
                    <div>                                            
                        <p> FocusApp </p>                       
                                                       
                        <form>                                              
                            <div>
                                <label htmlFor="email-address">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"                                    
                                    required                                                                                
                                    placeholder="Email address"
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="password">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"                                    
                                    required                                                                                
                                    placeholder="Password"
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                                                
                            <div>
                                <button                                    
                                    onClick={onLogin}                                        
                                >      
                                    Login                                                                  
                                </button>
                            </div>                               
                        </form>
                       
                        <p className="text-sm text-white text-center">
                            No account yet? {' '}
                            <NavLink to="/signup">
                                Sign up
                            </NavLink>
                        </p>
                                                   
                    </div>
                </section>
            </main>
        </>
    )
}
 
export default Login