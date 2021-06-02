import Tasks from './pages/Tasks'
import Auth from './pages/Auth'
import { Switch, Route } from 'react-router-dom';

function App() {

  return (
    <Switch>
      <Route path="/auth">
        <Auth/>
      </Route>
      <Route path="/tasks">
        <Tasks/>
      </Route>
      <Route path="/">
        <Auth/>
      </Route>
    </Switch>
  );
}

export default App;
