import React, { FunctionComponent } from "react";
import Delete from "@/assets/images/delete.svg";
import RedDelete from "@/assets/images/red-delete.svg";
import ClockFace from "@/assets/images/clock-face.svg";

const iconTypes = {
    Delete: Delete,
    RedDelete: RedDelete,
    ClockFace: ClockFace
};

interface IProps {
    name: keyof typeof iconTypes,
    size?: number
}

const IconComponent: FunctionComponent<IProps> = (props) => {
const {name, size} = props
  const Icon = iconTypes[name];
  if(size) 
  return <Icon width={size} height={size}/>;
  else 
  return <Icon />
};

IconComponent.defaultProps = {
  size: 100
}
export default IconComponent;