import React, { useEffect, useState } from "react";
import Posts from "./Posts";

export default function JsonDemo() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function getPosts() {
      try {
        const res = await fetch("https://dummyjson.com/posts");
        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.log(error);
        setError("Could not get posts.");
      }
    }

    getPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <h1>Posts Search App</h1>

      <input
        type="text"
        placeholder="Search posts by title"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <button onClick={() => setSearch("")}>Reset</button>

      {error && <p>{error}</p>}

      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <Posts key={post.id} title={post.title} body={post.body} />
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}
