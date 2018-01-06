import m from "mithril";
import HomePage from "./containers/homepage.js";
import Login from "./containers/login.js";

var root = document.getElementById("appContainer");

m.route(root, "/", {
    "/": HomePage,
    "/login": Login,
})