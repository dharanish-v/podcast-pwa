import axios from "axios";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { episode, podcast } from "../types";
import { useDispatch, useSelector } from "react-redux";

import { BsFilePlay } from "react-icons/bs";
import { addEpisodes, play } from "../store/slices/playerSlice";
import ColorImage from "./ColorImage";
import varients from "./animations";

const PodcastList = () => {
  const location: any = useLocation();

  const podcastContext: Array<podcast> = useSelector(
    (state: any) => state.podcast
  );

  const [podcast, setPodcast] = useState<podcast>(() => {
    console.log("conte....", podcastContext, location.state.index);
    let index: number = location.state.index;
    return podcastContext[index];
  });

  const [episodes, setEpisodes] = useState(podcast.episodes.slice(0, 50));

  const navigate = useNavigate();

  const toggleLoading = useOutletContext<Function>();

  useEffect(() => {
    console.log("rerender....list...comp...");

    return () => {};
  }, []);

  const dispatch = useDispatch();

  const imgRef = useRef(null);

  const observer = useRef<IntersectionObserver>();

  const lastItemRef = useCallback((node) => {
    if (observer.current) observer.current?.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      console.log("indside...", entries[0].isIntersecting);
      if (entries[0].isIntersecting) {
        setEpisodes((prev: any) => [
          ...prev,
          ...podcast.episodes.slice(prev.length, prev.length + 50),
        ]);
      }
    });

    if (node) observer.current.observe(node);
  }, []);

  const handleClick = (item: episode) => {
    let newItem = { ...item };
    newItem.imageUrl || (newItem.imageUrl = podcast.podcastImageUrl);
    console.log("item....", newItem);
    navigate("/podcast", { state: newItem });
  };

  return (
    <motion.div
      initial={"hide"}
      animate={"show"}
      exit={"hide"}
      variants={varients.podcast}
      className="h-[90%] w-full flex flex-col gap-6 items-center overflow-y-auto p-4"
    >
      {React.Children.toArray(
        episodes.map((item: episode, index: any) => {
          return (
            <ColorImage
              key={index}
              imgUrl={item.imageUrl || podcast.podcastImageUrl}
              render={(hover: boolean, setHover: Function, color: string) => {
                return (
                  <motion.div
                    ref={index === episodes.length - 1 ? lastItemRef : null}
                    initial={"hide"}
                    animate={"show"}
                    exit={"hide"}
                    whileHover={{ scale: 1.05 }}
                    variants={varients.podcast}
                    className={`flex gap-4
                 rounded-xl items-center
                 hover:cursor-pointer ${
                   index === podcast.episodes.length - 1 ? "mb-20" : ""
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
                    onHoverStart={() => {
                      setHover(true);
                    }}
                    onHoverEnd={() => {
                      setHover(false);
                    }}
                    onClick={() => handleClick(item)}
                    key={index}
                  >
                    <img
                      ref={imgRef}
                      src={item.imageUrl || podcast.podcastImageUrl}
                      alt={"Not Found"}
                      className="h-32 w-32 rounded-l-xl"
                    />
                    <h2 key={index} className="w-80 p-2">
                      {item.title}
                    </h2>
                    <BsFilePlay
                      className=" w-14 h-12 mr-4 hover:scale-125  hover:shadow-lg "
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(addEpisodes({ episodes: episodes }));
                        dispatch(play({ index }));
                      }}
                    />
                  </motion.div>
                );
              }}
            />
          );
        })
      )}
    </motion.div>
  );
};

export default PodcastList;
