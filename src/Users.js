import { useEffect, useState } from "react";
import axios from 'axios'; 

function Users(){
  const [users, setUsers] = useState(null); 
  const [loading,  setLoading] = useState(false); 
  const [error, setError] = useState(null);
  

  const fetchUsers = async () => {
    try{
      setError(null);
      setUsers(null); 
      setLoading(true); 
      const response = await axios.get(
        '/api/member'
      );
      setUsers(response.data);
    }catch(e){
      setError(e); 
    }
    setLoading(false); 
  };

  useEffect(()=> {
    fetchUsers();
  }, []);

  if (loading) return <div>loading...</div>
  if (error) return <div>error....</div>
  if (!users) return null; 
  return (
    <>
    <ul>
      {users.map(user=>(
        <li key={user.id}>
          {user.name} {user.email}
        </li>
      ))}
    </ul>
    <button onClick={fetchUsers}>다시 불러오기</button>
    </>
  );
}

export default Users; 