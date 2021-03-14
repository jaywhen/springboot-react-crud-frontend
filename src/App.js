import Main from "./pages/Main";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/profile/:id" component={Profile} />
      <Route path="/*" component={NotFound} />
    </Switch>
  );
}

export default App;
