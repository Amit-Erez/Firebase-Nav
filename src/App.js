import "./App.css";
import React, { useState } from "react";
import Logo from "./assets/Frontend-Logo.png";
import { auth, db } from "./firebase/init";
import { collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, deleteDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import Loading from "./components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  async function updatePost() {
    const hardcodedId = "AAKYGNUKUkK3L0syk6lB"
    const postRef = doc(db, "posts", hardcodedId);
    const post = await getPostById(hardcodedId)
    console.log(post)
    const newPost = {
      ...post,
      title: "Land a $400k job",
      value: "Nez",
    };
    console.log(newPost)
    updateDoc(postRef, newPost);
  }

  function deletePost() {
  const hardcodedId = "AAKYGNUKUkK3L0syk6lB"
  const postRef = doc(db, "posts", hardcodedId); 
  deleteDoc(postRef)
  }

  function createPost() {
    const post = {
      title: "Finish Interview Section",
      description: "Finish FES",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post)
  }

  async function getAllPosts() {
    const {docs} = await getDocs(collection(db, "posts"));
    const posts = docs.map((elem) => ({...elem.data(), id:elem.id}));
    console.log(posts)
  }

  async function getPostById(id) {
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef)
    return postSnap.data()
  }

  async function getPostByUid() {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", user.uid)
    );
    const {docs} = await getDocs(postCollectionRef);
    console.log(docs.map((doc) => doc.data()));
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setTimeout(() => {
        setLoading(false);
      }, 700);
      if (user) {
        setUser(user);
      }
    });
  }, []);

  function register() {
    console.log("reg");
    document.querySelector('.reg__loading').classList += ' load__state';
    createUserWithEmailAndPassword(auth, "amit@email.com", "test123")
    .then((user) => {
      console.log(user);
      setTimeout(() => {
        document.querySelector('.reg__loading').classList.remove('load__state');
      },500)
    })
    .catch((error) => {
      console.log(error);
      setTimeout(() => {
        document.querySelector('.reg__loading').classList.remove('load__state');
      },500)
      });
  }

  function login() {
    signInWithEmailAndPassword(auth, "amit@email.com", "test123")
      .then(({ user }) => {
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function logout() {
    signOut(auth);
    setUser({});
    console.log("out");
  }

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <nav>
          <figure className="logo__img--wrapper">
            <img src={Logo} className="logo__img"></img>
          </figure>
          <div className="nav__buttons">
            {user.email ? (
              <>
                <button onClick={logout} className="user__btn">
                  {user.email[0].toUpperCase()}
                </button>
              </>
            ) : (
              <>
                <button onClick={login} className="login__btn">
                  Login
                </button>
                <div className="reg__wrap">
                  <button onClick={register} className="reg__btn">
                    Register
                  </button>
                  <figure className="reg__loading">
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className="reg__loading--spinner"
                    />
                  </figure>
                </div>
              </>
            )}
          </div>
        </nav>
      )}
      <button onClick={createPost}>Create Post</button><br />
      <button onClick={getAllPosts}>Get All Posts</button><br />
      <button onClick={getPostById}>Get Post By Id</button><br />
      <button onClick={getPostByUid}>Get Post By Uid</button><br />
      <button onClick={updatePost}>Update Post</button><br />
      <button onClick={deletePost}>Delete Post</button><br />
    </div>
  );
}

export default App;
