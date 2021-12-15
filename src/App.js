import { Routes, Route } from 'react-router-dom'

import './App.css'
import SingleUserPage from './pages/SingleUser'
import UsersListPage from './pages/UsersList'

function App() {
  //This component used for routing
  return (
    <div className="root-container">
      <Routes>
        <Route path='/' element={<UsersListPage/>}/>
        <Route path='/user/:id' element={<SingleUserPage/>} />
      </Routes>
    </div>
  )
}

export default App
