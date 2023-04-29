import { useContext, useState, useEffect } from "react";
import "./comments.css";
import { AuthContext } from "../../context/authContext";
import {useQuery} from 'react-query'
import axios from 'axios'
import { makeRequest } from "../../axios";
import moment from 'moment'
import {useMutation,  useQueryClient} from 'react-query'
import { Box, Stack, Avatar } from "@mui/material";

const Comments = ({postId}) =>{
  const [desc, setDesc]=useState("")
  const { currentUser } = useContext(AuthContext);
  let userid=currentUser.id;

  const queryClient=useQueryClient()

  // const {isLoading, error, data}=useQuery(['comments'], ()=>
  // makeRequest.get("/comments?postId="+postId).then((res)=>{
  //   return res.data
  // })
  // )
  let isLoading=0;
  const [data, setData]=useState([])

  useEffect(() => {
    fetch("http://localhost:8800/api/comments?postId="+postId).then(res => res.json()).then(data => {
        console.log(data)
        setData(data)
    });
}, [data])

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
  const getName = (value) => {

    return `${value.split(" ")[0][0]}`;
  }
  return (
    <div className="comments">
      {currentUser.isverified===1 && <div className="write">
        <input className="commentinput" type="text" placeholder="Write a comment!" onChange={e=>setDesc(e.target.value)} value={desc} />
        <button className="commentbutton" onClick={handleClick}>Send</button>
      </div> }
     
      {isLoading ?  "Loading" : data.map((comment) => (
        <>
        {/* <div className="comment">
          <div className="details">
          <Box >
            <Stack spacing={2}>
              <Avatar className="avatar"
                sx={{ bgcolor: "lightblue", color: "black", width: 33, height: 33 }}
                children={getName(`${comment.name}`)}
              />
            </Stack>

          </Box>
            <span className="comment-user">{comment.name}</span>
            <span className="date-comment">{moment(comment.createdat).fromNow()}</span>
          </div>
            <p className="comment-data">{comment.desc}</p>
        </div> */}
        <div className="comment">
        
          <div className="details">
          <a href={`/view/${comment.username}`}>
          <Box >
            <Stack spacing={2}>
              <Avatar className="avatar"
             sx={{  width: 30, height: 30 ,bgcolor: "lightblue", color: "black" }}
                children={getName(`${comment.name}`)}
              />
            </Stack>

          </Box>
          </a>
          <a href={`/view/${comment.username}`}>
          <span className="commment-name">{comment.name}</span>
          </a>
        </div>
        <div className="commment-timestamp">
          <span className="date">{moment(comment.createdat).fromNow()}</span>
        </div>
        <div className="commment-highlight container">
        <div className="comment-data">
          <p>{comment.desc}</p>
        </div>
        </div>
        </div>
        
        </>
      ))}
       {data != null && data.length===0 && 'No Comments'}
    </div>
  );
};

export default Comments;
