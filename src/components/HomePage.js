import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import GetDetails from './GetDetails';
import { format } from 'date-fns'
// import format from 'date-fns/format'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function HomePage() {
    const [items, setItems] = useState([])
    const [query, setQuery] = useState("test")
    const [text, setText] = useState("")
    const [largeTitle, setLargeTitle] = useState([])
    const [isLoading, setIsLoading] = useState(true)

  
  
    useEffect(()=>{
  
      setIsLoading(true)
      const fetchArticles = async() => {
        const res = await fetch(`http://hn.algolia.com/api/v1/search?query=${query}`)
        const data = await res.json()
        setItems(data.hits)
        setLargeTitle(data.hits[0])
        // console.log(data.hits[0].objectID)
      }
      
      fetchArticles()
      setIsLoading(false)
    },[query])
  
    console.log(largeTitle.url);
  
    const handleSubmit = (e) => {
      e.preventDefault()
      if(!text){
        toast("Input is empty")
      }else{
        setQuery(text)
        setText("")
      }
    }
    return (
      <>
        <section className='section'>
          <form autoComplete='off' onSubmit={handleSubmit}>
            <input type='text' name='search' id='search' value={text} onChange={(e) => setText(e.target.value)} placeholder='Search for something' />
            <button>Search</button>
          </form>
  
              <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
  
          <article className='title'>
            <h1>{largeTitle.title}</h1>
            <Link to="/post-details" component={<GetDetails/>}>Read Full Article</Link>
          </article>
  
          <p className='category'><span>Category:{query}</span></p>
         
  
          {isLoading ? <div className="spinner"></div> : <>
            <article className='cards'>
              {/* <div>
  
                <h2>{largeTitle.title}</h2>
  
                <ul>
                  <li>By sankara</li>
                  <li><a href=''>Read More ..</a></li>
                </ul>
                <p>Date</p>
              </div> */}
              {items.map(({author, created_at, title, objectID }) => (
                
                <div key={objectID}>
                  <h2>{title}</h2>
                  <ul>
                    <li>By {author}</li>
                    {/* <li><Link to="/post-details" component={<GetDetails  objectID={objectID} />}>Read More</Link></li> */}
                    <li><Link to={`/post-details/${objectID}`}>Read More</Link></li>

                    <li></li> 
                  </ul>
  
                  {/* <p>{created_at}</p> */}
                  <p>{format(new Date(created_at), "dd MMMM yyyy")}</p>
                </div>
              ))}
            </article>
  
          </> }
  
   
  
        </section>
  
      </>
    )
}

export default HomePage