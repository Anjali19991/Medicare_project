// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../AuthContext';

// const Register = () => {
//   const [email, setEmail] = useState('');
//   // const [otp, setOtp] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   // const [isOtpSent, setIsOtpSent] = useState(false);
//   // const [isOtpVerified, setIsOtpVerified] = useState(false);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();
//   const { user, setUser } = useAuth();
//   useEffect(() => {
//     if (user) {
//       navigate('/')
//     }
//   })

//   // const sendOtp = async () => {
//   //   try {
//   //     const response = await fetch('http://localhost:3000/otp/sendotp', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Accept': 'application/json',
//   //         'Content-Type': 'application/json',
//   //       },
//   //       body: JSON.stringify({ email }),
//   //     });
//   //     const data = await response.json();
//   //     if (data.success) {
//   //       setIsOtpSent(true);
//   //     } else {
//   //       console.log('Error:', data.message);
//   //     }
//   //   } catch (error) {
//   //     console.log('Error:', error);
//   //   }
//   // };

//   // const verifyOtp = async () => {
//   //   try {
//   //     const response = await fetch('http://localhost:3000/otp/verifyotp', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Accept': 'application/json',
//   //         'Content-Type': 'application/json',
//   //       },
//   //       body: JSON.stringify({ email, otp }),
//   //     });

//   //     const data = await response.json();
//   //     if (data.success) {
//   //       setIsOtpVerified(true);
//   //     } else {
//   //       console.log('Error:', data.message);
//   //     }
//   //   } catch (error) {
//   //     console.log('Error:', error);
//   //   }
//   // };

//   const registerUser = async () => {
//     try {
//       if (password !== confirmPassword) {
//         setError("Passwords do not match");
//         return;
//       }

//       const response = await fetch('http://localhost:3000/auth/signup', {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password, role: 'patient' }),
//       });

//       const data = await response.json();
//       console.log(data);
//       navigate('/login');
//     } catch (error) {
//       console.log('Error:', error);
//     }
//   };

//   return (
//     <div className="flex items-center min-h-[82vh] bg-gray-50">
//       <div className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
//         <div className="flex flex-col md:flex-row">
//           <div className="h-32 md:h-auto md:w-1/2">
//             <img
//               className="object-cover w-full h-full"
//               src="https://cdn.pixabay.com/photo/2021/01/15/17/01/green-5919790__340.jpg"
//               alt="img"
//             />
//           </div>
//           <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
//             <div className="w-full">
//               <h3 className="mb-4 text-2xl font-bold text-blue-600">Sign up</h3>
//               {isOtpSent && !isOtpVerified ? (
//                 <>
//                   <div className="mt-4 mb-4">
//                     <label className="block text-sm my-2"> OTP</label>
//                     <input
//                       type="text"
//                       name="otp"
//                       value={otp}
//                       onChange={(e) => setOtp(e.target.value)}
//                       className="w-full px-4 py-2 text-sm border rounded-md focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-600"
//                       placeholder="Enter OTP"
//                     />
//                   </div>
//                   <div className="flex justify-center">
//                     <button
//                       className="px-6 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none"
//                       onClick={verifyOtp}
//                     >
//                       Verify OTP
//                     </button>
//                   </div>
//                 </>
//               ) : isOtpVerified ? (
//                 <>
//                   <div className="mt-4 mb-4">
//                     <label className="block text-sm my-2"> Username</label>
//                     <input
//                       type="text"
//                       name="username"
//                       value={username}
//                       onChange={(e) => setUsername(e.target.value)}
//                       className="w-full px-4 py-2 text-sm border rounded-md focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-600"
//                       placeholder="Enter Username"
//                     />
//                   </div>
//                   <div className="mt-4 mb-4">
//                     <label className="block text-sm my-2"> Password</label>
//                     <input
//                       type="password"
//                       name="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       className="w-full px-4 py-2 text-sm border rounded-md focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-600"
//                       placeholder="Enter Password"
//                     />
//                   </div>
//                   <div className="flex justify-center">
//                     <button
//                       className="px-6 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none"
//                       onClick={registerUser}
//                     >
//                       Register
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <div className="mt-4 mb-4">
//                     <label className="block text-sm my-2"> Email</label>
//                     <input
//                       type="text"
//                       name="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       className="w-full px-4 py-2 text-sm border rounded-md focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-600"
//                       placeholder="Enter Email"
//                     />
//                   </div>
//                   <div className="flex justify-center">
//                     <button
//                       className="px-6 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none"
//                       onClick={sendOtp}
//                     >
//                       Send Otp
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const registerUser = async () => {
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, role: 'patient' }),
      });

      const data = await response.json();
      console.log(data);
      navigate('/login');
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="flex items-center min-h-[82vh] ">
      <div className="flex-1 h-full max-w-2xl mx-auto bg-zinc-100 rounded-lg shadow-xl">
        <div className="flex items-center justify-center p-6 sm:p-12">
          <div className="w-full">
            <h3 className="mb-4 text-2xl font-bold text-teal-600">Sign up</h3>
            <div className="mt-4 mb-4">
              <label className="block text-sm my-2">Username</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 text-sm border rounded-md focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-600"
                placeholder="Enter Username"
              />
            </div>
            <div className="mt-4 mb-4">
              <label className="block text-sm my-2">Email</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 text-sm border rounded-md focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-600"
                placeholder="Enter Email"
              />
            </div>
            <div className="mt-4 mb-4">
              <label className="block text-sm my-2"> Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 text-sm border rounded-md focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-600"
                placeholder="Enter Password"
              />
            </div>
            <div className="mt-4 mb-4">
              <label className="block text-sm my-2"> Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 text-sm border rounded-md focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-600"
                placeholder="Confirm Password"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex justify-center">
              <button
                className="px-6 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-teal-600 border border-transparent rounded-md hover:bg-teal-700 focus:outline-none"
                onClick={registerUser}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
