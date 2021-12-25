import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Users from "./components/users/Users";
import SingInUp from "./components/singInUp/SingInUp";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Users />
                </Route>
                <Route path="/singInUp">
                    <SingInUp />
                </Route>
            </Switch>
        </BrowserRouter>

    );
}

export default App;
