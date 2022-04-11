import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/scrollToTop";
import { Home } from "./views/Home.jsx";
import Layout from "./Layout";
import injectContext from "./context/appContext";
import Details from "./views/Details.jsx";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../styles/index.css";
import { Container } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#48BB78",
    },
  },
});

const App = () => {
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter basename={basename}>
          <ScrollToTop>
            <Layout>
              <Container maxWidth="lg">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/:type/:id" element={<Details />} />
                  <Route path="*" element={<h1>Not found!</h1>} />
                </Routes>
              </Container>
            </Layout>
          </ScrollToTop>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default injectContext(App);
