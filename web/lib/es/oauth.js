import { r as o } from "./client.js";
async function n(a, e) {
  return o("/api/oauth/callback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: a,
    ...e || {}
  });
}
async function i(a, e) {
  const { provider: t, ...r } = a;
  return o(
    `/api/oauth/login/${t}`,
    {
      method: "GET",
      params: { ...r },
      ...e || {}
    }
  );
}
async function p(a) {
  return o(
    "/api/oauth/providers",
    {
      method: "GET",
      ...a || {}
    }
  );
}
const c = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getLoginUrl: i,
  getProviders: p,
  handleCallback: n
}, Symbol.toStringTag, { value: "Module" }));
export {
  c as o
};
