// react-scripts supports reading custom environment variables from an .env file
// and will automatically import any environment variable defined there if it
// starts with the pattern `REACT_APP_`
// Please refer to this document for more information:
// https://create-react-app.dev/docs/adding-custom-environment-variables
function getEnvironmentVariable(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing environment variable ${name}. Please make sure that you copy sample.env as just ".env" and populate the necessary values.`
    );
  }
  return value;
}

export const clientId = getEnvironmentVariable("REACT_APP_CLIENT_ID");
export const tenant = getEnvironmentVariable("REACT_APP_TENANT_ID");
export const subscriptionId = getEnvironmentVariable(
  "REACT_APP_SUBSCRIPTION_ID"
);
