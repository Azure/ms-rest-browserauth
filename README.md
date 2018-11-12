# ms-rest-browserauth [![Build Status](https://dev.azure.com/azure-public/adx/_apis/build/status/public.Azure.ms-rest-browserauth)](https://dev.azure.com/azure-public/adx/_build/latest?definitionId=8)

Provides browser-based authentication for Azure resources. Designed for use with libraries in [azure-sdk-for-js](https://github.com/Azure/azure-sdk-for-js).

## Requirements

- node.js version > 6.x

## Getting Started
Before using this library, it's necessary to create an Azure AD app in the portal. See [doc/app-creation.md](doc/app-creation.md) for instructions.

Below is a basic sample with authenticates via Azure Active Directory. See the [samples](samples) for more detailed usage.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>ms-rest-browserauth sample</title>
    <script src="node_modules/ms-rest-browserauth/dist/msAuth.js"></script>
    <script>
      const authManager = new msAuth.AuthManager({
        clientId: "<client id for your Azure AD app>",
        tenant: "<optional tenant for your organization>"
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
  </head>
  <body>
  </body>
</html>
```

# Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
