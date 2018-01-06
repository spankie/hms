import m from "mithril";
import izitoast from "izitoast";
import PatientsModel from "../models/patients.js";
import Modal from "./modal";
import Loader from "../models/loader";

// var
var PatientForm = {
    view : function(vnode){
        return (
        <div class="tl-ns tc">
            <div class="mb2">
                <p class="dib w4 tr-ns tc mv0 mr2 pa2">Name</p>
                <input class="pa2 ba b--black-10" type="text"
                value={PatientsModel.NewPatient.name}
                oninput={m.withAttr("value", function(value){
                    PatientsModel.NewPatient.name = value;
                })}/>
            </div>
            <div class="mb2">
                <p class="dib w4 tr-ns tc mv0 mr2 pa2">Phone</p>
                <input class="pa2 ba b--black-10" type="text"
                value={PatientsModel.NewPatient.phone}
                oninput={m.withAttr("value", function(value){
                    PatientsModel.NewPatient.phone = value;
                })}/>
            </div>
            <div class="mb2">
                <p class="dib w4 tr-ns tc mv0 mr2 pa2">Email</p>
                <input class="pa2 ba b--black-10" type="text"
                value={PatientsModel.NewPatient.email}
                oninput={m.withAttr("value", function(value){
                    PatientsModel.NewPatient.email = value;
                })}/>
            </div>
            <div class="mb2">
                <p class="dib w4 tr-ns tc mv0 mr2 pa2">Password</p>
                <input class="pa2 ba b--black-10" id="myPassword" type="password"
                value={PatientsModel.NewPatient.password}
                oninput={m.withAttr("value", function(value){
                    PatientsModel.NewPatient.password = value;
                })}/><span class="pa2 bg-light-gray black card-1 pointer"
                onclick={()=>{
                    var pp = document.getElementById('myPassword');
                    if (pp.type == "password") {
                        pp.type = "text";
                    } else {
                        pp.type = "password";
                    }
                }}>**</span>
            </div>
            <div class="mb2">
                <p class="dib w4 tr-ns tc mv0 mr2 pa2">Country</p>
                <input class="pa2 ba b--black-10" type="text"
                value={PatientsModel.NewPatient.country}
                oninput={m.withAttr("value", function(value){
                    PatientsModel.NewPatient.country = value;
                })}/>
            </div>
            <div class="mb2">
                <p class="dib w4 tr-ns tc mv0 mr2 pa2">State</p>
                <input class="pa2 ba b--black-10" type="text"
                value={PatientsModel.NewPatient.state}
                oninput={m.withAttr("value", function(value){
                    PatientsModel.NewPatient.state = value;
                })}/>
            </div>
            <div class="mb2">
                <p class="dib w4 tr-ns tc mv0 mr2 pa2">City</p>
                <input class="pa2 ba b--black-10" type="text"
                value={PatientsModel.NewPatient.city}
                oninput={m.withAttr("value", function(value){
                    PatientsModel.NewPatient.city = value;
                })}/>
            </div>
            <div class="mb2">
                <p class="dib w4 tr-ns tc mv0 mr2 pa2">Illness:</p>
                <input class="pa2 ba b--black-10" type="text"
                value={PatientsModel.NewPatient.illness}
                oninput={m.withAttr("value", function(value){
                    PatientsModel.NewPatient.illness = value;
                })}/>
            </div>
            <div class="mb2">
                <p class="dib w4 tr-ns tc mv0 mr2 pa2">Brought By:</p>
                <input class="pa2 ba b--black-10" type="text"
                value={PatientsModel.NewPatient.accomp_by_name}
                oninput={m.withAttr("value", function(value){
                    PatientsModel.NewPatient.accomp_by_name = value;
                })}/>
            </div>
            <div class="mb2">
                <p class="dib w4 tr-ns tc mv0 mr2 pa2">Phone of Friend</p>
                <input class="pa2 ba b--black-10" type="text"
                value={PatientsModel.NewPatient.accomp_by_phone}
                oninput={m.withAttr("value", function(value){
                    PatientsModel.NewPatient.accomp_by_phone = value;
                })}/>
            </div>
            <div class="mb2">
                <p class="dib w4 tr-ns tc mv0 mr2 pa2">Sex</p>
                <select class="pa2 ba b--black-10" onchange={m.withAttr("value", function(value){
                    PatientsModel.NewPatient.sex = value;
                })}>
                    <option class="black-50" selected={PatientsModel.NewPatient.sex?"":"selected"} disabled>Select Gender</option>
                    <option class="black-50" value="male" selected={PatientsModel.NewPatient.sex == "male"?"selected":""}>Male</option>
                    <option class="black-50" value="female" selected={PatientsModel.NewPatient.sex == "female"?"selected":""}>Female</option>
                </select>
            </div>
        </div>
        )
    }
}
var Patients = {
    oncreate: function(vnode) {
        PatientsModel.GetAllPatients().then(()=>{
            Patients.state.loading = false;
        }).catch(()=>{
            Patients.state.loading = false;
        })
    },
    state:{
        page:"list",
        loading: true
    },
    view : function(vnode) {
        switch (Patients.state.page) {
            case "new":
                return (
                    <section class="">
                        <div class="ba b--black-20 pa2 bg-white">
                            <div class="cf pb2 bb b--black-20 mb3">
                                <h3 class="mv1 dib">New Patient</h3>
                                <button class="pa2 bg-blue white ba b--transparent card-1 fr w4 dib pointer" onclick={() => {
                                    Patients.state.page = "list";
                                }}>View List</button>
                            </div>
                            <div class="pb3">
                                <PatientForm/>
                                <div class="w5 cf">
                                    <button class="pa2 bg-blue white ba b--transparent card-1 fr w4 pointer" onclick={() => {
                                        console.log(PatientsModel.NewPatient);
                                        var p = PatientsModel.NewPatient;
                                        if (!p.email || !p.name || !p.phone || !p.sex || !p.country || !p.password || !p.state || !p.city
                                            || !p.illness || !p.accomp_by_name || !p.accomp_by_phone) {
                                            izitoast.error({
                                                title: "Error",
                                                message: "Please fill out all fields.",
                                                position: "topRight",
                                                transitionIn: "bounceInDown"
                                            })
                                            return;
                                        }
                                        izitoast.show({
                                            title: "NEW PATIENT",
                                            message: "Please wait...",
                                            position: "center",
                                            class: "izitoast_loader",
                                            overlay: true,
                                            image: "../images/loader.svg",
                                            timeout: false
                                        })
                                        PatientsModel.AddNewPatient().then(function(){
                                            PatientsModel.GetAllPatients();
                                            izitoast.hide(document.querySelector('.izitoast_loader'));
                                        });
                                    }}>Save</button>
                                </div>
                            </div>
                        </div>
                    </section>
                )
                break;
            case "list":
                var PatientDetails = {
                    ChangeImage: function(e){
                        console.log(e);

                        var data = new FormData();
                        data.append("image", e.target.files[0]);
                        data.append("email", PatientsModel.NewPatient.email);
                        PatientsModel.UpdateImage(data);
                    },
                    view: function(vnode){
                        return (
                            <div class="">
                                <h3 class="bb b--black-20 mv0">EDIT & SAVE</h3>
                                <div class="pa3-ns pa1">
                                    <div class="pa3-ns pa1 tc bb b--black-20 mb3">
                                        <h2 class="mv0 pb2">Change Photo</h2>
                                        <div class="dib w5 pa1 card-2 ba b--black-10">
                                            <img class="" id="preview" src={PatientsModel.NewPatient.image? "../patients/images/patients/"+PatientsModel.NewPatient.image: "../images/alt1.png"}/>
                                        </div>
                                        <br/>
                                        <label for="image" class="w5 dib pa2 bg-blue white card-1 border-box tc pointer">
                                            Change Photo
                                        </label>
                                        <input type="file" id="image" class="dn" onchange={(e)=>{
                                            izitoast.show({
                                                title: "UPLOADING",
                                                message: "Please wait...",
                                                position: "center",
                                                class: "izitoast_loader",
                                                overlay: true,
                                                image: "../images/loader.svg",
                                                timeout: false
                                            })
                                            PatientDetails.ChangeImage(e);
                                        }}/>
                                    </div>
                                    <PatientForm/>
                                    <div class="w5 cf">
                                        <button class="pa2 bg-blue white ba b--transparent card-1 fr w4 pointer" onclick={() => {
                                            console.log(PatientsModel.NewPatient);
                                            var p = PatientsModel.NewPatient;
                                            if (!p.email || !p.name || !p.phone || !p.sex || !p.country || !p.password || !p.state || !p.city
                                                || !p.illness || !p.accomp_by_name || !p.accomp_by_phone) {
                                                izitoast.error({
                                                    title: "Error",
                                                    message: "Please fill out all fields.",
                                                    position: "topRight",
                                                    transitionIn: "bounceInDown"
                                                })
                                                return;
                                            }
                                            izitoast.show({
                                                title: "UPDATING",
                                                message: "Please wait...",
                                                position: "center",
                                                class: "izitoast_loader",
                                                overlay: true,
                                                image: "../images/loader.svg",
                                                timeout: false
                                            })
                                            PatientsModel.UpdatePatient().then(function() {
                                                PatientsModel.GetAllPatients();
                                                izitoast.hide(document.querySelector('.izitoast_loader'));
                                                Modal.close();
                                            });
                                        }}>Save</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                }
                return (
                    <div class="ba b--black-20 pa2 bg-white">
                        <div class="cf pb2 bb b--black-20 mb3">
                            <h3 class="mv1 dib">List of patients</h3>
                            <button class="pa2 bg-blue white ba b--transparent card-1 fr w4 dib pointer" onclick={() => {
                                PatientsModel.NewPatient = {};
                                Patients.state.page = "new";
                            }}>New Patient</button>
                        </div>
                        {Patients.state.loading?<div class="tc"><Loader/></div>:
                        PatientsModel.Patients.length?
                        <div class="" style="overflow: auto">
                            <table class="f6 w-100 mw8 center" cellspacing="0">
                                <thead class="pa2 ">
                                    <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tl">S/N</th>
                                    <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tl">Name</th>
                                    <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tl">Email</th>
                                    <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tl">Phone</th>
                                    <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tl">Edit</th>
                                </thead>
                                <tbody class="lh-copy">
                                {PatientsModel.Patients.map(function(v, i){
                                    return (
                                        <tr class="">
                                            <td class="pv3 pr3 bb b--black-20 tl">{i+1}</td>
                                            <td class="pv3 pr3 bb b--black-20 tl">{v.name}</td>
                                            <td class="pv3 pr3 bb b--black-20 tl">{v.email}</td>
                                            <td class="pv3 pr3 bb b--black-20 tl">{v.phone}</td>
                                            <td class="pv3 pr3 bb b--black-20 tl">
                                                <button class="pa2 bg-blue white ba b--transparent card-1 dib pointer mr1" onclick={() => {
                                                    console.log("edit: "+i);
                                                    PatientsModel.NewPatient = v;
                                                    Modal.content = PatientDetails;
                                                    Modal.open();
                                                    m.redraw();
                                                }}>View / Edit</button>
                                                <button class="pa2 bg-light-red white ba b--transparent card-1 dib pointer" onclick={() => {
                                                    // ask if you really want to delete...
                                                    izitoast.show({
                                                        theme: 'dark',
                                                        icon: 'icon-person',
                                                        title: 'Delete?',
                                                        message: 'Are you sure you want to delete this?',
                                                        position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
                                                        progressBarColor: 'rgb(0, 255, 184)',
                                                        // overlay: true,
                                                        buttons: [
                                                            ['<button>Yes</button>', function (instance, toast) {
                                                                instance.hide(toast, { transitionOut: 'fadeOut' }, 'button');
                                                                izitoast.show({
                                                                    title: "DELETING",
                                                                    message: "Please wait...",
                                                                    position: "center",
                                                                    class: "izitoast_loader",
                                                                    overlay: true,
                                                                    image: "../images/loader.svg",
                                                                    timeout: false
                                                                })
                                                                PatientsModel.Delete(v.id).then(function(){
                                                                    PatientsModel.GetAllPatients();
                                                                    // close the loader...
                                                                    izitoast.hide(document.querySelector('.izitoast_loader'));
                                                                })
                                                            }],
                                                            ['<button>No</button>', function (instance, toast) {
                                                                instance.hide(toast, { transitionOut: 'fadeOut' }, 'button');
                                                            }, true] // true to focus
                                                        ],
                                                        // onOpening: function(instance, toast){
                                                        //     console.info('callback abriu!');
                                                        // },
                                                        // onClosing: function(instance, toast, closedBy){
                                                        //     console.info('closedBy: ' + closedBy); // tells if it was closed by 'drag' or 'button'
                                                        // }
                                                    });
                                                    
                                                }}>×</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                                    
                                </tbody>
                            </table>
                            
                        </div>
                            :"No Patients at the moment."}
                            <Modal/>
                    </div>
                )
            default:
                break;
        }
    }
}

export default Patients;