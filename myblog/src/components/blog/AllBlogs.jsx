import axios from "axios";
import { useState, useEffect } from "react";
import "./allblogs.css";
import EmptyList from "../common/EmptyList";
import ListBlogs from "./ListBlogs";
import SearchCategory from "../search/searchCategory/SearchCategory";

const AllBlogs = () => {
  
  const [noticias, setNoticias] = useState([]);
  const [change, setChange] = useState(false);
  const [noticiasFilter, setNoticiasFilter] = useState([]);
  const [searchText, setSearchText] = useState("");

  const baseURL = "http://localhost:8080";

  useEffect(() => {
    const mostrarNoticias = async () => {
        await axios
            .get(`${baseURL}/api/blogs/`)
            .then((res) => { 
              setNoticias(res.data.data); 
              setNoticiasFilter(res.data.data);
            })
            .catch((err) => {
            console.log(err);
            });
    };
    mostrarNoticias();
    setChange(false);
    }, [change]);

// filtro por texto en el titulo
const handleChange = (e) => {
  setSearchText(e.target.value)
  filter(e.target.value)
  }
  const filter=(terminoBusqueda)=>{
    let resultadoBusqueda = noticias.filter((elemento) => {
      if(elemento.title.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
        return elemento;
      } return false;
    });
    setNoticiasFilter(resultadoBusqueda);
  }

 // filtro por categoria
  const allCategories = ["Todas",
    ...new Set(noticias.map(item => item.category))];
  const [categories, setCategories] = useState(allCategories);
  const filterCategory = (category) => {
    if (category === "Todas"){
      setCategories(allCategories)
      setNoticiasFilter(noticias)
      return
    } 
  const filteredData = noticias.filter(noticia => noticia.category === category);
    setNoticiasFilter(filteredData)
  }
  const cleanFilterSearch = (e) => {
    setSearchText("")
    setNoticiasFilter(noticias)
  }


  return (
    <div className="container">
      <h2 className="main-title m-3">Publicaciones</h2>
      <div className="d-flex justify-content-end">
        <a href="/createblog">
          <button className="main-button">Nueva Publicación</button>
        </a>
      </div>
      <div className="search-bar-input">
        <div className="search-bar">
          <input type="text" className="input-bar"
              placeholder="Buscar por título"
              value={searchText}
              onChange={handleChange} />
          <button className="button-bar" onClick={cleanFilterSearch}>
            X
          </button>
        </div>
        {<SearchCategory 
          categories={categories} 
          filterCategory={filterCategory}/>}
      </div>
      {!noticias.length ? <EmptyList /> : <ListBlogs noticias={noticiasFilter} baseURL={baseURL} />}
    </div>
  );
};

export default AllBlogs;
