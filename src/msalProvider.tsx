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
import Loading from "./app/loading";
import { Box, Typography } from "@mui/material";

interface IRequest {
  scopes: [string];
}
const request: IRequest = {
  scopes: ["Sites.Read.All"],
};

const Auth = (props: any) => {
  const { result } = useMsalAuthentication(
    InteractionType.Redirect,
    request
  );
  return (
    <>

      <UnauthenticatedTemplate>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Typography variant="h5">
            Please sign-In.
            <Loading />
          </Typography>
        </Box>
      </UnauthenticatedTemplate>

      {
        result === null ? 
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
        <Typography variant="h5">
          Loading...
          <Loading />
        </Typography> 
          </Box>:
          <AuthenticatedTemplate>
            {props.children}</AuthenticatedTemplate>
      }

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