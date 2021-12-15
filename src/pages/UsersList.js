import { useState, useEffect } from 'react'
import Users from '../components/Users'

// fetchs data from server and renders page with user members
function UsersListPage() {
  const [userList, setUserList] = useState([])

  useEffect(() => {
    fetch(
      'http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/1/20',
    )
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setUserList(data.list)
      })
  }, [])

  return (
    <div className="users-container">
      <Users userList={userList} />
    </div>
  )
}

export default UsersListPage
