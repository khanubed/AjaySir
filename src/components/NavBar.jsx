import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="text-white bg-darkbrown/70 w-full fixed z-20 top-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16  ">
          <a href="#home" className="text-2xl amaranth-regular font-bold">
            <motion.span
              animate={{
                rotate: [0, 5, -5, 3, -3, 0],
                y: [0, -2, 2, -1, 1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-block text-orange-200"
            >
              ॐ
            </motion.span>{" "}
            Pandit Ji
          </a>

          <div className="hidden md:flex space-x-6 ">
            <a href="#home" className="hover:text-yellow-400">
              Home
            </a>
            <a href="#videos" className="hover:text-yellow-400">
              Videos
            </a>
            <a href="#services" className="hover:text-yellow-400">
              Services
            </a>
            <a href="#gallery" className="hover:text-yellow-400">
              Gallery
            </a>
            <a href="#about" className="hover:text-yellow-400">
              About
            </a>
            <a href="#contact" className="hover:text-yellow-400">
              Contact
            </a>
            <a href="#reviews" className="hover:text-yellow-400">
              Reviews
            </a>
            <a href="#location" className="hover:text-yellow-400">
              Location
            </a>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button onClick={() => setOpen(!open)} className="text-3xl">
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-64 bg-[#240a00] shadow-lg z-50 p-6 md:hidden"
          >
            <div className="flex justify-end mb-8">
              <button onClick={() => setOpen(false)} className="text-3xl">
                ✕
              </button>
            </div>

            <div className="flex flex-col space-y-6 text-lg ">
              <a href="#home" className="hover:text-yellow-400">
                Home
              </a>
              <a href="#videos" className="hover:text-yellow-400">
                Videos
              </a>
              <a href="#services" className="hover:text-yellow-400">
                Services
              </a>
              <a href="#gallery" className="hover:text-yellow-400">
                Gallery
              </a>
              <a href="#about" className="hover:text-yellow-400">
                About
              </a>
              <a href="#contact" className="hover:text-yellow-400">
                Contact
              </a>
              <a href="#reviews" className="hover:text-yellow-400">
                Reviews
              </a>
              <a href="#location" className="hover:text-yellow-400">
                Location
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
