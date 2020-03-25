import React, { Component } from "react";
import Posts from "./components/Posts/Posts.js";
import "./App.css";
import axios from "axios";
import Header from "./components/header/header";
import Inputs from "./components/inputs/Input.js";
import View from "./View.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      showPosts: true,
      searchTerm: "",
      password: "12345",
      passwordFlip: false
    };
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts = () => {
    axios
      .get("/api/posts")
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => {
        console.log("server err", err);
      });
  };

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value }, () => console.log(this.state.searchTerm));
  };

  createPost = (titleInput, imageInput, contentInput) => {
    axios
      .post("/api/posts", {
        title: titleInput,
        image: imageInput,
        content: contentInput
      })
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => console.log("err", err));
  };

  deletePost = id => {
    axios
      .delete(`/api/posts/${id}`)
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => console.log("not able to delete", err));
  };

  editPost = (title, image, content, id) => {
    axios
      .put(
        `/api/posts/${id}?newTitle=${title}&newImage=${image}&newContent=${content}`
      )
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => console.log("not able to delete", err));
  };

  navigate = () => {
    if (this.state.passwordFlip) {
      if (this.state.password === "12345") {
        this.setState({
          showPosts: !this.state.showPosts,
          passwordFlip: false 
        });
      } else {
        alert("password incorrect");
      }
    } else {
      this.setState({ passwordFlip: true });
    }
  };

  changeBtnName = () => {
    if (this.state.showPosts) {
      return "Admin";
    } else {
      return "User";
    }
  };

  setScrollbarTop() {
    window.scrollTo(0, 0);
  }

  render() {
    let filteredArr = this.state.posts.filter(el =>
      el.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );
    return (
      <div className="App">
        <Header
          navigate={this.navigate}
          changeBtnName={this.changeBtnName}
          passwordFlip={this.state.passwordFlip}
        />

        <div className="main-container">
          {this.state.showPosts ? (
            <View
              handleChange={this.handleChange}
              setScrollbarTop={this.setScrollbarTop}
              searchTerm={this.state.searchTerm}
              filteredArr={filteredArr}
              showPosts={this.state.showPosts}
            />
          ) : (
            <div>
              <Inputs
                createPost={this.createPost}
                resetInputs={this.resetInputs}
                handleChange={this.handleChange}
              />
              <div className="posts-box">
                <div className="posts">
                  <View
                    handleChange={this.handleChange}
                    setScrollbarTop={this.setScrollbarTop}
                    searchTerm={this.state.searchTerm}
                    filteredArr={filteredArr}
                    showPosts={this.state.showPosts}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
