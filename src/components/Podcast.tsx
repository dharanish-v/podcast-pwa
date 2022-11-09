import { motion } from "framer-motion";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import "react-h5-audio-player/lib/styles.css";

import { episode, podcast } from "../types";

const Podcast = () => {
  const location = useLocation();
  const [episode] = useState<episode>(location.state as any);

  return (
    <motion.div
      initial={{ scaleY: 0, scaleX: 0 }}
      animate={{ scaleY: 1, scaleX: 1 }}
      exit={{ scaleY: 0, scaleX: 0 }}
      transition={{ duration: 1 }}
      className="h-[85%]"
    >
      <div className="  h-full flex flex-col justify-center items-center gap-16">
        <img
          src={episode.imageUrl}
          className="h-80 w-80 rounded-xl"
          alt={"Not Found"}
        />
        <h1 className="text-3xl ">{episode.title}</h1>
      </div>
    </motion.div>
  );
};

export default Podcast;
