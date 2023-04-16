import "./share.css";
// import "./share.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import axios from "axios";

const Share = () => {
  const [desc, setDesc] = useState("");
  // const currentUser={
  //   profilePic: "acb",
  //   name: "arsa"
  // }
  const { currentUser } = useContext(AuthContext);
  let userid=currentUser.id;
  
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleClick = (e) => {
    e.preventDefault();
    if (desc === "") alert("Input field cannot be empty");
    else {
      mutation.mutate({ desc, userid });
      setDesc("");
    }
  };

  // const handleClick=async e=>{
  //   e.preventDefault()
  //   if( desc==="") alert("Input field cannot be empty")
  //   else {
  //     console.log(desc)
  //     await axios.post("http://localhost:8800/api/posts", {desc})
  //     setDesc("")
  //   }
  // }

  return (
    <div className="share">
      <div className="container3">
        <div className="top">

          <input
          className="shareinput"
            type="text"
            placeholder={`What's on your mind ${currentUser.name}?`}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <hr />
        <div className="bottom">
          <div className="right">
            <button id="share-btn" onClick={handleClick}>
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  
  );
};

export default Share;
