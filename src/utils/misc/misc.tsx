import { AVATAR_URL, ALERT_OPTIONS } from "../constants";
import { SingleAlertOption } from "../../types";

export const getProfileImage = async (
  profileChoice: string,
  walletAddress: string,
  setProfileImage: any
) => {
  if (!profileChoice || !walletAddress) return;

  try {
    const res = await fetch(
      `${AVATAR_URL}${profileChoice}/${walletAddress}.svg`
    );
    setProfileImage(res.url);
  } catch (error) {}
};

export const smoothScroll = (
  ref: React.MutableRefObject<HTMLDivElement | null>
) => {
  if (ref?.current)
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
};

export const getAlertOption = (choice: string): SingleAlertOption | undefined =>
  ALERT_OPTIONS.find((el) => el.state === choice.toLocaleLowerCase());
