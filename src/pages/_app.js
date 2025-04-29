export default MyApp;}  );    </LyketProvider>      <Component {...pageProps} />    <LyketProvider>  return (function MyApp({ Component, pageProps }) {import { LyketProvider } from '../lib/lyket';import LyketWrapper from '../components/LyketProvider';

function MyApp({ Component, pageProps }) {
  return (
    <LyketWrapper>
      <Component {...pageProps} />
    </LyketWrapper>
  );
}
