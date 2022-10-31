import { IonToast } from "@ionic/react";
import { useEffect, useState } from "react";
import { closeToast } from "../services/utils";

import { Color } from "@ionic/core";

interface ComponentProps {
  message: string;
  color?: Color;
  position?: "top" | "bottom" | "middle" | undefined
}

export const CustomToast = (props: ComponentProps) => {
  const [toastShow, setToastShow] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState<Color>("");
  const [toastPosition, setToastPosition] = useState<"top" | "bottom" | "middle" | undefined>();

  useEffect(() => {
    setToastMessage(props.message)
    if (props.color) setToastColor(props.color)
    if (props.position) setToastPosition(props.position)
  }, [props])

  return (
    <IonToast
      position={toastPosition}
      color={toastColor}
      isOpen={toastShow}
      onDidDismiss={() => closeToast(setToastShow)}
      message={toastMessage}
      duration={2500}
    />
  )
}