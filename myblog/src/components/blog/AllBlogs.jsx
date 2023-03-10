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
  const [showCategory, setShowCategory] = useState(false);


  const baseURL = process.env.REACT_APP_URL;

  useEffect(() => {
    const mostrarNoticias = async () => {
    await axios
      .get(`${baseURL}/api/blogs/`)
      .then((res) => { 
        setNoticias(res.data.data); 
        setNoticiasFilter(res.data.data);})
      .catch((err) => {console.log(err);});
    };
    mostrarNoticias();
    setChange(false);
    }, [change, baseURL]);

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
  const cleanFilterSearch = (e) => {
    e.preventDefault();
    setSearchText("");
    setNoticiasFilter(noticias);
  }
  
 // filtro por categoria
  const [categories, setCategories] = useState([]);
  const filterCategory = (category) => {
    if (category === "Todas"){
      setNoticiasFilter(noticias)
      return
    } 
    const filteredData = noticias.filter(noticia => noticia.category === category);
    setNoticiasFilter(filteredData)
  }
  useEffect(() => {
    const allCategories = ["Todas",
    ...new Set(noticias.map(item => item.category))];
    setCategories(allCategories)
    setShowCategory(true)
  }, [noticias])

  return (
    <div className="container">
      <h2 className="main-title m-3">Publicaciones</h2>
      <div className="button-create-post">
        <a href="/createblog">
          <button className="main-button">Nueva Publicaci??n</button>
        </a>
      </div>
      <div className="search-bar-input">
        <div className="search-bar">
          <input type="text" className="search-input-bar"
              placeholder="Buscar por t??tulo"
              value={searchText}
              onChange={handleChange} />
          <button className="search-button-bar" onClick={cleanFilterSearch}>
            X
          </button>
        </div>
        {showCategory&&<SearchCategory 
          categories={categories} 
          filterCategory={filterCategory}/>}
      </div>
      {!noticias.length ? <EmptyList /> : <ListBlogs noticias={noticiasFilter} baseURL={baseURL} />}
    </div>
  );
};

export default AllBlogs;
