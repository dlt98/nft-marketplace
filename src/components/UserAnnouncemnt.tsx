import React from "react";

import { UserAnnouncementProps } from "../utils/types";

const UserAnnouncement = ({ content }: UserAnnouncementProps) => {
  return <h1 className="px-20 py-10 text-3xl">{content}</h1>;
};

export default UserAnnouncement;
