export const parseCookies = (cookie: string | null) => {
  if (!cookie) return {};
  return Object.fromEntries(cookie.split('; ').map(v=>v.split(/=(.*)/s).map(decodeURIComponent)));
}

export const parseFormData = <T>(formData: FormData) => {
  const data: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value.toString();
  }
  return data as T;
}