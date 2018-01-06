import m from "mithril";
import PatientModel from "../models/patient";
import izitoast from "izitoast";

var Settings = {
    view : function(vnode) {
        return (
            <div class="ba b--black-20 pa2 bg-white tc tl-ns">
                
                <div class="pa3-ns pa1">
                    <h2 class="mv1 pb2">Change Password</h2>
                    <input type="password" class="pa2 w5 ma1" placeholder="Old Password" 
                    value={PatientModel.Patient.OldPassword}
                    oninput={m.withAttr("value", function(value){
                        PatientModel.Patient.OldPassword = value;
                    })}/>
                    <input type="password" class="pa2 w5 ma1" placeholder="New Password" 
                    value={PatientModel.Patient.NewPassword}
                    oninput={m.withAttr("value", function(value){
                        PatientModel.Patient.NewPassword = value;
                    })}/>
                    <input type="password" class="pa2 w5 ma1" placeholder="Confirm Password" 
                    value={PatientModel.Patient.ConfirmPassword}
                    oninput={m.withAttr("value", function(value){
                        PatientModel.Patient.ConfirmPassword = value;
                    })}/>
                    <button class="w5 pa2 ma1 ba b--transparent bg-blue white card-1 tc pointer"
                    onclick={()=>{
                        var p = PatientModel.Patient;
                        if (!p.OldPassword || !p.NewPassword || !p.ConfirmPassword){
                            izitoast.error({
                                title: "Error",
                                message: "Please fill out all fields.",
                                position: "topRight",
                                transitionIn: "bounceInDown"
                            })
                            return;
                        }
                        if (p.NewPassword != p.ConfirmPassword) {
                            izitoast.error({
                                title: "Error",
                                message: "Your new password does not match.",
                                position: "topRight",
                                transitionIn: "bounceInDown"
                            })
                            return;
                        }
                        izitoast.show({
                            title: "UPLOADING",
                            message: "Please wait...",
                            position: "center",
                            class: "izitoast_loader",
                            overlay: true,
                            image: "../images/loader.svg",
                            timeout: false
                        })
                        PatientModel.UpdatePassword()
                    }}>
                        Change Password
                    </button>
                </div>
            </div>
        )
    }
}

export default Settings;