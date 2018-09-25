import { AuthManager, Subscription } from "ms-rest-browserauth";
import { ServiceClientCredentials } from "ms-rest-js";

import {
  StorageManagementClientContext,
  StorageAccounts,
  StorageManagementModels
} from '@azure/arm-storage/2018-02-01';

import * as React from 'react';
import './App.css';
import logo from './logo.svg';


interface State {
  accounts: StorageManagementModels.StorageAccount[];
  isLoggedIn: boolean | "unknown";
  creds?: ServiceClientCredentials;
  subscriptions: Subscription[];
}

class App extends React.Component<{}, State> {
  readonly authManager: AuthManager;

  constructor(props: {}) {
    super(props);
    this.state = {
      accounts: [],
      subscriptions: [],
      isLoggedIn: "unknown"
    };

    this.authManager = new AuthManager({
      clientId: "696e3a0a-4148-440f-b5af-fbeadeabe3d1",
      tenant: "54826b22-38d6-4fb2-bad9-b7b93a3e9c5a"
    });

    this.authManager.finalizeLogin().then(result => {
      if (result.isLoggedIn) {
        this.setState({
          isLoggedIn: true,
          creds: result.creds,
          subscriptions: result.availableSubscriptions
        });
      } else {
        this.setState({
          isLoggedIn: false,
          creds: undefined
        });
      }
    });
  }

  onLoginButtonClick = () => {
    if (this.state.isLoggedIn) {
      this.authManager.logout();
    } else {
      this.authManager.login();
    }
  }

  onListStorageAccountsClick = async () => {
    const azStorageCtx = new StorageManagementClientContext(this.state.creds!, '0b1f6471-1bf0-4dda-aec3-cb9272f09590');
    const accountsClient = new StorageAccounts(azStorageCtx);
    const accounts = await accountsClient.list();
    this.setState({ accounts });
  }

  public render() {
    const isLoggedIn = this.state.isLoggedIn;

    const loginButton = typeof isLoggedIn === "boolean"
      ? <a href="#" onClick={this.onLoginButtonClick}>{isLoggedIn ? "Log out" : "Login"}</a>
      : undefined;

    const listButton = isLoggedIn === true
      ? <button onClick={this.onListStorageAccountsClick}>List Storage Accounts</button>
      : undefined;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <div>{loginButton}</div>
        <div>{listButton}</div>

        <h2>Subscriptions</h2>
        <ul>{this.state.subscriptions.map(s => <li key={s.id}>{s.name}</li>)}</ul>

        <h2>Storage Accounts</h2>
        <ul>
          {this.state.accounts.map(acc => <li key={acc.id}>{acc.name}</li>)}
        </ul>
      </div>
    );
  }
}

export default App;
