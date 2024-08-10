import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F7F7]">
      <header className="relative bg-[#121212] text-white h-[80vh] flex items-center justify-center">
        <img
          src="/hero-image.jpg"
          alt="Football Stadium"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative container mx-auto px-4 text-center">
          <motion.h1
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Welcome to Premier League Predictor
          </motion.h1>
          <motion.p
            className="text-lg mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Predict Premier League matches, create mini leagues, and compete with your friends!
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Link to="/signup" className="bg-[#BB86FC] text-[#121212] px-8 py-4 rounded font-semibold hover:bg-[#3700B3] transition mr-4">
              Get Started
            </Link>
            <Link to="/login" className="bg-[#03DAC6] text-[#121212] px-8 py-4 rounded font-semibold hover:bg-[#00BFA5] transition">
              Login
            </Link>
          </motion.div>
        </div>
      </header>

      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl font-bold text-[#121212] mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Why Premier League Predictor?
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="relative">
              <img
                src="/predict-game.jpg"
                alt="Predict Game"
                className="w-full h-82 object-cover rounded shadow-lg"
              />
              <h3 className="text-2xl font-bold text-[#121212] mt-4">Predict Games</h3>
              <p className="text-lg text-[#121212]">
                Use your football knowledge to predict outcomes and earn bragging rights.
              </p>
            </div>
            <div className="relative">
              <img
                src="/manage-league.jpg"
                alt="Manage League"
                className="w-full h-82 object-cover rounded shadow-lg"
              />
              <h3 className="text-2xl font-bold text-[#121212] mt-4">Manage Leagues</h3>
              <p className="text-lg text-[#121212]">
                Create and manage your own mini leagues. Compete against your friends!
              </p>
            </div>
          </motion.div>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <Link to="/signup" className="bg-[#BB86FC] text-[#121212] px-6 py-3 rounded font-semibold hover:bg-[#3700B3] transition mr-4">
              Sign Up Now
            </Link>
            <Link to="/login" className="bg-[#03DAC6] text-[#121212] px-6 py-3 rounded font-semibold hover:bg-[#00BFA5] transition">
              Learn More
            </Link>
          </motion.div>
        </div>
      </main>

      <footer className="bg-[#121212] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">&copy; 2024 Premier League Predictor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
