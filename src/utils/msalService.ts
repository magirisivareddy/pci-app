"use client";
import { PublicClientApplication, EventType, AccountInfo } from '@azure/msal-browser';
import { msalConfig } from "@/utils/authConfig";

export const msalInstance = new PublicClientApplication(msalConfig);
msalInstance.addEventCallback((event) => {
  try {
    if (
      event.eventType === EventType.LOGIN_SUCCESS &&
      event.payload &&
      isAccountInfo(event.payload) // Use the type guard here
    ) {
      msalInstance.setActiveAccount(event.payload.account);
    }
  } catch (error) {
    console.error("Something wrong in msalInstance.addEventCallback - ", error);
  }
});

// Type guard function to check if the object is an AccountInfo
function isAccountInfo(obj: any): obj is { account: AccountInfo } {
  return obj && typeof obj.account !== 'undefined';
}
