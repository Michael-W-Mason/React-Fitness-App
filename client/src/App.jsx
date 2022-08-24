import './App.css';
import NavBar from './components/Navbar';
import Goals from './components/goals/Goals';
import GoalForm from './components/goals/GoalsForm';
import EditGoalForm from './components/goals/EditGoalForm';
import WorkoutList from './components/workout/WorkoutList';
import Login from './components/auth/Login';
import PrivateRoute from './components/auth/PrivateRoute';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import WorkoutForm from './components/workout/WorkoutForm';
import Schedule from './components/schedule/Schedule';
import { useState } from 'react';


function App() {
  const [userId, setUserId] = useState({});

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" >
            <Login userId={userId} setUserId={setUserId} />
          </Route>
          <PrivateRoute exact path="/workout" component={WorkoutList} userId={userId} />
          <PrivateRoute path="/workout/add" component={WorkoutForm} userId={userId} />
          <PrivateRoute path="/workout/edit/:id" component={WorkoutForm} userId={userId} />
          <PrivateRoute exact path="/goals" component={Goals} userId={userId} />
          <PrivateRoute path="/goals/edit_goal/:id" component={EditGoalForm} userId={userId} />
          <PrivateRoute path="/goals/add" component={GoalForm} userId={userId} />
          <PrivateRoute path="/schedule" component={Schedule} userId={userId} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
