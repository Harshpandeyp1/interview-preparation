import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Tilt from "react-parallax-tilt";
import { useNavigate } from "react-router-dom";
import hero1 from "../assets/hero1.png";

export default function Hero() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const bgImage = useTransform(
    scrollYProgress,
    [0, 0.5, 0.51, 1],
    [
      "url('https://images.unsplash.com/photo-1565728744382-61accd4aa148?q=80&w=1173')", 
      "url('https://images.unsplash.com/photo-1565728744382-61accd4aa148?q=80&w=1173')",
      "url('https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1170')", 
      "url('https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1170')",
    ]
  );

  return (
    <div ref={containerRef} className="relative">
      {/* Dynamic Background */}
      <motion.div
        style={{ backgroundImage: bgImage }}
        className="fixed inset-0 -z-10 bg-cover bg-center transition-all duration-700 ease-in-out"
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      </motion.div>

      {/* Hero Content */}
      <section className="h-screen flex flex-col justify-center items-center text-white p-4">
        <motion.h1
          className="text-6xl md:text-8xl font-black text-center tracking-tighter"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Interview Prepration <br /> <span className="text-blue-500">Tracker</span>

          
        </motion.h1>

        <motion.p
          className="mt-6 text-xl text-gray-300 max-w-lg text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Master your technical rounds by tracking every problem, 
          mock interview, and progress milestone in one place.
        </motion.p>

        <motion.button
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="mt-10 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold shadow-lg shadow-blue-500/30"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore Features
        </motion.button>
        <motion.button
          onClick={() =>navigate("/Login")}
          className="mt-10 px-8 py-4 bg-black hover:bg-slate-950 text-white rounded-full font-bold shadow-lg shadow-blue-500/30"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Register
        </motion.button>
      </section>

      {/* Feature / Dashboard Preview Section */}
      <section className="h-screen flex flex-col justify-center items-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-5xl"
        >
          <Tilt
            glareEnable={true}
            glareMaxOpacity={0.2}
            scale={1.02}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            className="rounded-3xl overflow-hidden shadow-2xl"
          >
            <div 
              onClick={() => navigate("/login")}
              className="bg-white/10 backdrop-blur-2xl border border-white/20 p-2 md:p-4 cursor-pointer group"
            >
              {/* Image Space */}
              <div className="relative rounded-2xl overflow-hidden bg-gray-900 aspect-video flex items-center justify-center">
                {/* Replace the 'src' with your actual 'heroImg' variable. 
                  I've used a placeholder logic below.
                */}
                <img
                  src={hero1} 
                  alt="Dashboard Preview"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                {/* Floating Label Overlay */}
                <div className="absolute top-6 left-6 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest">
                  Live Dashboard
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white text-black px-6 py-3 rounded-xl font-bold shadow-xl">
                    Open Tracker →
                  </div>
                </div>
              </div>
            </div>
          </Tilt>

          <div className="mt-8 text-center">
            <h2 className="text-3xl font-bold text-white">Visualize Your Success</h2>
            <p className="text-gray-400 mt-2">TRACK YOU PATH..</p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}