export const fetcher = (...urls: string[]) => {
  const f = (url: string) => fetch(url).then(res => res.json());
  return Promise.all(urls.map(f));
};
