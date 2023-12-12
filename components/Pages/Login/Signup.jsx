// import React, {useState} from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import {  createUserWithEmailAndPassword  } from 'firebase/auth';
// import { auth } from '../firebase';
 
// const Signup = () => {
//     const navigate = useNavigate();
 
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('');
 
//     const onSubmit = async (e) => {
//       e.preventDefault()
     
//       await createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             // Signed in
//             const user = userCredential.user;
//             console.log(user);
//             navigate("/login")
//             // ...
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             console.log(errorCode, errorMessage);
//             // ..
//         });
 
   
//     }
 
//   return (
//     <main >        
//         <section>
//             <div>
//                 <div>                  
//                     <h1> FocusApp </h1>                                                                            
//                     <form>                                                                                            
//                         <div>
//                             <label htmlFor="email-address">
//                                 Email address
//                             </label>
//                             <input
//                                 type="email"
//                                 label="Email address"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}  
//                                 required                                    
//                                 placeholder="Email address"                                
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor="password">
//                                 Password
//                             </label>
//                             <input
//                                 type="password"
//                                 label="Create password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)} 
//                                 required                                 
//                                 placeholder="Password"              
//                             />
//                         </div>                                             
                        
//                         <button
//                             type="submit" 
//                             onClick={onSubmit}                        
//                         >  
//                             Sign up                                
//                         </button>
                                                                     
//                     </form>
                   
//                     <p>
//                         Already have an account?{' '}
//                         <NavLink to="/login" >
//                             Sign in
//                         </NavLink>
//                     </p>                   
//                 </div>
//             </div>
//         </section>
//     </main>
//   )
// }
 
// export default Signup;

// // import React, {useState} from 'react';
// // import { NavLink, useNavigate } from 'react-router-dom';
// // import {  createUserWithEmailAndPassword  } from 'firebase/auth';
// // import { auth } from './firebase';
 
// // const Signup = () => {
// //     const navigate = useNavigate();
 
// //     const [email, setEmail] = useState('')
// //     const [password, setPassword] = useState('');
 
// //     const onSubmit = async (e) => {
// //       e.preventDefault()
     
// //       await createUserWithEmailAndPassword(auth, email, password)
// //         .then((userCredential) => {
// //             // Signed in
// //             const user = userCredential.user;
// //             console.log(user);
// //             navigate("/login")
// //             // ...
// //         })
// //         .catch((error) => {
// //             const errorCode = error.code;
// //             const errorMessage = error.message;
// //             console.log(errorCode, errorMessage);
// //             // ..
// //         });
 
   
// //     }
 
// //   return (
// //     <main >        
// //         <section>
// //             <div>
// //                 <div>                  
// //                     <h1> FocusApp </h1>                                                                            
// //                     <form>                                                                                            
// //                         <div>
// //                             <label htmlFor="email-address">
// //                                 Email address
// //                             </label>
// //                             <input
// //                                 type="email"
// //                                 label="Email address"
// //                                 value={email}
// //                                 onChange={(e) => setEmail(e.target.value)}  
// //                                 required                                    
// //                                 placeholder="Email address"                                
// //                             />
// //                         </div>

// //                         <div>
// //                             <label htmlFor="password">
// //                                 Password
// //                             </label>
// //                             <input
// //                                 type="password"
// //                                 label="Create password"
// //                                 value={password}
// //                                 onChange={(e) => setPassword(e.target.value)} 
// //                                 required                                 
// //                                 placeholder="Password"              
// //                             />
// //                         </div>                                             
                        
// //                         <button
// //                             type="submit" 
// //                             onClick={onSubmit}                        
// //                         >  
// //                             Sign up                                
// //                         </button>
                                                                     
// //                     </form>
                   
// //                     <p>
// //                         Already have an account?{' '}
// //                         <NavLink to="/login" >
// //                             Sign in
// //                         </NavLink>
// //                     </p>                   
// //                 </div>
// //             </div>
// //         </section>
// //     </main>
// //   )
// // }
 
// // export default Signup;

import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

function SignUp(props) {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    // Add any other fields for sign-up
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!newUser.email || !newUser.password) {
      alert("Please fill in all the required fields!");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8080/signup`, newUser);
      const { status, data } = response;
      if (status === 200 && data.status === "ok") {
        // Handle successful sign-up
        alert("Account created successfully!");
        // Redirect or perform actions after successful sign-up
      } else {
        alert("Failed to create an account. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error creating an account. Please try again later.");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5 shadow">
            <div className="card-body">
              <h5 className="card-title mb-4">Sign Up</h5>
              <form onSubmit={(e) => handleSignUp(e)}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={newUser.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleInputChange}
                  />
                </div>
                {/* Add more fields for sign-up */}
                <div className="d-grid">
                  <button className="btn btn-outline-dark" type="submit">
                    Sign Up
                  </button>
                </div>
              </form>
              <div className="text-center mt-4">
                <p>
                  Already have an account?{" "}
                  <Link to="/login" style={{ color: "black" }}>
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
