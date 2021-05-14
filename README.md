# ms-rest-browserauth [![Build Status](https://dev.azure.com/azure-public/adx/_apis/build/status/public.Azure.ms-rest-browserauth)](https://dev.azure.com/azure-public/adx/_build/latest?definitionId=8)

Provides browser-based authentication for Azure resources. Designed for use with libraries in [azure-sdk-for-js](https://github.com/Azure/azure-sdk-for-js).

## Requirements

- node.js version > 6.x

## Getting Started

Before using this library, you need to register your application in the Microsoft identity platform and set the right permissions.

- [Register a single page application](https://docs.microsoft.com/azure/active-directory/develop/scenario-spa-app-registration) in the Microsoft identity platform
- Configure the app registration with a redirect URI to specify where the Microsoft identity platform should redirect the client along with any security tokens.
  - Follow the instructions at [Redirect URI: MSAL.js 1.0 with implicit flow](https://docs.microsoft.com/azure/active-directory/develop/scenario-spa-app-registration#redirect-uri-msaljs-10-with-implicit-flow) to set the redirect URI.
  - Please note that `@azure/ms-rest-browserauth` does not support MSAL.js 2.0
- Ensure that your application has the right permission for the APIs it intends to use.
  - In your app registration in the Azure portal, go to `API Permissions`
  - Click on `Add a permission`
  - Select the API you want to use
  - Check the box for `user_impersonation` permission
- Keep in mind that the account administrator may need to grant admin consent for the Default Directory.
  - For more information: [Grant admin consent in App registrations](https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/grant-admin-consent).

Below is a basic sample that accesses the `Azure Service Management` APIs to list the available subscriptions. See the [samples](samples) for more detailed usage.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>ms-rest-browserauth sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/ms-rest-azure-js/dist/msRestAzure.js"></script>
    <script src="node_modules/@azure/ms-rest-browserauth/dist/msAuth.js"></script>
  </head>
  <body></body>
  <script>
    const authManager = new msAuth.AuthManager({
      clientId: "<client id for your Azure AD app>",
      tenant: "<optional tenant for your organization>",
    });
    authManager.finalizeLogin().then((res) => {
      if (!res.isLoggedIn) {
        // Usually, this will cause redirects to the Azure AD login page.
        // In practice, you may wish to call this method in the onClick for a login button on the page.
        authManager.login();
      }

      // These credentials can be passed to any of the Client classes provided in azure-sdk-for-js to authenticate
      const credentials = res.creds;
      console.log("Available subscriptions: ", res.availableSubscriptions);
    });
  </script>
</html>
```

# Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
