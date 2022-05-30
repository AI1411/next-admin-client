import type {AppProps} from 'next/app';
import "tailwindcss/tailwind.css";
import useSWR, {SWRConfig} from "swr";
import {RecoilRoot} from "recoil";

function MyApp({Component, pageProps}: AppProps) {
  return (
    <RecoilRoot>
      <SWRConfig value={{fetcher: (url) => fetch(url).then(res => res.json())}}>
        <Component {...pageProps} />
      </SWRConfig>
    </RecoilRoot>
  )
}

export default MyApp
