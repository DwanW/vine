import Nav from "./components/nav/nav.comp";
import SideNav from "./components/nav/sidenav.comp";
import { Switch, Route } from "react-router-dom";
import ErrorBoundary from "./components/errorboundary/errorboundary.comp";
import { Suspense } from "react";
import HomePage from "./pages/homepage.comp";
import { GlobalStyle } from "./globalstyles";
import MainForm from "./components/form/mainform.comp";

function App() {
  return (
    <div>
      <GlobalStyle />
      <Nav />
      <SideNav />
      <MainForm />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<div>loading..</div>}>
            <Route exact path="/" component={HomePage} />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
}

export default App;
