import { useContext, useState } from "react";
import "./comments.css";
import { AuthContext } from "../../context/authContext";
import {useQuery} from 'react-query'
import axios from 'axios'
import { makeRequest } from "../../axios";
import moment from 'moment'
import {useMutation,  useQueryClient} from 'react-query'

const Comments = ({postId}) =>{
  const [desc, setDesc]=useState("")
  const { currentUser } = useContext(AuthContext);

  const queryClient=useQueryClient()

  const {isLoading, error, data}=useQuery(['comments'], ()=>
  makeRequest.get("/comments?postId="+postId).then((res)=>{
    return res.data
  })
  )


  const mutation=useMutation((newComment)=>{
    return makeRequest.post("/comments", newComment)
  }, {
    onSuccess: ()=>{
      queryClient.invalidateQueries(['comments'])
    }
  })

  const handleClick=e=>{
    e.preventDefault()
    console.log(desc, postId)
    mutation.mutate({desc, postId})
    setDesc("")
  }

  return (
    <div className="comments">
      {currentUser.isverified===1  && <div className="write">
        <input type="text" placeholder="write a comment" onChange={e=>setDesc(e.target.value)} value={desc} />
        <button onClick={handleClick}>Send</button>
      </div> }
      
      {isLoading ?  "Loading" : data.map((comment) => (
        <div className="comment">
          <div className="details">
            <span>{comment.name}</span>
            <span className="date">{moment(comment.createdat).fromNow()}</span>
          </div>
            <p>{comment.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
