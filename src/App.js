import Main from "./pages/Main";
import Profile from "./pages/Profile";
import { Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";
import './App.css';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/profile/:id" component={Profile} />
    </Switch>
  );
}

export default App;
