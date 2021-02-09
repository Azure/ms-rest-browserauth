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
