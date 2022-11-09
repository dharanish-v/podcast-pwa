import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import H5AudioPlayer from "react-h5-audio-player";
import { RootState } from "./store";
import AppContainer from "./components/AppContainer";
import { play } from "./store/slices/playerSlice";

function App() {
  const player = useSelector((state: RootState) => state.player);
  const dispatch = useDispatch();

  const animationVarients = {
    hidden: {
      y: "100vh",
    },
    visible: {
      y: "0",
      transition: { ease: "easeInOut", duration: 1 },
    },
    exit: {
      y: "100vh",
    },
  };

  return (
    <div className="bg-[#181818] text-[#FFFFFF]">
      <Routes>
        <Route path="*" element={<AppContainer />} />
      </Routes>
      <AnimatePresence exitBeforeEnter>
        {player.currentPlay && (
          <div className="overflow-hidden absolute bottom-0 p-8 w-full">
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={animationVarients}
            >
              <H5AudioPlayer
                autoPlay
                src={player.currentPlay.mediaUrl}
                onEnded={(e) =>
                  dispatch(play({ index: player.currentIndex + 1 }))
                }
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
