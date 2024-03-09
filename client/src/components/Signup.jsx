import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons from Font Awesome

function Signup({ onToggle }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility
  const [role, setRole] = useState('student'); // State for selected role (default: student)

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement your signup logic here (e.g., sending data to a server)
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    console.log('Role:', role);
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="mb-5">
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">Role</label>
<div className="flex space-x-4">
          <button
            type="button"
            className={`px-4 py-2 border rounded-md focus:outline-none ${role === 'tutor' ? 'bg-blue-600 text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setRole('tutor')}
          >
            Tutor
          </button>
          <button
            type="button"
            className={`px-4 py-2 border rounded-md focus:outline-none ${role === 'student' ? 'bg-blue-600 text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setRole('student')}
          >
            Student
          </button>
        </div>
      </div>
      <div className="mb-5">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
      </div>
      <div className="mb-5 relative">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
          {/* Toggle password visibility */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
          >
            {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
          </button>
        </div>
      </div>
      <div className="mb-5 relative">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
          {/* Toggle confirm password visibility */}
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
          >
            {showConfirmPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Sign Up
      </button>
    </form>
  );
}

export default Signup;
