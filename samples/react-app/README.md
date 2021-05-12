# react-app sample

This sample was created using [create-react-app](https://create-react-app.dev/).

## How to run

- Go to your Azure Active Directory application on the portal, then to the "Authentication" section, then ensure that http://localhost:3000 appears as a Single-page application redirect URI. If it doesn't exist, create it. Also, enable the options related to "Implicit grant and hybrid flows".
  - For more information: [Single-page application: App registration](https://docs.microsoft.com/en-us/azure/active-directory/develop/scenario-spa-app-registration).
- Go to your Azure Active Directory application's API Permissions on the portal. Ensure that your application has the "user_impersonation" permission for the Azure Service Management service.
- Keep in mind that the account administrator may need to grant admin consent for the Default Directory.
  - For more information: [Grant admin consent in App registrations](https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/grant-admin-consent).
- Copy "sample.env" as ".env" and add your own clientId, tenantId, and subscriptionId values
- Run `npm install` and `npm start`

Please see [src/App.tsx](src/App.tsx) for the most relevant example code.
