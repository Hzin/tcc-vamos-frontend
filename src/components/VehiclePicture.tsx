import { useEffect, useState } from "react";

import { convertFilePathToStaticUrl } from "../services/utils";

interface ComponentProps {
  picture_path: string;
  center?: boolean
  content?: boolean
}

export const VehiclePicture = (props: ComponentProps) => {
  const [pictureUrl, setPictureUrl] = useState('')

  useEffect(() => {
    setPictureUrl(convertFilePathToStaticUrl(props.picture_path))
    // if (props.center) elm.className += 'block ml-auto mr-auto max-w-max max-h-72'
  }, [props])

  return (
    <img slot={props.content ? 'content' : undefined} id="vehicle_pic" alt="vehicle_pic" className="block ml-auto mr-auto h-auto max-w-[160px]" src={pictureUrl} />
  );
}