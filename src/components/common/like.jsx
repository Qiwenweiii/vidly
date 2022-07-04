import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const Like = ({ liked, onLike }) => {
  let icon = faHeart,
    style = { cursor: "pointer" };

  if (liked) {
    icon = faHeartSolid;
    style = {
      cursor: "pointer",
      color: "#d63031",
    };
  }

  return <FontAwesomeIcon onClick={onLike} icon={icon} style={style} />;
};

export default Like;
