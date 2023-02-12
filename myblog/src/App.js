import './App.css';
import { Route, Routes} from 'react-router-dom';
import AllBlogs from './components/AllBlogs';
import CreateBlog from './components/CreateBlog';
import UpdateBlog from './components/UpdateBlog';
import NavBar from './components/navBar/NavBar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ListaUsuarios from './components/auth/ListaUsuarios';
import PokeList from './components/pokemon/PokeList';
import Pokemon from './components/pokemon/Pokemon';
import Portada from './components/portada/Portada';


function App() {

  return (
    <div className="App">
      <NavBar />
        <Routes>
          <Route path="/" element= {<Portada />} exact />
          <Route path="/allblogs" element= {<AllBlogs/>} exact />
          <Route path="/createblog" element= {<CreateBlog/>} exact />
          <Route path="/updateblog/:id" element= {<UpdateBlog/>} exact/>
          <Route path="/auth/login" element= {<Login/>} exact/> 
          <Route path="/auth/register" element= {<Register/>} exact/>
          <Route path="/auth/lista" element= {<ListaUsuarios/>} exact/>
          <Route path="/pokemon" element= {<PokeList/>} exact/>
          <Route path="/pokemon/:id" element= {<Pokemon/>} exact/>
        </Routes>
    </div>
  );
}

export default App;
