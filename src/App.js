import { Switch, Route } from "react-router-dom";

import Header from "./components/header/header";
// import Task from "./components/task/task";
import TaskList from "./components/task/taskList";
import Timer from "./components/timer/timer";

function App() {
  return (
    <>
      <Header />

      <Switch>
        <Route path="/" exact>
          <Timer />
        </Route>

        {/* <Task /> */}
        <Route path="/tasks" exact>
          <TaskList />
        </Route>
      </Switch>
    </>
  );
}

export default App;
