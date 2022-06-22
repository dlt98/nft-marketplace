import { AVATAR_URL } from "../constants";

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
