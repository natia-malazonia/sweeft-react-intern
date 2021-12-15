import UserCard from '../components/UserCard'

import './Users.css'

//renders users list by user members
function Users(props) {
  return (
    <div className="users-container">
      {props.userList.map((user) => {
        const query = `?q=${user.id}`
        return (
          <UserCard
            key={user.id}
            id={user.id}
            fullName={`${user.prefix} ${user.name} ${user.lastName}`}
            title={user.title}
            imgUrl={user.imageUrl + query}
          />
        )
      })}
    </div>
  )
}

export default Users
