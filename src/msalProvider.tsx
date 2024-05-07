"use client";
import React, { useEffect } from "react";
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
import { getUserInfo } from "./actions/api";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { setUserInfo } from "./redux/features/CommonSlice";
import { getInspections2 } from "./redux/features/InspectionsSlice";
import { format } from "date-fns";

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
  const dispatch = useAppDispatch()
  const { selectedDateRange, } = useAppSelector(state => state.Inspections?.inspectionFilterData)
  const { accounts } = useMsal();
  const userInfo = async () => {

    const payload = {
      userName: accounts[0]?.username
    }
    try {
      const userInfo: any = {
        userName: "siva",
        role: "Admin",
   
      }
      const initialPayload = {
        FromDate: selectedDateRange[0] ? format(selectedDateRange[0], 'yyyy/MM/dd') : null,
        ToDate: selectedDateRange[1] ? format(selectedDateRange[1], 'yyyy/MM/dd') : null,
        InspectorNumber: "All",
        ReportStatus: "to be inspected",
        VenueId: "All",
        Is_it: "1",
        EmployeeNumber: "0004236",
        AdminLevel: "1"
      }
      //  dispatch(getInspections2(initialPayload))
      dispatch(setUserInfo(userInfo))

    } catch (error: any) {
      console.log("error")
    }
  }
  useEffect(() => {
    if (accounts[0]?.username) {
      userInfo()
    }
  }, [accounts[0]?.username])
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
          </Box> :
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