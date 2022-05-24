import './App.css';
import Workout from './components/workout/Workout'
import NavBar from './components/Navbar';
import Goals from './components/goals/Goals';
import GoalForm from './components/goals/GoalsForm';
import EditGoalForm from './components/goals/EditGoalForm';
import WorkoutList from './components/workout/WorkoutList';
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
          <Route path="/workout/create">
            <Workout />
          </Route>
          <Route path="/workout/all">
            <WorkoutList />
          </Route>
          <Route path="/goals/edit_goal/:id">
            <EditGoalForm />
          </Route>
          <Route path="/goals/add_goal">
            <GoalForm />
          </Route>
          <Route path="/goals">
            <Goals />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
