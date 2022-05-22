import './App.css';
import Workout from './components/workout/Workout'
import NavBar from './components/Navbar';
import Goals from './components/goals/Goals';
import GoalForm from './components/goals/GoalsForm';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/workout">
            <Workout/>
          </Route>
          <Route path="/goals/add_goal">
            <GoalForm/>
          </Route>
          <Route path="/goals">
            <NavBar />
            <Goals/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
