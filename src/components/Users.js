import UserCard from '../components/UserCard'

import './Users.css'

//renders users list by user members
function Users(props) {
  return (
    <div className="users-container">
      {props.userList.map((user, index) => {
        const query = `?q=${user.id}`
        //check if this is the last element, and if it is, then
        // invoke setLastElemtn state function from parent component
        if (props.userList.length - 1 === index) {
          return (
            <div key={user.id} ref={props.setLastElement}>
              <UserCard
                id={user.id}
                fullName={`${user.prefix} ${user.name} ${user.lastName}`}
                title={user.title}
                imgUrl={user.imageUrl + query}
              />
            </div>
          )
        }
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
