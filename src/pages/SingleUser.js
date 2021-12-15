import './SingleUser.css'
import Users from '../components/Users'
import UserDetails from '../components/UserDetails'
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router'
import UserHistoryBreadCrumbs from '../components/UserHistoryBreadCrumbs'

// renders user details and his friend list
function SingleUserPage(props) {
  const { id } = useParams()
  const [userFriends, setUserFriends] = useState([])
  const [userHistory, setUserHistory] = useState([])

  const [pageNumber, setPageNumber] = useState(1)
  const [lastElement, setLastElement] = useState(null)

  const observerRef = useRef(
    new IntersectionObserver((elements) => {
      //if intersection(გადაკვეთა) observes to the last element from the array
      //(I pass only this element to array, so it is the [0] index), then page number increments
      console.log('here')
      if (elements[0].isIntersecting) {
        setPageNumber((prev) => prev + 1)
      }
    }),
  )

  useEffect(() => {
    const currentObserver = observerRef.current
    if (lastElement) {
      currentObserver.observe(lastElement)
    }

    //cleanup function
    return () => {
      if (lastElement) {
        currentObserver.unobserve(lastElement)
      }
    }
  }, [lastElement])

  //loads friend list data
  useEffect(() => {
    setUserFriends([]);
    setPageNumber(1)
    fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/1/20`,
    )
      .then((result) => result.json())
      .then((data) => {
        setUserFriends(data.list)
      })
  }, [id])

  useEffect(() => {
    if (pageNumber !== 1) {
      fetch(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${pageNumber}/20`,
      )
        .then((result) => result.json())
        .then((data) => {
          setUserFriends((prev) => [...prev, ...data.list])
        })
    }
  }, [pageNumber])

  return (
    <div className="user-page-container">
      <UserDetails setUserHistory={setUserHistory} />
      <UserHistoryBreadCrumbs userHistory={userHistory} />
      <h2>Friends:</h2>
      <Users setLastElement={setLastElement} userList={userFriends} />
    </div>
  )
}

export default SingleUserPage
