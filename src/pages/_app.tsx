import type {AppProps} from 'next/app';
import "tailwindcss/tailwind.css";
import useSWR, {SWRConfig} from "swr";
import {RecoilRoot} from "recoil";
import '../components/layouts/parts/checkbox.styles.css'

function MyApp({Component, pageProps}: any) {
  return (
    <RecoilRoot>
      <SWRConfig value={{fetcher: (url) => fetch(url).then(res => res.json())}}>
        <Component {...pageProps} />
      </SWRConfig>
    </RecoilRoot>
  )
}

export default MyApp
