import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import AllBlogs from './components/AllBlogs';
import CreateBlog from './components/CreateBlog';
import UpdateBlog from './components/UpdateBlog';
import NavBar from './components/NavBar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';


function App() {

  return (
    <div className="App">
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element= {<AllBlogs/>} exact />
          <Route path="/createblog" element= {<CreateBlog/>} exact />
          <Route path="/updateblog/:id" element= {<UpdateBlog/>} exact/> 
          <Route path="/auth/login" element= {<Login/>} exact/> 
          <Route path="/auth/register" element= {<Register/>} exact/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
