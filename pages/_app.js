import Layout from '../components/layout/Layout';

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
		/*
    MyApp component is a regular react component and this special component acts as the root component that NextJS will render.
    It receives props and uses object de-structuring to pull component prop and a page prop.
    The props is passed into the MyApp component automatically by NextJS,
    since NextJS is the thing using that specific component and
    component is a prop that holds the actual page contents that should be rendered.
    So it will be different, whenever we switch a page and page props are specific props which our pages might be getting,
    _app.js file will be the actual page content of our different pages.
    And it will change whenever we navigate from page A to page B.
    */
		<Layout>
			<Component {...pageProps} />
		</Layout>
  );
}

export default MyApp
