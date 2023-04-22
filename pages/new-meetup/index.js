// our-domain.com/new-meetup
import { useRouter } from 'next/router';
import NewMeetUpForm from '../../components/meetups/NewMeetupForm';
import { Fragment } from 'react';
import Head from 'next/head';

function NewMeetUpPage () {
  /*
  useRouter is a React Hook, meaning it cannot be used with classes. You can either use withRouter or wrap your class in a function component.
  If you want to access the router object inside any function component in your app, you can use the useRouter hook
  The following is the definition of the router object returned by both useRouter and withRouter:
  1) pathname: String - The path for current route file that comes after /pages.
                        Therefore, basePath, locale and trailing slash (trailingSlash: true) are not included.
  2) query: Object - The query string parsed to an object, including dynamic route parameters.
                    It will be an empty object during prerendering if the page doesn't use Server-side Rendering.
                    Defaults to {}.
  3) asPath: String - The path as shown in the browser including the search params and respecting the trailingSlash configuration.
                      basePath and locale are not included.
  4) isFallback: boolean - Whether the current page is in fallback mode.
  5) basePath: String - The active basePath (if enabled).
  6) locale: String - The active locale (if enabled).
  7) locales: String[] - All supported locales (if enabled).
  8) defaultLocale: String - The current default locale (if enabled).
  9) domainLocales: Array<{domain, defaultLocale, locales}> - Any configured domain locales.
  10) isReady: boolean - Whether the router fields are updated client-side and ready for use.
                        Should only be used inside of useEffect methods and not for conditionally rendering on the server.
  11) isPreview: boolean - Whether the application is currently in preview mode.
  */
  const router = useRouter();

  async function addMeetUpHandler(enteredMeetUpData) {
		try {
			/*
      In this Next.js project, there is an internal API
      which will be hosted by the same server for serving this page.
      And therefore we can construct a absolute path to send the request
      to the same server but a different path on that server.
      
      And the path is as given below:
      because it's this special API folder and then the file name.
      */
			const response = await fetch("/api/new-meetup", {
				method: "POST",
				body: JSON.stringify(enteredMeetUpData),
				headers: { "Content-Type": "application/json" }
			});

			const data = await response.json();

      console.log(data);

      /*
      Similar to the replace prop in next/link, router.replace will prevent adding a new URL entry into the history stack.

router.replace(url, as, options)
The API for router.replace is exactly the same as the API for router.push.
      */
      router.replace('/');
		} catch (error) {
			console.log(error);
		}
  }

  return (
		<Fragment>
			{/*
      The <Head> component is a built-in component provided by NextJS.
      In Next.js, we can set the title, description, and other metadata for a page by using the <Head> component.
      In Next.js, we can fetch data from a backend by using getStaticProps, getStaticPaths, or getServerSideProps
      and use this data to set the page title and description

      When it comes to SEO, the <Head> component plays an important role.
      The <Head> component adds elements such as title, meta tags, charset, author, viewport settings, etc.
      All these tags help to provide information about the website to Google.
      Google ranks your website by using this information.
      That is why the <Head> component is considered SEO friendly.
      */}
			<Head>
				<title>Add a New Meetup</title>
				<meta
					name="description"
					content="Add your own meetups and create amazing networking opportunities."
				/>
			</Head>
			<NewMeetUpForm onAddMeetup={addMeetUpHandler} />
		</Fragment>
  );
}

export default NewMeetUpPage;
