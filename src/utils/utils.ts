export const getFirstLetter = (value: string) => {
  return value?.charAt(0) || "";
};

export const getIconByLabel = (
  label: string,
  options: any[],
): JSX.Element | null => {
  const match = options.find((item) => item.label === label);
  return match?.icon || null;
};
