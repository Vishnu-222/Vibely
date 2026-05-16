import React, { useEffect } from "react";
import "../style/feed.scss";
import { usePost } from "../hooks/usePost";
import Post from "../components/Post";
import Nav from "../../shared/components/Navbar"

const Feed = () => {
  const { feed, handleGetFeed, loading, handleLike, handleUnLike} = usePost();

  useEffect(() => {
    handleGetFeed();
  }, []);

  if (loading || !feed) {
    return (
      <main>
        <h1>Feed is loading...</h1>
      </main>
    );
  }

  return (
    <main className="feed-page">
      <div className="feed">
      <Nav />
        <div className="posts">
          {feed.map((post, idx) => {
            return <Post key={idx} user={post.user} post={post} loading={loading} handleLike={handleLike}  handleUnLike={handleUnLike} />;
          })}
        </div>
      </div>
    </main>
  );
};

export default Feed;
