import { useRouteError } from "react-router-dom";
import "../assests/ErrorPage.css";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="container flex flex--col error-page">
      <h1 className="error-page__title">Oops!</h1>
      <p>Sorry, an unexpected error has occured.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
