import { useParams } from 'react-router'
import { useState, useEffect } from 'react'

import './UserDetails.css'

function UserDetails(props) {
  const { id } = useParams()
  const [userInfoData, setUserInfoData] = useState({})
  const [userAddressData, setUserAddressData] = useState({})

  useEffect(() => {
    fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`,
    )
      .then((result) => {
        return result.json()
      })
      .then((data) => {
        const fullName = `${data.prefix} ${data.name} ${data.lastName}`

        props.setUserHistory((previous) => {
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
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
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
  )
}

export default UserDetails
