import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
// import format from 'date-fns/format'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [items, setItems] = useState([])
  const [query, setQuery] = useState("test")
  const [text, setText] = useState("")
  const [largeTitle, setLargeTitle] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  // const [isLoading, setIsLoading] = useState(false)
  // const [url, setUrl] = useState("http://hn.algolia.com/api/v1/items/12701272")


  useEffect(()=>{

    setIsLoading(true)
    const fetchArticles = async() => {
      // const res = await fetch(`http://hn.algolia.com/api/v1/search?query=test`)
      const res = await fetch(`http://hn.algolia.com/api/v1/search?query=${query}`)
      const data = await res.json()
      setItems(data.hits)
      setLargeTitle(data.hits[0])
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
          <a href={largeTitle.url} target='_blank' rel='noreferrer'>Read Full Article</a>
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
            {items.map(({author, created_at, title, url, objectId  }) => (
              <div key={objectId}>
                <h2>{title}</h2>
                <ul>
                  <li>By {author}</li>
                  <li><a href={url} target='_blank' rel='noreferrer'> Read More </a></li>
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

export default App