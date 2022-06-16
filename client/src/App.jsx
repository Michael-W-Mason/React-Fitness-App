import './App.css';
import NavBar from './components/Navbar';
import Goals from './components/goals/Goals';
import GoalForm from './components/goals/GoalsForm';
import EditGoalForm from './components/goals/EditGoalForm';
import WorkoutList from './components/workout/WorkoutList';
import Login from './components/auth/Login';
import PrivateRoute from './components/auth/PrivateRoute';
import { UserContext } from './components/context/UserContext';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import WorkoutForm from './components/workout/WorkoutForm';
import Schedule from './components/schedule/Schedule';
import { useEffect, useState } from 'react';


function App() {
  const baseName = process.env.REACT_APP_BASENAME || null;
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('userId');
    if(data){
      setUserId(data);
    }
  }, [])

  useEffect(() => {
    localStorage.clear();
    localStorage.setItem('userId', new String(userId))
  })

  return (
    <div className="App">
      <BrowserRouter basename={baseName}>
        <UserContext.Provider value={{ userId, setUserId }}>
          <Switch>
            <Route exact path="/" component={Login} />
            <>
              <NavBar />
              <PrivateRoute exact path="/workout" component={WorkoutList} />
              <PrivateRoute path="/workout/add" component={WorkoutForm} />
              <PrivateRoute path="/workout/edit/:id" component={WorkoutForm} />
              <PrivateRoute exact path="/goals" component={Goals} />
              <PrivateRoute path="/goals/edit_goal/:id" component={EditGoalForm} />
              <PrivateRoute path="/goals/add" component={GoalForm} />
              <PrivateRoute path="/schedule" component={Schedule} />
            </>

          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
