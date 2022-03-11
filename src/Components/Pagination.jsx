import React,{useState,useEffect}from 'react'
import './Pagination.css'

function Pagination() {
    const [data,setData] = useState([])

    const [currentPage,setCurrentPage] = useState(1)
    const [itemsPerPage,setItemsPerPage] = useState(5)

    const[pageNumberLimit,setPageNumberLimit] = useState(5)
    const[maxPageNumberLimit,setMaxNumberLimit] = useState(5)
    const[minPageNumberLimit,setMinPageNumberLimit] = useState(0)



    const indexOfLastItem = currentPage*itemsPerPage
    const indexOfFirstItem = indexOfLastItem-itemsPerPage
    
    const currentItems = data.slice(indexOfFirstItem,indexOfLastItem)

    const HandleCLick = (event) =>{
        setCurrentPage(Number(event.target.id))
    }

    const pages = []

    for(var i = 1;i<Math.ceil(data.length/itemsPerPage);i++){
        pages.push(i)
    }

    const renderPageNumber = pages.map((number)=>{
        if(number<maxPageNumberLimit+1&& number>minPageNumberLimit){
            return(
                <li key={number} id={number} onClick={HandleCLick} className={currentPage===number?"active":null}>
                    {number}
                </li>
                
                )
        }else{
            return null
        }
       
    })

    console.log(pages)

    const[isLoading,setIsLoading] = useState(false)

    const renderData = (data)=>{
        return(
            <ul className='todo'>
            {
                data.map((todo,index)=>(
                    <li key={index}>{todo.title}</li>
                ))
            }
        </ul>
        )
        
    }

    const handleNextBtn = ()=>{
        setCurrentPage(currentPage+1)

        if(currentPage+1>maxPageNumberLimit){
            setMaxNumberLimit(maxPageNumberLimit+pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit+pageNumberLimit)
        }
    }

    const handlePrevBtn = ()=>{
        setCurrentPage(currentPage-1)

        if((currentPage-1)%pageNumberLimit===0){
            setMaxNumberLimit(maxPageNumberLimit-pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit-pageNumberLimit)
        }
    }

    useEffect(()=>{
        setIsLoading(true)
        fetch(`https://jsonplaceholder.typicode.com/todos`)
        .then(data=>data.json())
        .then(json=>
            {
                setIsLoading(false)
                setData(json)
            }
            )
        return(()=>{alert('welcome')})
    },[])

    console.log(data)

  return (
    <>
        <h1>Todo-List</h1>
        {
            isLoading
            ?<h1>...loading</h1>
            :renderData(currentItems)
            
        }
        <ul className='pageNumbers'>
            {
                currentPage<=1
                ? null
                :
            <li onClick={handlePrevBtn}>
                <button>prev</button>
            </li>
            }
            
            {renderPageNumber}

            {
                currentPage>=pages.length?null
                :
                <li onClick={handleNextBtn}>
                    <button>next</button>
                </li>
            }
            
        </ul>
       
        
        
    </>
  )
}

export default Pagination