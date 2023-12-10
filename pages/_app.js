import '@/styles/globals.css'
import PageProvider from './PageProvider';
function App({ Component, pageProps, emotionCache }) {
  return (
    <PageProvider emotionCache={emotionCache}>
    
        <Component {...pageProps} />
      
    </PageProvider>
  );
}
export default App;