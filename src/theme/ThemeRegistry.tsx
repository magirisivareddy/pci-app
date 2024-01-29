"use client";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { NextAppDirEmotionCacheProvider } from "./EmotionCache";
import { ColorModeContext, useMode } from "./theme";


export default function ThemeRegistry({
    children,
}: {
    children: React.ReactNode;
}) {
    const [theme, colorMode] = useMode();
    return (
        <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </ColorModeContext.Provider>
        </NextAppDirEmotionCacheProvider>
    );
}