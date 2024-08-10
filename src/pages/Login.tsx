import React, { useState } from 'react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in with email:', email, 'and code:', code);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F7F7F7]">
      <div className="bg-[#1E1E1E] p-6 rounded shadow-md max-w-sm w-full">
        <h1 className="text-3xl font-bold text-[#E0E0E0] mb-4">Sign In</h1>
        <p className="text-[#E0E0E0] mb-6">Enter your email and magic code.</p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 border border-[#333333] bg-[#2A2A2A] text-[#E0E0E0] rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#BB86FC]"
            required
          />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter your magic code"
            className="w-full p-3 border border-[#333333] bg-[#2A2A2A] text-[#E0E0E0] rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#BB86FC]"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#BB86FC] text-[#121212] py-3 rounded font-semibold hover:bg-[#3700B3] transition"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-[#E0E0E0]">
          Don't have an account?{' '}
          <a href="/signup" className="text-[#BB86FC] font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
