import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { noticiasList } from '../../data/data';
import EmptyList from '../../components/EmptyList';

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(noticiasList);
  const [article, setArticle]= useState([])

  useEffect(() => {
    let blog = noticiasList.find((blog) => blog.id === parseInt(id));
    if (blog) {
      setBlog(blog);
      const article = (blog.description).split("/n");
      setArticle(article);
    } 
  }, [id]);


  return (
    <>
      <div className="container">
        {blog ? (
          <div className='blog-wrap'>
            <div>
              <h2>{blog.title}</h2>
              <hr />
            </div>
            <p>{blog.created}</p>
            <div>
              <img className="mb-5" src={blog.cover} alt='imagen' />
            </div>
            <div>
              {article.map((parrafo, i) => ( 
                <p key={i} className="divParrafo">{parrafo}</p>
              ))}
            </div>
          </div>
        ) : (
          <EmptyList />
        )}
      </div>
    </>
  )};

export default Blog;