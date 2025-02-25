import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./Store/store";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import ClassDashboard from "./components/Dashboard/ClassDashboard";
import ClassSubjects from "./components/ClassSubjects/ClassSubjects";
import HomeworkList from "./components/HomeworkList/HomeworkList";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/classdashboard" element={<ClassDashboard />} />
          <Route path="/class/:className" element={<ClassSubjects />} />
          <Route path="/class/:className/subject/:subjectName" element={<HomeworkList />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
