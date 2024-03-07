'use client'
import React from 'react';
import { AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate, useMsalAuthentication } from '@azure/msal-react';
import { msalInstance } from './utils/msalService';
import { InteractionType } from '@azure/msal-browser';

interface IRequest {
  scopes: [string];
}
const request: IRequest = {
  scopes: ['Sites.Read.All'],
};
export default function MsalRootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { login, result, error } = useMsalAuthentication(
    InteractionType.Redirect,
    request
  );
  return (
    <MsalProvider instance={msalInstance}>
      <UnauthenticatedTemplate>
        <h5 className="text-center">Please sign-In.</h5>
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        {children}
      </AuthenticatedTemplate>
    </MsalProvider>
  );
}
