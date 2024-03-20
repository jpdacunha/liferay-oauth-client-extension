import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App2 from './App2.js';
import reportWebVitals from './reportWebVitals';

const ELEMENT_ID = 'app2-docker-example';

class WebComponent extends HTMLElement {

  connectedCallback() {
		this.root = createRoot(this);

		this.root.render(<App2 />);
  }

  disconnectedCallback() {

		//
		// Unmount React tree to prevent memory leaks.
		//
		// See React documentation at
		//
		//     https://react.dev/reference/react-dom/client/createRoot#root-unmount
		//
		// for more information.
		//

		this.root.unmount();
		delete this.root;
	}
}

if (!customElements.get(ELEMENT_ID)) {
  console.log('Registering ' + ELEMENT_ID + ' as custom element');
  customElements.define(ELEMENT_ID, WebComponent);
} else {
  console.log('Skipping registration for ' + ELEMENT_ID + ' (already registered)');
}

/*const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
