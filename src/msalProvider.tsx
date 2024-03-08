"use client";
import React from "react";
import {
  AuthenticatedTemplate,
  MsalProvider,
  UnauthenticatedTemplate,
  useAccount,
  useMsal,
  useMsalAuthentication,
} from "@azure/msal-react";
import { msalInstance } from "./utils/msalService";
import { InteractionType } from "@azure/msal-browser";

interface IRequest {
  scopes: [string];
}
const request: IRequest = {
  scopes: ["Sites.Read.All"],
};

const Auth = (props: any) => {
  const { login, result, error } = useMsalAuthentication(
    InteractionType.Redirect,
    request
  );
  const { accounts  } =useMsal()
  console.log("result", result);
  console.log("error", error);
  return (
    <>
      <UnauthenticatedTemplate>
        <h5 className="text-center">Please sign-In.</h5>
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>{props.children}</AuthenticatedTemplate>
    </>
  );
};
export default function MsalRootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MsalProvider instance={msalInstance}>
      <Auth> {children}</Auth>
    </MsalProvider>
  );
}