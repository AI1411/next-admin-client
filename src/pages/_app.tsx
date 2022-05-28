import type {AppProps} from 'next/app';
import "tailwindcss/tailwind.css";
import useSWR, {SWRConfig} from "swr";

function MyApp({Component, pageProps}: AppProps) {
  return (
    <SWRConfig value={{fetcher: (url) => fetch(url).then(res => res.json())}}>
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp
