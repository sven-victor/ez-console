import { r } from "./client.js";
async function s(e) {
  return r("/api/userTasks", {
    method: "GET",
    ...e || {}
  });
}
const o = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  listUserTasks: s
}, Symbol.toStringTag, { value: "Module" }));
export {
  o as u
};
