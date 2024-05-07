import { Configuration, RedirectRequest } from "@azure/msal-browser";

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {

    auth: {
        clientId: "95c5b44c-3d89-451c-a071-fff7ab072bbf",
        authority: "https://login.microsoftonline.com/1a81d578-35ce-4c3d-9be1-338c0373e94a",
        // redirectUri: "https://inspection-dev.ktea.com"
         redirectUri: "http://localhost:3000",
        // postLogoutRedirectUri: "https://inspection.ktea.com"

    }
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: RedirectRequest = {
    scopes: ["User.Read"]
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft-ppe.com/v1.0/me"
};