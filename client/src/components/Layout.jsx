import React, { useState } from 'react';
import Login from './Login'; // Import Login component
import Signup from './Signup'; // Import Signup component

function Layout() {
  const [isLogin, setIsLogin] = useState(true); // Default to login view

  const toggleView = () => setIsLogin(!isLogin);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left side: Image and Text */}
      <div className="hidden md:flex flex-col items-center justify-center w-1/2 bg-white p-10">
        <img
          src="https://images.search.yahoo.com/images/view;_ylt=AwrjZEx5c.xlPsMMly6JzbkF;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzg1Y2M1YWEyZWI5ODIzOWJhNGJhZWVhNWZmYTg5ODMzBGdwb3MDMTAwBGl0A2Jpbmc-?back=https%3A%2F%2Fimages.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dstudy%2Bimage%2Blanguage%26type%3DE210US826G0%26fr%3Dmcafee%26fr2%3Dpiv-web%26nost%3D1%26tab%3Dorganic%26ri%3D100&w=1008&h=492&imgurl=n-lightenment.com%2Fwp-content%2Fuploads%2F2017%2F07%2Flanguage.jpg&rurl=https%3A%2F%2Fn-lightenment.com%2Fhuman-language%2F&size=144.7KB&p=study+image+language&oid=85cc5aa2eb98239ba4baeea5ffa89833&fr2=piv-web&fr=mcafee&tt=Human+Language&b=61&ni=21&no=100&ts=&tab=organic&sigr=6BpLKwFIq3PH&sigb=M5pyE7FPp_EI&sigi=xRDaJiq0tgrs&sigt=kmJoRIPoY0iq&.crumb=Top6sXJoUby&fr=mcafee&fr2=piv-web&type=E210US826G0" // Replace with your logo path
          alt="Educatsy logo"
          className="w-48 h-48 mb-10"
        />
        <h1 className="text-4xl font-bold text-gray-800">Educatsy Online Learning Platform</h1>
      </div>

      {/* Right side: Login or Signup */}
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-10 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-5">Welcome to Educatsy</h2>
        {isLogin ? (
          <Login onToggle={toggleView} />
        ) : (
          <Signup onToggle={toggleView} />
        )}
        <p className="mt-5 text-center text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            className="text-blue-600 hover:underline ml-1 focus:outline-none"
            onClick={toggleView}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Layout;
