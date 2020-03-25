import React, { Component } from "react";
import Posts from "./components/Posts/Posts.js";
import "./View.css";

const View = props => (
  <div>
    <input
      name="searchTerm"
      value={props.searchTerm}
      onChange={props.handleChange}
      className={props.showPosts ? "search-box" : "admin-search-box"}
      placeholder="Search"
    ></input>
    <div className="top-stickybox">
      <button onClick={() => props.setScrollbarTop()} className="top">
        Top
      </button>
    </div>
    <div className="posts">
      {props.filteredArr.map(post => (
        <Posts key={post.id} id={post.id} post={post} />
      ))}
    </div>
  </div>
);

export default View;
