import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addPodcast } from "../store/slices/podcastSlice";
import api from "../Api";
import { podcast } from "../types";

type modelProps = {
  showModel: boolean;
  setShowModel: Function;
};

export default function AddPodcastModel({
  showModel,
  setShowModel,
}: modelProps) {
  const [rssLink, setRssLink] = useState("");
  const dispatch = useDispatch();
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState<boolean>(true);

  const modelVaraints = {
    hide: {
      y: "-100vh",
    },
    show: {
      y: "0vh",
      opacity: 1,
      transition: { type: "spring", duration: 1, stiffness: 100 },
    },
    exit: {
      y: "100vh",
      transition: { duration: 1 },
    },
  };

  function validURL(str: string) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="h-screen w-full absolute z-50 backdrop-blur-lg flex justify-center items-center overflow-hidden"
      onClick={() => setShowModel(false)}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={modelVaraints}
        initial={"hide"}
        animate={"show"}
        exit={"exit"}
        className=" h-max w-max bg-white text-black flex flex-col justify-center items-center rounded-3xl gap-4 p-8"
      >
        <h1 className="text-lg">Add Podcast RSS</h1>
        <input
          type="text"
          placeholder="RSS Link"
          className="shadow-black shadow-sm shadow-inner rounded-md p-4"
          value={rssLink}
          onChange={(e) => {
            setRssLink(e.target.value);
            setIsAddButtonDisabled(!validURL(e.target.value));
          }}
        />
        <motion.button
          disabled={isAddButtonDisabled}
          whileHover={{ scale: 1.1 }}
          className={
            "bg-black rounded-lg text-white p-3 mt-2 disabled:bg-slate-500"
          }
          onClick={async () => {
            let podcast = await api(rssLink);
            podcast && dispatch(addPodcast(podcast));
            setShowModel(false);
          }}
        >
          Add Podcast
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
