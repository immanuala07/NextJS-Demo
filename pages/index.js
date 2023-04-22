// our-domain.com/

// import { useEffect, useState } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

const DUMMY_MEETUPS = [
	{
		id: "m1",
		title: "A FIrst Meetup",
		image: "https://memberpress.com/wp-content/uploads/2019/10/Member-Meetup@2x.png",
		address: "Address1, city1",
		description: "This is first meetup!"
	},
	{
		id: "m2",
		title: "A Second Meetup",
		image: "https://www.fluentin3months.com/wp-content/uploads/2021/09/language-meetup.jpg",
		address: "Address2, city2",
		description: "This is second meetup!"
	}
];

function HomePage(props) { 

  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(() => {
  //   // Send a http request and fetch data
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, [])

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
				<title>React Meetups</title>
				<meta
					name='description'
					content='Browse a huge list of highly active React meetups!'
				/>
			</Head>
			<MeetupList meetups={props.meetups} />
		</Fragment>
  );
}

/*
When exporting a function called getServerSideProps (Server-Side Rendering) from a page,
Next.js will pre-render this page on each request using the data returned by getServerSideProps.
This is useful if you want to fetch data that changes often,
and have the page update to show the most current data.

Imports used will not be bundled for the client-side.
This means you can write server-side code directly in getServerSideProps,
including fetching data from your database.

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}

The context parameter is an object containing the following keys:
  1) params: If this page uses a dynamic route, params contains the route parameters.
      If the page name is [id].js , then params will look like { id: ... }.
  2) req: The HTTP IncomingMessage object, with an additional cookies prop,
      which is an object with string keys mapping to string values of cookies.
  3) res: The HTTP response object.
  4) query: An object representing the query string, including dynamic route parameters.
  5) preview: preview is true if the page is in the Preview Mode and false otherwise.
  6) previewData: The preview data set by setPreviewData.
  7) resolvedUrl: A normalized version of the request URL that strips the _next/data prefix
      for client transitions and includes original query values.
  8) locale contains the active locale (if enabled).
  9) locales contains all supported locales (if enabled).
 10) defaultLocale contains the configured default locale (if enabled).

The getServerSideProps function should return an object with any one of the following properties:
 1) props: The props object is a key-value pair, where each value is received by the page component.
    It should be a serializable object so that any props passed, could be serialized with JSON.stringify().
 2) notFound: The notFound boolean allows the page to return a 404 status and 404 Page.
    With notFound: true, the page will return a 404 even if there was a successfully generated page before.
    This is meant to support use cases like user-generated content getting removed by its author.
 3) redirect: The redirect object allows redirecting to internal and external resources.
    It should match the shape of { destination: string, permanent: boolean }.
*/
// export async function getServerSideProps (context) {
//   const request = context.req;
//   const response = context.res;

//   // Check the below log on terminal
//   console.log(request);
//   console.log(response);

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

/*
In NextJS, exporting a function called getStaticProps() will pre-render a page
at build time using the props returned from the below function:

export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}

You can import modules in top-level scope for use in getStaticProps.
Imports used will not be bundled for the client-side.
This means you can write server-side code directly in getStaticProps, including fetching data from your database.

The getStaticProps function should return an object containing either props, redirect, or notFound
followed by an optional revalidate property.

  1) props: The props object is a key-value pair, where each value is received by the page component.
    It should be a serializable object so that any props passed, could be serialized with JSON.stringify.

  2) redirect: The redirect object allows redirecting to internal or external resources.
      It should match the shape of { destination: string, permanent: boolean }.

  3) notFound: The notFound boolean allows the page to return a 404 status and 404 Page.
      With notFound: true, the page will return a 404 even if there was a successfully generated page before.
      This is meant to support use cases like user-generated content getting removed by its author.

  4) revalidate: The revalidate property is the amount in seconds after which a page re-generation can occur
    (defaults to false or no revalidation).
*/
export async function getStaticProps () { 
  const client = await MongoClient.connect(
    "mongodb+srv://immanuala07:vamps123@mongodbcluster0.lxtb5el.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title:meetup.title,
        address:meetup.address,
        image:meetup.image,
        id:meetup._id.toString()
      }))
    },
    revalidate: 1
  }
}

export default HomePage;
