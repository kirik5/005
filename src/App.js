import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Users from './components/users/Users'
import SingInUp from './components/singInUp/SingInUp'
import { createContext, useState } from 'react'

export const Authentication = createContext(null)

const App = () => {
    const [firebaseUser, setFirebaseUser] = useState({
        email: null,
        id: null,
        token: null,
    })

    return (
        <BrowserRouter>
            <Authentication.Provider value={{ firebaseUser, setFirebaseUser }}>
                <Switch>
                    <Route exact path="/">
                        <Users />
                    </Route>
                    <Route path="/singInUp">
                        <SingInUp />
                    </Route>
                    <Route path="*">
                        <Users />
                    </Route>
                </Switch>
            </Authentication.Provider>
        </BrowserRouter>
    )
}

export default App
