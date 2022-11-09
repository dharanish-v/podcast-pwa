import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddPodcastModel from "./AddPodcastModel";
import api from "../Api";
import { RootState } from "../store";
import { addManyPodcast } from "../store/slices/podcastSlice";
import { podcast } from "../types";
import ColorImage from "./ColorImage";
import varients from "./animations";

function Feed() {
  const podcastUrls = [
    "https://feeds.redcircle.com/9be4610a-3d0d-40cd-af4c-8f79c04ef869",
    "https://feeds.megaphone.fm/biohacked",
    "https://static.adorilabs.com/feed/the-habit-coach-with-ashdin-doctor.xml",
  ];
  const [podcastList, setPodcastList] = useState<Array<podcast>>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const podcastData = useSelector((state: RootState) => state.podcast);
  const [showModel, setShowModel] = useState<boolean>(false);

  useEffect(() => {
    console.log("fslkdf");
    if (!podcastData.length) {
      Promise.all<podcast | void>(
        podcastUrls.map((url: string, index: number) => {
          return api(url);
        })
      ).then((result: any) => {
        console.log("resul....", result);
        dispatch(addManyPodcast(result));
        setPodcastList(result);
      });
    } else {
      setPodcastList(podcastData);
    }
    return () => {};
  }, [dispatch, podcastData, podcastUrls]);

  return (
    <>
      <motion.button
        whileHover={"hover"}
        initial={"hide"}
        animate={"show"}
        exit={"hide"}
        variants={varients.button}
        className="bg-white text-black p-2 rounded-lg self-end mr-24 m-2"
        onClick={() => setShowModel(true)}
      >
        Add Podcast
      </motion.button>
      <AnimatePresence>
        {showModel && (
          <AddPodcastModel showModel={showModel} setShowModel={setShowModel} />
        )}
      </AnimatePresence>

      <div className="h-[90%] w-full flex flex-col gap-8 items-center overflow-y-auto p-4 pt-12 pb-12">
        {podcastList?.map((podcast: podcast, index: number) => {
          return (
            <ColorImage
              imgUrl={podcast.podcastImageUrl}
              render={(hover: boolean, setHover: Function, color: string) => {
                return (
                  <motion.div
                    initial={"hide"}
                    animate={"show"}
                    exit={"hide"}
                    variants={varients.podcast}
                    whileHover={{ scale: 1.05 }}
                    className={`flex gap-4   rounded-xl items-center
       hover:cursor-pointer ${
         index === podcastList?.length - 1 ? "mb-20" : ""
       }`}
                    style={
                      hover
                        ? {
                            boxShadow: `0px 0px 25px 5px  ${
                              !!color ? color : "#ffff"
                            }`,
                          }
                        : {}
                    }
                    onClick={() => {
                      navigate("/list", { state: { index } });
                    }}
                    onHoverStart={() => {
                      setHover(true);
                    }}
                    onHoverEnd={() => {
                      setHover(false);
                    }}
                  >
                    <img
                      src={podcast.podcastImageUrl}
                      alt={"Not Available"}
                      className={`h-32 w-32 rounded-l-xl`}
                    />
                    <h2 className="w-96 p-2">{podcast.podcastTitle}</h2>
                  </motion.div>
                );
              }}
            />
          );
        })}
      </div>
    </>
  );
}

export default Feed;
