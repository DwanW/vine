import Nav from "./components/nav/nav.comp";
import SideNav from "./components/nav/sidenav.comp";
import { Switch, Route } from "react-router-dom";
import ErrorBoundary from "./components/errorboundary/errorboundary.comp";
import { Suspense } from "react";
import HomePage from "./pages/homepage.comp";
import { GlobalStyle } from "./globalstyles";
import MainForm from "./components/form/mainform.comp";
import Snackbar from "@mui/material/Snackbar";
import { useAppDispatch, useAppSelector } from "./util/hooks";
import {
  closeSnackBar,
  closeConfirmDialog,
} from "./redux/feedback/feedback.slice";
import RoutinePage from "./pages/routinepage.comp";
import SettingPage from "./pages/settingpage.comp";
import StatsPage from "./pages/statpage.comp";
import LightPage from "./pages/lightpage.comp";
import UpdatePage from "./pages/updatepage.comp";
import Confirm from "./components/container/comfirm.comp";

function App() {
  const {
    snackbarOpen,
    snackbarMessage,
    confirmOpen,
    confirmActionMsg,
    confirmFunc,
  } = useAppSelector((state) => state.feedback);

  const dispatch = useAppDispatch();

  return (
    <div>
      <GlobalStyle />
      <Nav />
      <SideNav />
      <MainForm />
      <Confirm
        open={confirmOpen}
        message={confirmActionMsg}
        dispatch={confirmFunc}
        onClose={() => dispatch(closeConfirmDialog())}
      />
      <Snackbar
        open={snackbarOpen}
        onClose={() => dispatch(closeSnackBar())}
        message={snackbarMessage}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<div>loading..</div>}>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/routine" component={RoutinePage} />
            <Route exact path="/setting" component={SettingPage} />
            <Route path="/stats/:id" component={StatsPage} />
            <Route path="/light/:id" component={LightPage} />
            <Route path="/update/:id" component={UpdatePage} />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
}

export default App;
