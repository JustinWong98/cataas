import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";

import Navbar from "./components/navbar/Navbar";
import Homepage from "./components/Homepage/Homepage";
import InputForm from "./components/input/Input";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6fbf73",
    },
  },
  typography: {
    allVariants: {
      color: "#6fbf73",
      paddingBottom: "2%",
      paddingTop: "2%",
    },
  },
  stepper: {
    "& .Mui-completed": { color: "#6fbf7b" },
    "& .MuiSvgIcon-root": { color: "#4caf50" },
    "& .Mui-active": { color: "#4caf50" },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <InputForm />
      </div>
    </ThemeProvider>
  );
}

export default App;
