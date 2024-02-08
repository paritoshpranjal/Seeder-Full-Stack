import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { theme } from '../src/theme/index';
import './index.css';
import { ThemeProvider } from '@emotion/react';
import { Auth0Provider } from '@auth0/auth0-react';
import { UserContext } from './context';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <ThemeProvider theme={theme}>
        <Auth0Provider
            domain={process.env.REACT_APP_AUTH0_DOMAIN!}
            clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!}
            authorizationParams={{
                redirect_uri: window.location.origin + '/home'
            }}
        >
            <UserContext>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </UserContext>
        </Auth0Provider>
    </ThemeProvider>
);
