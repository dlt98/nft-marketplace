import { greenTick, redX } from "../../images/";
import { SingleAlertOption } from "../../types";

export const PROFILE_OPTIONS: string[] = [
  "adventurer",
  "adventurer-neutral",
  "avataaars",
  "big-ears",
  "big-ears-neutral",
  "big-smile",
  "bottts",
  "croodles",
  "croodles-neutral",
  "female",
  "gridy",
  "human",
  "identicon",
  "initials",
  "jdenticon",
  "male",
  "micah",
  "miniavs",
  "open-peeps",
  "personas",
  "pixel-art",
  "pixel-art-neutral",
];

export const ALERT_OPTIONS: SingleAlertOption[] = [
  {
    state: "positive",
    iconTitle: "Green check mark",
    icon: greenTick,
    className: "text-green-700 bg-green-100",
  },
  {
    state: "negative",
    iconTitle: "Red X",
    icon: redX,
    className: "text-red-700 bg-red-100",
  },
];
