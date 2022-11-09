import axios from "axios";
import { podcast } from "./types";
export default async function api(url:string){
    return  axios
    .get(url)
    .then((res: any) => {
      return new window.DOMParser().parseFromString(res.data, "text/xml");
    })
    .then((xmlData: any) => {
      var podcast: podcast = {
        podcastTitle: "",
        podcastImageUrl: "",
        episodes: [],
      };

      podcast.podcastTitle = xmlData.querySelector("title").innerHTML;

      podcast.podcastImageUrl =
        xmlData.querySelector("image")?.querySelector("url")?.innerHTML ||
        xmlData.querySelector("image")?.getAttribute("href");

      xmlData
        .querySelectorAll("item")
        .forEach((item: any, index: any) => {
          podcast.episodes.push({
            title: item.querySelector("title").innerHTML,
            imageUrl: item
              .getElementsByTagName("itunes:image")[0]
              ?.getAttribute("href"),
            mediaUrl: item
              .getElementsByTagName("enclosure")[0]
              ?.getAttribute("url"),
          });
        });

      // toggleLoading(false);

      return podcast; })
      .catch((e) => console.log("ERRRR===> ", e));
}