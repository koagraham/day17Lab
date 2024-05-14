import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

export default function App() {
  const [friends, updateFriends] = useState([])
  const [picture, updatePicture] = useState("")
  const [name, updateName] = useState("")

  const getSavedFriends = async () => {
    const res = await axios.get('/api/friends')
    updateFriends(res.data)
  }

  useEffect(() => {
    getSavedFriends()
  }, [])
  
  function addFriend() {
    const newFriends = [...friends]
    newFriends.push({picture: picture, name: name})
    updateFriends(newFriends)
    updatePicture("")
    updateName("")
  }

  const friendInfo = friends.map((obj) => 
  <div key={obj.name}>
    <img src={obj.picture} width="200" height="100"></img>
    <span>{obj.name}</span>
  </div>)

  return <div>
    <label>Picture</label>
    <input type="text" name="picture" value={picture} onChange={(e) => updatePicture(e.target.value)}></input>
    <label>Name</label>
    <input type="text" name="name" value={name} onChange={(e) => updateName(e.target.value)}></input>
    <button type="submit" onClick={addFriend}>Add Friend</button>
    <p>{friendInfo}</p>
  </div>;
}
