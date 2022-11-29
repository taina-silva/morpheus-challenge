import React from "react";
import RegistrationScreen from './Screens/RegistrationScreen/registration_screen';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ListScreen from './Screens/ListScreen/list_screen';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
        <Routes>
            <Route path="/" element={<ListScreen />} />
            <Route path="/registration" element={<RegistrationScreen />} />
        </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
