import * as api from "./api.js";

const endpoints = {
  dropdown: "/jsonstore/advanced/table",
};

export async function getAllRows() {
  return api.get(endpoints.dropdown);
}
