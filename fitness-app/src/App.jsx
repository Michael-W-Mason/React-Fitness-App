import './App.css';
import Workout from './components/workout/Workout'
import NavBar from './components/Navbar';
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
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
