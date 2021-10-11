import React, { FunctionComponent } from "react";
import Delete from "@/assets/images/delete.svg";
import RedDelete from "@/assets/images/red-delete.svg";

const iconTypes = {
    Delete: Delete,
    RedDelete: RedDelete
};

interface IProps {
    name: keyof typeof iconTypes
}

const IconComponent: FunctionComponent<IProps> = (props) => {
const {name} = props
  const Icon = iconTypes[name];
  return <Icon/>;
};

export default IconComponent;