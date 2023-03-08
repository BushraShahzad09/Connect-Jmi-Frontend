import Post from "./Post";
// import "./posts.scss";
import {useQuery} from 'react-query'
import { makeRequest } from "../../axios";
import { useEffect, useState } from "react";

const Posts = () => {

  //do not change comment text

  // const [data, setData] = useState([])
  
  // const {isLoading, error, data}=useQuery(['posts'], ()=>
  // makeRequest.get("/posts").then((res)=>{
  //   return res.data
  // })
  // )

//   useEffect(() => {
//     fetch("http://localhost:8800/api/posts").then(res => res.json()).then(data => {
//         console.log(data);
//         setData(data);
//     });
// }, [])


  const data=[
    {
      name:"absdhfa",
    createdat:new Date(),
    id: 2
    },
    {
      name:"dsa",
    createdat:new Date(),
    id: 3
    }
  ]



  return <div className="posts">
    {/* {error ? "Something went wrong!" : (isLoading? "loading" : data.map(post=>(
      <Post post={post} key={post.id}/>
    )))} */}
    {data.map(post=>(
      <Post post={post} key={post.id}/>))}
  </div>;
};

export default Posts;
