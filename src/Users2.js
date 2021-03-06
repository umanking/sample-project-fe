
import React, { useEffect, useReducer } from 'react';
import axios from "axios";

function reducer(state, action){
  switch(action.type){
    case 'LOADING':
      return {
        loading: true, 
        data: null,
        error: null
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null
      };
    case 'ERROR':
      return {
        loading: false,
        data: null, 
        error: action.error
      };
    default:
      throw new Error(`unhandled action type: ${action.type}`)
  }
}

function Users2(){
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null
  });

  const fetchUsers = async () => {
    dispatch({type: 'LOADING' });
    try {
      const response = await axios.get(
        '/api/member'
      );
      dispatch({type: 'SUCCESS', data: response.data }); 
    }catch (e) {
      dispatch({type: 'ERROR', error: e});
    }
  }

    useEffect(()=> {
      fetchUsers();
    },[]);


    const {loading, data: users, error } = state; 
    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!users) return null;
    return (
      <>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
        <button onClick={fetchUsers}>다시 불러오기</button>
      </>
    );
  }

export default Users2; 