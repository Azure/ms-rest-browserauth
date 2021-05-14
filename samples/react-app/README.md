# react-app sample

This sample was created using [create-react-app](https://create-react-app.dev/).

## How to run

### Setup in Azure portal

- [Register a single page application](https://docs.microsoft.com/azure/active-directory/develop/scenario-spa-app-registration) in the Microsoft identity platform
- Configure the app registration with a redirect URI to specify where the Microsoft identity platform should redirect the client along with any security tokens.
  - Follow the instructions at [Redirect URI: MSAL.js 1.0 with implicit flow](https://docs.microsoft.com/azure/active-directory/develop/scenario-spa-app-registration#redirect-uri-msaljs-10-with-implicit-flow) to set the redirect URI to http://localhost:3000
  - Please note that `@azure/ms-rest-browserauth` does not support MSAL.js 2.0
- In this sample, we list the subscriptions available in your Azure account and the Storage accounts available in your Azure subscription. For this to work, you need to ensure that your application has the right permission for the `Azure Service Management` and `Azure Storage` APIs. To do so, follow the below instructions:
  - In your app registration in the Azure portal, go to `API Permissions`
  - Click on `Add a permission`, select `Azure Service Management` and check the box for `user_impersonation` permission
  - Click on `Add a permission`, select `Azure Storage` and check the box for `user_impersonation` permission
- Keep in mind that the account administrator may need to grant admin consent for the Default Directory.
  - For more information: [Grant admin consent in App registrations](https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/grant-admin-consent).

### Update and run the sample

- Copy "sample.env" as ".env" and add your own clientId, tenantId, and subscriptionId values
- Run `npm install` and `npm start`

Please see [src/App.tsx](src/App.tsx) for the most relevant example code.
