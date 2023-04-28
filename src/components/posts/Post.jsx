import "./post.css";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";
import moment from 'moment';
import { Box, Stack, Avatar } from "@mui/material";

const Post = ({ post }) => {

  const [commentOpen, setCommentOpen] = useState(false);

  const handleComment = () => {
    setCommentOpen(!commentOpen);
  }

  const getName = (value) => {

    return `${value.split(" ")[0][0]}`;
  }

  return (
    <div className="post">
      <div className="userInfo">
        <div className="details">
          <Box >
            <Stack spacing={2}>
              <Avatar className="avatar"
                sx={{ bgcolor: "lightblue", color: "black" }}
                children={getName(`${post.name}`)}
              />
            </Stack>

          </Box>
          <span className="name">{post.name}</span>
        </div>
        <div className="timestamp">
          <span className="date">{moment(post.createdat).fromNow()}</span>
        </div>
        <div className="content">
          <p className="post-data">{post.desc}</p>
        </div>
        <div className="info">
          <button id="comments" className={commentOpen ? "item commentActive" : "item"} onClick={handleComment}>
            <TextsmsOutlinedIcon style={{ marginRight: 5 }} />
            Comments
          </button>
        </div>

        {commentOpen && <Comments postId={post.id} />}


      </div>
    </div>
  );
};

export default Post;
