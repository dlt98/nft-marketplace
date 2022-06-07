import { UserAnnouncementProps } from "../../utils";

const UserAnnouncement = ({ text }: UserAnnouncementProps) => {
  return (
    <div className="flex items-center justify-center w-full h-full text-lg ">
      {text}
    </div>
  );
};

export default UserAnnouncement;
