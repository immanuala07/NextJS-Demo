import { useRouter } from 'next/router';
import Card from '../ui/Card';
import classes from './MeetupItem.module.css';

function MeetupItem(props) {
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

  function showDetailsHandler () {
    /*
    router.push - Handles client-side transitions, this method is useful for cases where next/link is not enough.
    1) url: UrlObject | String - The URL to navigate to.
    2) as: UrlObject | String - Optional decorator for the path that will be shown in the browser URL bar.
    3) options - Optional object with the following configuration options:
        a) scroll - Optional boolean, controls scrolling to the top of the page after navigation. Defaults to true
        b) shallow: Update the path of the current page without rerunning getStaticProps, getServerSideProps or getInitialProps.
            Defaults to false
        c) locale - Optional string, indicates locale of the new page
    
    You don't need to use router.push for external URLs. window.location is better suited for those cases.
    */
    router.push("/" + props.id);
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
