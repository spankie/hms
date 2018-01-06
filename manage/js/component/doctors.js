import m from "mithril";
import izitoast from "izitoast";
import DoctorsModel from "../models/doctors.js";
import Loader from "../models/loader";

var Doctors = {
    oncreate: function(vnode) {
        DoctorsModel.GetAllDoctors().then(function(){
            Doctors.state.loading = false;
        }).catch(function(){
            Doctors.state.loading = false;
        })
    },
    state:{
        page:"list",
        loading: true
    },
    view: function(vnode) {
        switch (Doctors.state.page) {
            case "new":
                return (
                    <section class="">
                        <div class="ba b--black-20 pa2 bg-white">
                            <div class="cf pb2 bb b--black-20 mb3">
                                <h3 class="mv1 dib">New Doctor</h3>
                                <button class="pa2 bg-blue white ba b--transparent card-1 fr w4 dib pointer" onclick={() => {
                                    Doctors.state.page = "list";
                                }}>View List</button>
                            </div>
                            <div class="pb3">
                                <div class="mb2">
                                    <p class="dib w4 tr mv0 mr2 pa2">Name</p>
                                    <input class="pa2 ba b--black-10" type="text" oninput={m.withAttr("value", function(value){
                                        DoctorsModel.NewDoctor.name = value;
                                    })}/>
                                </div>
                                <div class="mb2">
                                    <p class="dib w4 tr mv0 mr2 pa2">Email</p>
                                    <input class="pa2 ba b--black-10" type="text" oninput={m.withAttr("value", function(value){
                                        DoctorsModel.NewDoctor.email = value;
                                    })}/>
                                </div>
                                <div class="mb2">
                                    <p class="dib w4 tr mv0 mr2 pa2">Password</p>
                                    <input class="pa2 ba b--black-10" type="password" oninput={m.withAttr("value", function(value){
                                        DoctorsModel.NewDoctor.password = value;
                                    })}/>
                                </div>
                                <div class="mb2">
                                    <p class="dib w4 tr mv0 mr2 pa2">Specialty</p>
                                    <input class="pa2 ba b--black-10" type="text" oninput={m.withAttr("value", function(value){
                                        DoctorsModel.NewDoctor.specialty = value;
                                    })}/>
                                </div>
                                <div class="mb2">
                                    <p class="dib w4 tr mv0 mr2 pa2">Department</p>
                                    <input class="pa2 ba b--black-10" type="text" oninput={m.withAttr("value", function(value){
                                        DoctorsModel.NewDoctor.department = value;
                                    })}/>
                                </div>
                                <div class="mb2">
                                    <p class="dib w4 tr mv0 mr2 pa2">Sex</p>
                                    <select class="pa2 ba b--black-10" onchange={m.withAttr("value", function(value){
                                        DoctorsModel.NewDoctor.sex = value;
                                    })}>
                                        <option class="black-20" selected disabled>Select Gender</option>
                                        <option class="black-20" value="male">Male</option>
                                        <option class="black-20" value="female">Female</option>
                                    </select>
                                </div>
                                <div class="w5 cf">
                                    <button class="pa2 bg-blue white ba b--transparent card-1 fr w4 pointer" onclick={() => {
                                        console.log(DoctorsModel.NewDoctor);
                                        var d = DoctorsModel.NewDoctor;
                                        if (!d.email || !d.name || !d.sex || !d.specialty || !d.password || !d.department) {
                                            izitoast.error({
                                                title: "Error",
                                                message: "Please fill out all fields.",
                                                position: "topRight",
                                                transitionIn: "bounceInDown"
                                            })
                                            return;
                                        }
                                        izitoast.show({
                                            title: "SAVING",
                                            message: "Please wait...",
                                            position: "center",
                                            class: "izitoast_loader",
                                            overlay: true,
                                            image: "../images/loader.svg",
                                            timeout: false
                                        })
                                        DoctorsModel.AddNewDoctor().then(function(){
                                            DoctorsModel.GetAllDoctors();
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
                return (
                    <div class="ba b--black-20 pa2 bg-white">
                        <div class="cf pb2 bb b--black-20 mb3">
                            <h3 class="mv1 dib">List of Doctors</h3>
                            <button class="pa2 bg-blue white ba b--transparent card-1 fr w4 dib pointer" onclick={() => {
                                Doctors.state.page = "new";
                            }}>New Doctor</button>
                        </div>
                        <div class="" style="overflow: auto">
                        {Doctors.state.loading?<div class="tc"><Loader/></div>:
                        DoctorsModel.Doctors.length?
                            <table class="f6 w-100 mw8 center" cellspacing="0">
                                <thead class="pa2 ">
                                    <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">S/N</th>
                                    <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Name</th>
                                    <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Email</th>
                                    <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Specialty</th>
                                    <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Department</th>
                                </thead>
                                <tbody class="lh-copy">
                                {DoctorsModel.Doctors.map(function(v, i){
                                    return (
                                        <tr class="">
                                            <td class="pv3 pr3 bb b--black-20 tc">{i+1}</td>
                                            <td class="pv3 pr3 bb b--black-20 tc">{v.name}</td>
                                            <td class="pv3 pr3 bb b--black-20 tc">{v.email}</td>
                                            <td class="pv3 pr3 bb b--black-20 tc">{v.specialty}</td>
                                            <td class="pv3 pr3 bb b--black-20 tc">{v.department}</td>
                                        </tr>
                                    )
                                })}
                                    
                                </tbody>
                            </table>
                            :"No Doctors at the moment."}
                        </div>
                    </div>
                )
                break;
            default:
                break;
        }    
    }
}

export default Doctors;