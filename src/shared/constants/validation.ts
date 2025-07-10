export type TValidation =
  "REQUIRED"
  | "EMAIL"
  | "NOT_REPEAT_PASSWORD"
  | "NOT_VALID_PERIOD"
  | "NOT_VALID_BIN"
  | "MIN_LENGTH_1";

export const validation: Record<TValidation, any> = {
  REQUIRED: "Поле обязательно для заполнения",
  EMAIL: "Неверный формат почты",
  NOT_REPEAT_PASSWORD: "Пароли не совпадают",
  NOT_VALID_PERIOD: "Некорректный период",
  NOT_VALID_BIN: "Некорректный БИН",
  MIN_LENGTH_1: "Необходимо добавить хотя бы одно поле",
};