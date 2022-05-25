import './App.css';
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
import WorkoutForm from './components/workout/WorkoutForm';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/workout/create">
          <WorkoutForm />
          </Route>
          <Route path="/workout/all">
            <WorkoutList />
          </Route>
          <Route path="/workout/edit/:id">
            <WorkoutForm />
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
