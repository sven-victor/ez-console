import { r as o } from "./client.js";
async function n(a, r) {
  return o("/api/oauth/callback", {
    method: "GET",
    params: {
      ...a
    },
    ...r || {}
  });
}
async function i(a, r) {
  const { provider: e, ...t } = a;
  return o(
    `/api/oauth/login/${e}`,
    {
      method: "GET",
      params: { ...t },
      ...r || {}
    }
  );
}
async function u(a) {
  return o(
    "/api/oauth/providers",
    {
      method: "GET",
      ...a || {}
    }
  );
}
const p = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getLoginUrl: i,
  getProviders: u,
  handleCallback: n
}, Symbol.toStringTag, { value: "Module" }));
export {
  p as o
};
