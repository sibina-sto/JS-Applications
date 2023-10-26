import * as api from "./api.js";

const endpoints = {
  dropdown: "/jsonstore/advanced/dropdown",
};

export async function getAllItems() {
  return api.get(endpoints.dropdown);
}
