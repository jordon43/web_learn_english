import Router from "next/router";

export async function fetcher(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, {
    ...init,
    credentials: "include",
  });
  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      // токены протухли или нет доступа
      Router.replace("/login");
      throw new Error("redirecting to login");
    }
    throw new Error(await res.text());
  }
  return res.json();
}
