import Header from "./Header";
import Nav from "./Nav"
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing"
import Footer from "./Footer"
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Posts from "./Posts";
import PostLayout from "./PostLayout";
import { useEffect, useState } from "react";
import { format } from 'date-fns'
import api from "./api/Posts"
import Edit from "./Edit";




function App() {

  const [posts, setPosts] = useState([]);

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);

      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);

        } else {
          console.log(`Error: ${err.message}`);

        }

      }

    }
    fetchData();

  }, [])

  useEffect(() => {
    const filteredResults = posts.filter((post) => ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));
    setSearchResults(filteredResults.reverse());
  }, [posts, search])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    const response = await api.post("/posts", newPost);
    const allPosts = [...posts, response.data];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/');


  }

  const handleDelete = async (id) => {
    const postLists = posts.filter((post) => (post.id !== id));
    await api.delete(`/posts/${id}`);
    setPosts(postLists);
    navigate('/')

  }

  const handleEdit = async (id) => {

    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {

      const response = await api.put(`/posts/${id}`,updatedPost)
      setPosts(posts.map((post)=>(post.id===id ? {...response.data}
        :post)));
        setEditTitle('');
        setEditBody('');
        navigate('/')

    } catch (err)
    {
      console.log(`Error:${err.message}`);

    }


  }
  return (
    <div className="App">
      <Header title={"facebook"} />
      <Nav
        search={search}
        setSearch={setSearch}
      />

      <Routes>
        <Route path="/" element={<Home posts={searchResults} />} />
        <Route path="post">
          <Route index element={
            <NewPost
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
              handleSubmit={handleSubmit}
            />
          } />

        </Route>
        <Route path="posts/:id" element={<PostPage posts={posts}
          handleDelete={handleDelete} />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />

        <Route path="/edit/:id" element={<Edit
        posts={posts}
          setPostTitle
          editTitle = {editTitle}
          editBody ={editBody}
          setEditTitle ={setEditTitle}
          setEditBody= {setEditBody}
          handleEdit={handleEdit}
        />}/>
      </Routes>


      <Footer />

    </div>
  );
}

export default App;
