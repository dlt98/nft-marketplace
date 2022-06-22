import { useRef, useState } from "react";
import { UserProfileSectionProps } from "../../types";
import { PROFILE_OPTIONS } from "../../utils/constants";
import { createSelectArray, sliceAddress } from "../../utils";
import { SelectComponent, Spinner, Copy } from "../common";
import { ethereumIcon } from "../../images";

const UserProfileSection = ({
  profileImage,
  account,
  profileChoice,
  setProfileChoice,
}: UserProfileSectionProps) => {
  const [edditingProfile, setEdditingProfile] = useState(false);
  const addressRef = useRef(null);
  return (
    <div className="flex flex-col items-center p-3 border rounded-xl border-cyan-300">
      <div className="h-min w-max">
        {profileImage ? (
          <div className="relative mb-3 border-2 rounded-full shadow h-52 w-52 group">
            <img
              src={profileImage}
              alt="User profile img"
              className="w-full h-full mb-2 rounded-full "
            />
            <div
              className="absolute top-0 left-0 flex items-center justify-center w-full h-full transition-all scale-0 rounded-full cursor-pointer bg-pink-50/90 group-hover:scale-100"
              onClick={() => setEdditingProfile(!edditingProfile)}
              data-mdb-ripple="true"
              data-mdb-ripple-color="dark"
            >
              Edit
            </div>
          </div>
        ) : (
          <Spinner />
        )}
        {!!edditingProfile && (
          <SelectComponent
            options={createSelectArray(PROFILE_OPTIONS)}
            value={profileChoice}
            onChange={(value, action) => {
              setProfileChoice(value, action);
            }}
          />
        )}
      </div>
      <Copy
        text={account}
        className="flex items-center justify-center my-3 hover:scale-105  transition-all hover:text-slate-100 hover:bg-slate-500 cursor-pointer group font-robotoMono bg-slate-300 w-max rounded-2xl py-1 px-2 $"
        textRef={addressRef}
      >
        <img src={ethereumIcon} alt="ethereum icon" className="w-5 h-5 mr-1" />
        <h3 ref={addressRef}>{sliceAddress(account)}</h3>
      </Copy>
    </div>
  );
};

export default UserProfileSection;
