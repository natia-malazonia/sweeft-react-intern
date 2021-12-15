 import './UserCard.css'
 import {useNavigate} from 'react-router-dom'

function UserCard(props) {
  const navigate = useNavigate();
  //creates and renders one user card
  return (
      <div onClick={()=>navigate('/user/'+props.id)} className="user-card" style={{ width: '18rem' }}>
        <img className="" src={props.imgUrl} alt="" />
        <div className="user-card-body">
          <h3 className="">{props.fullName}</h3>
          <p className="">{props.title}</p>
        </div>
      </div>
  )
}

export default UserCard
