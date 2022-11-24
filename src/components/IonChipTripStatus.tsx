import { IonChip } from "@ionic/react";

import { tripStatus } from "../constants/tripStatus";
import EnumUtils from "../services/EnumUtils";

interface ComponentProps {
  status: string;
  slot?: "start" | "end";
}

export const IonChipTripStatus = (props: ComponentProps) => {
  const ionChipColor = EnumUtils.getTripStatusEnumColor(props.status);
  const ionChipLabel = EnumUtils.getTripStatusEnumFormatted(props.status);

  return (
    <>
      <IonChip slot={props.slot ? props.slot : "end"} color={ionChipColor} disabled={props.status === tripStatus.finished}>
        {ionChipLabel}
      </IonChip>
    </>
  );
};
