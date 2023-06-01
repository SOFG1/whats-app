const addZeroForward = (string: string, needLength: number = 2) => {
  return `${"0".repeat(needLength - string.length)}${string}`;
};

export const getFormatedDate = (date: Date) => {
  const days = date.getDate().toString();
  const month = (date.getMonth() + 1).toString();
  const years = date.getFullYear();
  const hours = date.getHours().toString();
  const minutes = date.getMinutes().toString();
  return `${addZeroForward(days)}.${addZeroForward(
    month
  )}.${years} ${addZeroForward(hours)}:${addZeroForward(minutes)}`;
};
