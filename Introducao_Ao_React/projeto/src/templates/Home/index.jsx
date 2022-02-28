import './styles.css';
import { useState, useEffect } from 'react';
import { PostCard } from '../../components/PostCard';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';

export default function Home() {

  const [posts, setPosts] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [page, setPage] = useState(0)
  const [postsPerPages, setPostsPerPages] = useState(2)

  const [searchBar, searchBarSet] = useState("")

  useEffect(() => {

    loadPosts().then(res => {
      setPosts(res.slice(page, postsPerPages))
      setAllPosts(res)
    })
    
  }, [])

  const handleChange = (event) => {
    searchBarSet(event.target.value)
  };

  const loadMorePosts = () => {
    const nextPage = page + postsPerPages
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPages)
    posts.push(...nextPosts)
    
    setPosts(posts)
    setPage(nextPage)
  }

  const noMorePosts = page + postsPerPages >= allPosts.length;
  const filtros = searchBar !== "" ?
  allPosts.filter((val) => {
    return val.title.toLowerCase().includes(searchBar.toLowerCase())
  }) : posts

  return (
    <section className='container'>
      <div className='header'>
        <input className='search' placeholder='pesquise aqui...' onChange={handleChange}/>
      </div>
        <div className="posts">

        {filtros.length > 0 && 
          filtros.map(p => (
              <PostCard key={p.id} post={p}/>
          ))
        }

        {
          filtros.length === 0 && (
            <p>Não há posts...</p>
          )
        }
        </div>
        <div className='button-container'>
          {!searchBar && (
            <Button onClick={loadMorePosts} text="More posts" disabled={noMorePosts}/>
          )}
        </div>

    </section>
  );

}
