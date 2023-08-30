export const parseCookies = (cookie: string | null) => {
  if (!cookie) return {};
  return Object.fromEntries(cookie.split('; ').map(v=>v.split(/=(.*)/s).map(decodeURIComponent)));
}