import {Link} from 'react-router-dom'

function UserHistoryBreadCrumbs(props) {
  return (
    <div className="user-name-page">
      {props.userHistory.map((user, index) => {
        return (
          <div key={user.id} style={{ display: 'inline-block' }}>
            <Link to={`/user/${user.id}`}>{user.fullName}</Link>
            {props.userHistory.length - 1 !== index && (
              <i style={{ margin: '0 4px' }}>{'>'}</i>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default UserHistoryBreadCrumbs
