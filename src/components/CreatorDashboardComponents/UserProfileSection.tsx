import { UserProfileSectionProps } from "../../types";
import { PROFILE_OPTIONS } from "../../utils/constants";
import { createSelectArray } from "../../utils";
import { SelectComponent } from "../common";

const UserProfileSection = ({
  profileImage,
  account,
  profileChoice,
  setProfileChoice,
}: UserProfileSectionProps) => {
  return (
    <div className="w-64 border border-cyan-300">
      <div className=" w-max">
        <img
          src={profileImage}
          alt="User profile img"
          className="w-20 h-20 mb-2 "
        />
        <SelectComponent
          options={createSelectArray(PROFILE_OPTIONS)}
          value={profileChoice}
          onChange={setProfileChoice}
        />
      </div>
    </div>
  );
};

export default UserProfileSection;
