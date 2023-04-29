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
  let userid=currentUser.id;

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
    if (desc === "") alert("Input field cannot be empty")
    else{
      mutation.mutate({desc, userid, postId})
      setDesc("")
    }
  }

  return (
    <div className="comments">
      {currentUser.isverified===1 && <div className="write">
        <input className="commentinput" type="text" placeholder="Write a comment!" onChange={e=>setDesc(e.target.value)} value={desc} />
        <button className="commentbutton" onClick={handleClick}>Send</button>
      </div> }
      
      {isLoading ?  "Loading" : data.map((comment) => (
        <div className="comment">
          <div className="details">
            <span>{comment.name}</span>
            <span className="date-comment">{moment(comment.createdat).fromNow()}</span>
          </div>
            <p>{comment.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
