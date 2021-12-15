import './SingleUser.css'
import Users from '../components/Users'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

//creates custom friends profile
function SingleUserPage(props) {
  const { id } = useParams()
  const [userInfoData, setUserInfoData] = useState({})
  const [userAddressData, setUserAddressData] = useState({})
  const [userFriends, setUserFriends] = useState([])
  const [userHistory, setUserHistory] = useState([])

  useEffect(() => {
    fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`,
    )
      .then((result) => {
        return result.json()
      })
      .then((data) => {
        const fullName = `${data.prefix} ${data.name} ${data.lastName}`

        setUserHistory((previous) => {
          if (previous.some((user) => user.id === id)) {
            return previous
          }
          return [...previous, { fullName, id }]
        })

        const userInfo = {
          image: `${data.imageUrl}?q=${id}`,
          fullName,
          title: data.title,
          email: data.email,
          ipAddress: data.ip,
          jobArea: data.jobArea,
          jobType: data.jobType,
        }

        const userAddress = {
          companyName: data.company.name,
          city: data.address.city,
          country: data.address.country,
          state: data.address.state,
          streetAddress: data.address.streetAddress,
          zip: data.address.zipCode,
        }

        setUserInfoData(userInfo)
        setUserAddressData(userAddress)
      })
  }, [id])

  useEffect(() => {
    fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/1/20`,
    )
      .then((result) => result.json())
      .then((data) => {
        setUserFriends(data.list)
      })
  }, [id])

  return (
    <div className="user-page-container">
      <div className="user-details">
        <div className="image-container">
          <img className="user-image" alt="" src={userInfoData.image} />
        </div>

        <fieldset className="info">
          <legend>Info</legend>
          <div>
            <strong>{userInfoData.fullName}</strong>
          </div>
          <div>
            <i>{userInfoData.title}</i>
          </div>
          <br />
          <div>
            <span>Email</span>: {userInfoData.email}
          </div>
          <div>
            <span>Ip Address</span>: {userInfoData.ipAddress}
          </div>
          <div>
            <span>Job Area</span>: {userInfoData.jobArea}
          </div>
          <div>
            <span>Job Type</span>: {userInfoData.jobType}
          </div>
        </fieldset>

        <fieldset className="address">
          <legend>Address</legend>
          <div>
            <strong>{userAddressData.companyName}</strong>
          </div>
          <div>
            <span>City</span>: {userAddressData.city}
          </div>
          <div>
            <span>Country</span>: {userAddressData.country}
          </div>
          <div>
            <span>State</span>: {userAddressData.state}
          </div>
          <div>
            <span>Street Address</span>: {userAddressData.streetAddress}
          </div>
          <div>
            <span>ZIP</span>: {userAddressData.zip}
          </div>
        </fieldset>
      </div>

      <div className="user-name-page">
        {userHistory.map((user, index) => {
          return (
            <div key={user.id} style={{ display: 'inline-block' }}>
              <Link to={`/user/${user.id}`}>{user.fullName}</Link>
              {userHistory.length - 1 !== index && (
                <i style={{ margin: '0 4px' }}>{'>'}</i>
              )}
            </div>
          )
        })}
      </div>

      <h2>Friends:</h2>
      <Users userList={userFriends} />
    </div>
  )
}

export default SingleUserPage
