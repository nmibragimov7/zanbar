export const cleanNumber = (value: string | undefined) => {
  return value ? value.replace(/\D/g, "") : "";
};

export const modifyToMask = (value: string | undefined) => {
  return value ? value.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "+$1($2)-$3-$4-$5") : "";
};
