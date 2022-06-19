import "tailwindcss/tailwind.css";
import 'react-toastify/dist/ReactToastify.css'

import {SWRConfig} from "swr";
import {RecoilRoot} from "recoil";
import '../components/layouts/parts/checkbox.styles.css'
import {ToastContainer} from "react-toastify";

function MyApp({Component, pageProps}: any) {
  return (
    <RecoilRoot>
      <ToastContainer />
      <SWRConfig value={{fetcher: (url) => fetch(url).then(res => res.json())}}>
        <Component {...pageProps} />
      </SWRConfig>
    </RecoilRoot>
  )
}

export default MyApp
