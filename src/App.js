import { Switch, Route } from "react-router-dom";
import Header from "./components/header/header";
import TaskList from "./components/task/taskList";
import Task from "./components/task/task";
import Timer from "./components/timer/timer";
import AddTask from "./components/addtask/addtask";
import Settings from "./components/settings/settings";
import NotFoundView from "./components/notfoundview";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Timer />
        </Route>
        <Route path="/addtask">
          <AddTask />
        </Route>
        <Route path="/tasks" exact>
          <TaskList />
        </Route>
        <Route path="/tasks/:taskid">
          <Task />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route>
          <NotFoundView />
        </Route>
      </Switch>
    </>
  );
}

export default App;
