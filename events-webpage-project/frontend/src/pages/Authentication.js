import { json, redirect } from "react-router-dom";

import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

// WHAT GETS EXECUTED WHENEVER AUTH FORM IS SUBMITTED //
export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  // new URL() => built-in constructor provided by browser
  // pass request.url to access searchParams object on the URL instantiated
  // gets searchParams on backend

  const mode = searchParams.get("mode") || "login";
  // call get to extract mode => if it's undefined, use login as default

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode." }, { status: 422 });
  }
  // handles error

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:8080/" + mode, {
    // send request to url + mode => gives us a response we await
    // configure request
    method: "POST", // backend expects a post request
    headers: {
      // set headers so that backend extracts data correctly
      "Content-Type": "application/json", // add content-type header which sets application/json
    },
    body: JSON.stringify(authData), // convert authData to json format
  }); // all this gets stored as 'response' constant

  // handles 'response'
  // checks for invalid credentials
  if (response.status === 422 || response.status === 401) {
    // 422 = validation errors, 401 = send back from backend
    return response;
  }

  // if response is not okay => contains errors => throw error message
  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  // if it makes it pass all these checks => user creation/signup succeeds //

  // manage the token //
  const resData = await response.json();
  const token = resData.token; // extract token

  localStorage.setItem("token", token);
  // store extracted token
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());

  // after user is logged in => redirects back to starting page
  return redirect("/");
}
