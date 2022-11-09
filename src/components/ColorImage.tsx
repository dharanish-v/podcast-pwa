import { useState } from "react";

interface colorimageprops {
  imgUrl: string;
  render: Function;
}

const ColorImage = ({ imgUrl, render }: colorimageprops) => {
  const [color, setColor] = useState("#ffff");
  const [hover, setHover] = useState(false);

  // const { data, loading, error } = useColor(imgUrl, "hex", {
  //   crossOrigin: "*",
  //   quality: 1000,
  // });

  // useEffect(() => {
  //   data && setColor(data);
  // }, [data]);

  return color ? render(hover, setHover, color) : null;
};

export default ColorImage;
