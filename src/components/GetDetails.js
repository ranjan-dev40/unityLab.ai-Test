import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

function GetDetails() {

  const { objId } = useParams()

  // const [items, setItems] = useState([])
  const [largeTitle, setLargeTitle] = useState("")
  const [point, setPoint] = useState("")
  const [children, setChildren] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const objectID = objId


  useEffect(()=>{

    setIsLoading(true)
    const fetchArticles = async() => {


      
      const res = await fetch(`http://hn.algolia.com/api/v1/items/${objectID}`)
      const data = await res.json()
      console.log(data)


        
        if(data.title){
          setLargeTitle(data.title)
        }
        if(data.points){
          setPoint(data.points)
        }

        setChildren(data.children)


    }
    
    fetchArticles()
    setIsLoading(false)
  },[objectID])


  return (
    <>
      <section className='section'>


        <article className='details-title'>
          <h1>{largeTitle}</h1>

        </article>
 
          
       
        {isLoading ? <div className="spinner"></div> : <>

          {point && <p className='points'> Point:{point}</p>}
          <article className='details'>



            {children.map(({id, author, text}) => (
              <div key={id}>
                <h2>{author}</h2>
                {/* <p>{text}</p> */}
                <div dangerouslySetInnerHTML={{__html: text} } className='comment'></div>
                <ul>
                  <li></li> 
                </ul>

              </div>
            ))}
          </article>

        </> }

 

      </section>

    </>
  )
}

export default GetDetails