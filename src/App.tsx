import Nav from "./components/nav/nav.comp";
import SideNav from "./components/nav/sidenav.comp";
import { Switch, Route } from "react-router-dom";
import ErrorBoundary from "./components/errorboundary/errorboundary.comp";
import { Suspense } from "react";
import HomePage from "./pages/homepage.comp";

function App() {
  return (
    <div>
      <Nav />
      <div>
        <SideNav />
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<div>loading..</div>}>
              <Route exact path="/" component={HomePage} />
            </Suspense>
          </ErrorBoundary>
        </Switch>
      </div>
    </div>
  );
}

export default App;
