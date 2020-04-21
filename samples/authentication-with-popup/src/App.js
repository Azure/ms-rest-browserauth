import React from 'react';
import logo from './logo.svg';
import './App.css';
import { clientId } from "./constants";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/constants.js</code> & <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={printAvailableSubscriptions} >
          --- Console.log Available Subscriptions ---
        </button>
      </header>
    </div>
  );
}

const msRestBrowserAuth = require("@azure/ms-rest-browserauth");
let availableSubscriptions = undefined;
let authRes = undefined;

function loginWithPopup() {
  if (!authRes) {
    const authManager = new msRestBrowserAuth.AuthManager({
      clientId: clientId,
      popUp: true,
      callback: function callbackFunction(errorDesc, token, error) { }
    });
    authManager.finalizeLogin().then((authres) => {
      if (!authres.isLoggedIn) {
        authManager.login();
      } else {
        authRes = authres;
        availableSubscriptions = authres.availableSubscriptions;
      }
    })
  }
}

function printAvailableSubscriptions() {
  if (!authRes || !authRes.isLoggedIn) {
    console.log("Initiate Login Request...");
    loginWithPopup();
  } else {
    for (const sub of availableSubscriptions) {
      console.log("id = ", sub.id, "\nname = ", sub.name);
    }
  }
}

printAvailableSubscriptions();

export default App;
