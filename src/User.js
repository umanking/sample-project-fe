import axios from "axios";
import useAsync from "./useAsync";

async function getUser(id){
  const response = await axios.get(
    `/api/member/${id}`
  )
  return response.data;
}

function User({id}){
  const [state] = useAsync(()=> getUser(id), [id]); 
  const {loading, data: user, error } = state; 
  if (loading) return <div>loading...</div>
  if (error) return <div>error</div>
  if (!user) return null; 

  return (
    <>
    <div>
      <h2>{user.name}</h2>
      <p>
        <b>email:</b> {user.email}
      </p>
    </div>
    </>
  )
}

export default User;