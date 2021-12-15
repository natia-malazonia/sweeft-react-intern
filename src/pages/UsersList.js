import { useState, useEffect, useRef } from 'react'
import Users from '../components/Users'

// fetchs data from server and renders page with user members
function UsersListPage() {
  const [userList, setUserList] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [lastElement, setLastElement] = useState(null)

  const observerRef = useRef(
    new IntersectionObserver((elements) => {
      if (elements[0].isIntersecting) {
        setPageNumber(prev => prev + 1)
      }
    })
  )

  useEffect(()=>{
    const currentObserver = observerRef.current;
    if(lastElement) {
      currentObserver.observe(lastElement)
    }

    //cleanup function
    return ()=> {
      if(lastElement) {
        currentObserver.unobserve(lastElement)
      }
    }
  }, [lastElement])

  useEffect(() => {
    fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${pageNumber}/20`,
    )
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setUserList(prev=>[...prev, ...data.list])
      })
  }, [pageNumber])

  return (
    <div className="users-container">
      <Users setLastElement={setLastElement} userList={userList} />
    </div>
  )
}

export default UsersListPage
