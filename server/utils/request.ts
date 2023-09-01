import i18next from '~/i18n.server';

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

export const getLoaderLangs = async (request: Request, langKeys: string[]) => {
  const cookie = parseCookies(request.headers.get('cookie'));
  const t = await i18next.getFixedT(cookie.lang || request);

  return langKeys.reduce((acc, curr) => {
    acc[curr] = t(curr);
    return acc;
  }, {} as Record<string, string>);
}