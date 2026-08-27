import { motion } from "framer-motion";
import { Github } from "lucide-react";

export default function OrbitalBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* rotating orbit ring */}
      <motion.div
        className="absolute left-1/2 top-1/3 w-[500px] h-[500px] border border-white/5 rounded-full"
        style={{ translateX: "-50%", translateY: "-50%" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />

      {/* inner orbit */}
      <motion.div
        className="absolute left-1/2 top-1/3 w-[320px] h-[320px] border border-white/5 rounded-full"
        style={{ translateX: "-50%", translateY: "-50%" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* floating github icons */}

      <motion.div
        className="absolute left-[30%] top-[20%] text-white/10"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <Github size={40} />
      </motion.div>

      <motion.div
        className="absolute right-[25%] top-[30%] text-white/10"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <Github size={36} />
      </motion.div>

      <motion.div
        className="absolute left-[20%] bottom-[20%] text-white/10"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      >
        <Github size={34} />
      </motion.div>

      <motion.div
        className="absolute right-[20%] bottom-[15%] text-white/10"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 9, repeat: Infinity }}
      >
        <Github size={38} />
      </motion.div>
    </div>
  );
}