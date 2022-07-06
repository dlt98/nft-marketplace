export const createSelectArray = (
  options: string[],
  seperator: string = "-"
): any => {
  if (!options.length) return [];

  return options.map((option: string) => {
    return {
      label: upperCaseAndSpace(option.toString(), seperator),
      value: option,
    };
  });
};

export const upperCaseAndSpace = (
  text: string,
  seperator: string = "-"
): string => replaceWithCharacter(capitalizeFirstLetter(text), seperator);

const capitalizeFirstLetter = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1);

const replaceWithCharacter = (str: string, char: string): string => {
  const regex = new RegExp(char, "g");
  return str.replace(regex, " ");
};
