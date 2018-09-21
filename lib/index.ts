// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See LICENSE in the project root for license information.

import AuthenticationContext from "adal-angular";
import { RestError, ServiceClientCredentials, HttpHeaders, ServiceClient } from "ms-rest-js";

const DEFAULT_RESOURCE = "https://management.azure.com";

export interface AuthOptions {
  /**
   * The ID of the ADAL app registration to authenticate with.
   */
  clientId: string;

  /**
   * The tenant to authenticate to. Defaults to "common".
   */
  tenant?: string;

  /**
   * The location to return to after acquiring a token via redirect. Defaults to window.location.href.
   */
  redirectUri?: string;

  /**
   * The resource to authenticate to. Defaults to https://management.azure.com.
   */
  resource?: string;
}

export interface Subscription {
  /**
   * The subscription id, usually a GUID.
   */
  readonly id: string;

  /**
   * The display name of the subscription.
   */
  readonly name: string;

  /**
   * The tenant that the subscription belongs to.
   */
  readonly tenantId: string;

  /**
   * The state of the subscription. Example values: "Enabled", "Disabled",
   * "Warned", "PastDue", "Deleted".
   */
  readonly state: string;

  /**
   * The authorization source of the subscription:
   * "RoleBased", "Legacy", "Bypassed"," Direct", "Management".
   * It could also be a comma separated string containing
   * more values "Bypassed, Direct, Management".
   */
  readonly authorizationSource: string;
}

/**
 * Returned in the case the user login completed successfully.
 */
export interface LoggedIn {
  isLoggedIn: true;

  /**
   * Used to authenticate further requests to Azure.
   */
  creds: ServiceClientCredentials;

  availableSubscriptions: Subscription[];
}

/**
 * Returned in the case the user was not logged in by first calling {@link AuthManager#login}.
 * Does not indicate an error.
 */
export interface NotLoggedIn {
  isLoggedIn: false;
}

export type LoginResult = LoggedIn | NotLoggedIn;

/**
 * Authenticates users to Azure AD and obtains tokens for API requests.
 */
export class AuthManager {
  private readonly _ctx: AuthenticationContext;
  private readonly resource: string;

  constructor(opts: AuthOptions) {
    this._ctx = new AuthenticationContext({
      clientId: opts.clientId,
      tenant: opts.tenant,
      redirectUri: opts.redirectUri,
      cacheLocation: "localStorage"
    });
    this.resource = opts.resource || DEFAULT_RESOURCE;

    // These calls put the AuthenticationContext in a proper state to complete the login.
    this._ctx.getCachedUser();
    this._ctx.handleWindowCallback();
  }

  /**
   * Logs the user into Azure AD via redirect.
   * Should be called in response to a click on a login button or equivalent action in the web app.
   */
  login(): void {
    this._ctx.login();
  }

  /**
   * Should be called each time the page requiring auth loads.
   * May result in additional redirects. After any such redirects, this method should be called again.
   *
   * @returns a Promise resolving with the login result or rejecting with an error if one occurred.
   */
  finalizeLogin(): Promise<LoginResult> {
    return new Promise((resolve, reject) => {
      this._ctx.acquireToken(this.resource, (errMessage, token, errCode) => {
        if (errCode === "login required") {
          resolve({ isLoggedIn: false });
        } else if (errCode === "interaction_required") {
          this._ctx.acquireTokenRedirect(this.resource);
        } else if (errCode || !token) {
          reject(new RestError(errMessage || "Unknown error", errCode));
        } else {
          const creds: ServiceClientCredentials = {
            signRequest: req => {
              return new Promise((resolve, reject) => {
                this._ctx.acquireToken(this.resource, (err, token) => {
                  if (err || !token) {
                    reject(err);
                  } else {
                    if (!req.headers) req.headers = new HttpHeaders();
                    req.headers.set("Authorization", `Bearer ${token}`);
                    resolve(req);
                  }
                });
              });
            }
          };

          this._listSubscriptions(creds).then(availableSubscriptions => {
            resolve({
              isLoggedIn: true,
              creds,
              availableSubscriptions
            });
          });
        }
      });
    });
  }

  /**
   * Logs the user out of Azure AD via redirect.
   */
  logout(): void {
    this._ctx.logOut();
  }

  private _listSubscriptions(credentials: ServiceClientCredentials): Promise<any[]> {
    const client = new ServiceClient(credentials);
    const baseUrl = this.resource;
    const reqUrl = `${baseUrl}${baseUrl.endsWith("/") ? "" : "/"}subscriptions?api-version=2016-06-01`;

    return client.sendRequest({
      method: "GET",
      url: reqUrl
    }).then(res => {
      const rawSubscriptions: any[] = res.parsedBody!.value;
      const tenant = this._ctx.config.tenant!;
      const subscriptions: Subscription[] = rawSubscriptions.map(s => ({
        id: s.subscriptionId,
        name: s.displayName,
        tenantId: tenant,
        state: s.state,
        authorizationSource: s.authorizationSource
      }));

      return subscriptions;
    });
  }
}
