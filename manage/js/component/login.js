import m from "mithril";
import izitoast from "izitoast";
import AdminModel from "../models/admin";

var Login = {
    view: function(vnode){
        if (RESU_NIMDA) {
            m.route.set('/patients');
        } else {
            return (
                <div class="cover pa4-ns pa2 tc vh-100" style="background: white url('../images/b.jpg') center no-repeat">
                    <div class="tc pb2"><img class="w4-ns h4-ns w3 h3" src="../images/logo.png"/></div>
                    <div class="bg-black-40 pa3-ns pa2 dib v-mid card-2">
                        <div class="ba b--white-20 ph2 pv4">
                            <h2 class="white mt0">ADMIN - LOGIN</h2>
                            <div class="mb2">
                                <p class="dib mv0 pa2 w4 mr2 tr-ns tc blue">Username</p>
                                <input class="pa2 ba b--black-30 bg-white-30 blue" type="text" oninput={m.withAttr("value", function(value){
                                    AdminModel.NewAdmin.username = value;
                                })}/>
                            </div>
                            <div class="mb2">
                                <p class="dib mv0 pa2 w4 mr2 tr-ns tc blue">Password</p>
                                <input class="pa2 ba b--black-30  bg-white-30 blue" type="password" oninput={m.withAttr("value", function(value){
                                    AdminModel.NewAdmin.password = value;
                                })}/>
                            </div>
                            <button class="w4 mt2 pa2 bg-blue ba b--transparent card-1 white pointer" onclick={()=>{
                                izitoast.show({
                                    title: "LOGIN",
                                    message: "Please wait...",
                                    position: "center",
                                    class: "izitoast_loader",
                                    overlay: true,
                                    image: "../images/loader.svg",
                                    timeout: false
                                })
                                AdminModel.Login().then(function(){
                                    izitoast.hide(document.querySelector('.izitoast_loader'));
                                })///.catch(function())
                            }}>LOGIN</button>
                        </div>
                    </div>
                    <p class="white f6">&copy; 2017 Blessed Barachel Hospital. All rights reserved.</p>
                </div>
            )
        }
    }
}

export default Login;