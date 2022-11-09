import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import H5AudioPlayer from "react-h5-audio-player";
import { useSelector } from "react-redux";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { RootState } from "../store";
import ClipLoader from "react-spinners/ClipLoader";
import Feed from "./Feed";
import PodcastList from "./PodcastList";
import Podcast from "./Podcast";

const AppContainer = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center overflow-hidden">
      <ClipLoader loading={isLoading} color={"#FFFFFF"} />
      <AnimatePresence exitBeforeEnter>
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<Feed />} />
          <Route path="/list" element={<PodcastList />} />
          <Route path="/podcast" element={<Podcast />} />
        </Routes>
      </AnimatePresence>

      {/* <Outlet context={(state: boolean) => setIsLoading(state)} /> */}
    </div>
  );
};

export default AppContainer;
