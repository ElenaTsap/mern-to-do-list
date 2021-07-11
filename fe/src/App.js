import Tasks from './pages/Tasks'
import Register from './pages/Register'
import Login from './pages/Login'
import { Switch, Route } from 'react-router-dom';

function App() {

  return (
    <Switch>
      <Route 
        exact
        path='/register'
      >
        <Register/>
      </Route>

      <Route 
        exact
        path='/login'
      >
        <Login/>
      </Route>

      <Route path="/tasks">
        <Tasks/>
      </Route>

      <Route path="/">
        <Tasks/>
      </Route>
    </Switch>
  );
}

export default App;
