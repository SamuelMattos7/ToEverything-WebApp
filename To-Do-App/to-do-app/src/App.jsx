import {BrowserRouter as Router, Routes, Route, Link, useParams} from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TasksPage from "./pages/tasks";
import TaskDetails from "./components/tasks/taskDetails";
import UpdateTask from "./components/tasks/TaskUpdate";
import CreateTask from "./components/tasks/CreateTask";
import CategoryUpdate from "./components/categories/UpdateCategory";
import CreateCategory from "./components/categories/CreateCategory";
import CategoriesPage from "./pages/Categories";
import ProjectsPage from "./pages/Projects";
import ProjectUpdate from "./components/projects/ProjectUpdate";
import CreateProject from "./components/projects/CreateProject";
import ProjectDetails from "./components/projects/projectDetails";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">login</Link></li>
          <li><Link to="/register">Sing up</Link></li>
          <li><Link to="/tasks">tasks</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Index/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/tasks" element={<TasksPage/>}></Route>
        <Route path="/tasks/create" element={<CreateTask/>}></Route>
        <Route path="/tasks/details/:id" element={<TaskDetailWrapper />} />
        <Route path="/tasks/edit/:id" element={<UpdateTask/>} />
        <Route path="/categories" element={<CategoriesPage/>}></Route>
        <Route path="/category/create-category" element={<CreateCategory/>} />
        <Route path="/category/update/:id" element={<CategoryUpdate/>} />
        <Route path="/projects" element={<ProjectsPage/>}/>
        <Route path="/project/details/:id" element={<ProjectDetails/>}/>
        <Route path="/projects/create" element={<CreateProject/>}/>
        <Route path="/projects/update/:id" element={<ProjectUpdate/>}/>
      </Routes>
    </Router>
    
  )
}

const TaskDetailWrapper = () => {
  const { id } = useParams();
  return <TaskDetails taskId={id} />;
};

export default App
