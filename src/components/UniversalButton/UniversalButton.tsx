import React from "react";
import { Link as RouterLink } from "react-router-dom";
import classnames from "classnames";
import { IButtonProps } from "../../types";

const UniversalButton: React.FC<IButtonProps> = ({
  type,
  action,
  title,
  classes,
  isDisabled,
}) => {
  const commonProps = {
    className: classnames(classes),
  };

  if (type === "button") {
    return (
      <button {...commonProps} onClick={action as () => void}>
        {title}
      </button>
    );
  } else if (type === "submit") {
    return (
      <button {...commonProps} disabled={isDisabled} type="submit" onClick={action as () => void}>
        {title}
      </button>
    );
  } else if (type === "link") {
    return (
      <RouterLink {...commonProps} to={action as string}>
        {title}
      </RouterLink>
    );
  }

  return null;
};

export default UniversalButton;
