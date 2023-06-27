import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from "react-router-dom";
// search parameters = query parameters

import classes from "./AuthForm.module.css";

function AuthForm() {
  const data = useActionData();
  const navigation = useNavigation();

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  // check if 'mode' query param is = to login => if it is, it's in login mode
  // if it's set to any other value => then it's in signup mode

  const isSubmitting = navigation.state === "submitting";
  // helper constant => lets us know whether we're currently submitting

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        {data &&
          data.errors && ( // check if data exists and if theres errors
            <ul>
              {Object.values(data.errors).map(
                (
                  err // map all error messages to list items
                ) => (
                  <li key={err}>{err}</li> // list items where key is set = to error message
                )
              )}
            </ul>
          )}
        {data && data.message && <p>{data.message}</p>}
        {/* output error data messages  */}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Create new user" : "Login"}
          </Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
