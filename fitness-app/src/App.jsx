import './App.css';
import Workout from './components/workout/Workout'
import NavBar from './components/Navbar';
import Goals from './components/goals/Goals';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/Workout">
            <Workout/>
          </Route>
          <Route path="/Home">
            <Goals/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
