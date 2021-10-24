import React, {useState} from 'react'; 
import axios from "axios";
import useAsync from "./useAsync";
import User from './User';

async function getUsers(){
  const response = await axios.get(
    '/api/member'
  );
  return response.data;
}



function NewUsers(){
  const [userId, setUserId] = useState(null); 
  const [state, refetch] = useAsync(getUsers, [], true);
  const {loading, data: users, error} = state; 
  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return <button onClick={refetch}>loading</button>;

  return (
    <>
    <ul>
      {users.map(user => (
        <li key={user.id}
          onClick={()=> setUserId(user.id)}
          style={{cursor: 'pointer'}}
        >
          {user.name} {user.email}
        </li>
      ))}
    </ul>
    <button onClick={refetch}>다시 불러오기</button>
    {userId && <User id={userId} />}
    </>
  )
}
export default NewUsers;