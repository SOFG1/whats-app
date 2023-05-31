import { escapeRegExp } from "./escapeRegExp";

export const phoneNumberRegex = /^\d+$/;

export const phoneNumberValidator = (phone: string) => {
  return phoneNumberRegex.test(escapeRegExp(phone)) && phone.length < 13
};
