import m from "mithril";
import AppointmentsModel from "../models/appointments";
import PatientsModel from "../models/patients";
import DoctorsModel from "../models/doctors";
import izitoast from "izitoast";
import flatpickr from "flatpickr";
import Loader from "../models/loader";
import Modal from "./modal";

var Appointments = {
    oncreate: function(vnode){

    },
    state: {
        page: "list",
        loading: true
    },
    view: function(vnode) {
        switch (Appointments.state.page) {
            case 'new':
                return (
                    <section oncreate={function(){
                        PatientsModel.GetAllPatients();
                        DoctorsModel.GetAllDoctors();
                    }}>
                        <div class="ba b--black-20 pa2 bg-white">
                            <div class="cf pb2 bb b--black-20 mb3">
                                <h3 class="mv1 dib">New Appointment</h3>
                                <button class="pa2 bg-blue white ba b--transparent card-1 fr dib pointer" onclick={() => {
                                    AppointmentsModel.GetAllAppointments();
                                    Appointments.state.page = "list";
                                }}>View Appointments</button>
                            </div>
                            <div class="pb3">
                                <div class="mb2">
                                    <p class="dib w4 tr mv0 mr2 pa2">Patient</p>
                                    <select class="pa2 ba b--black-10" onchange={m.withAttr("value", function(value){
                                        AppointmentsModel.NewAppointment.patient_id = value;
                                    })}>
                                        <option class="black-20" selected disabled>Select Patient</option>
                                        {PatientsModel.Patients.length?
                                        PatientsModel.Patients.map(function(v,i){
                                            return (
                                                <option class="black-50" value={v.id}>{v.name}</option>
                                            )
                                        }):""}
                                    </select>
                                </div>
                                <div class="mb2" oncreate={()=>{
                                    flatpickr("#appdatetime", {
                                        minDate: "today",
                                        enableTime: true,
                                        altFormat: "F j, Y"
                                    });
                                }}>
                                    <p class="dib w4 tr mv0 mr2 pa2">Date-Time</p>
                                    <input placeholder="Click to choose date and time" class="pa2 ba b--black-10" data-altFormat="F j, Y" id="appdatetime" oninput={m.withAttr("value", function(value){
                                        AppointmentsModel.NewAppointment.appointment_time = value;
                                    })}/>
                                </div>

                                <div class="mb2">
                                    <p class="dib w4 tr mv0 mr2 pa2">Description</p>
                                    <input class="pa2 ba b--black-10" type="text" oninput={m.withAttr("value", function(value){
                                        AppointmentsModel.NewAppointment.description = value;
                                    })}/>
                                </div>
                                <div class="mb2">
                                    <p class="dib w4 tr mv0 mr2 pa2">Doctor</p>
                                    <select class="pa2 ba b--black-10" onchange={m.withAttr("value", function(value){
                                        AppointmentsModel.NewAppointment.doctor_id = value;
                                    })}>
                                        <option class="black-20" selected disabled>Select Doctor</option>
                                        {DoctorsModel.Doctors.length?
                                        DoctorsModel.Doctors.map(function(v, i){
                                            return (
                                                <option class="black-50" value={v.id}>{v.name}</option>
                                            )
                                        }):""}
                                    </select>
                                </div>
                                <div class="w5 cf">
                                    <button class="pa2 bg-blue white ba b--transparent card-1 fr w4 pointer" onclick={() => {
                                        console.log(AppointmentsModel.NewAppointment);
                                        var a = AppointmentsModel.NewAppointment;
                                        if (!a.patient_id || !a.appointment_time || !a.description || !a.doctor_id) {
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
                                        AppointmentsModel.AddNewAppointment().then(function(){
                                            AppointmentsModel.GetAllAppointments();
                                            izitoast.hide(document.querySelector('.izitoast_loader'));
                                        });
                                    }}>Save</button>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            case 'list':
                var AppointmentDetails = {
                    view : function() {
                        return (
                            <div class="">
                                <h3 class="bb b--black-20 mv0 pv2">EDIT & SAVE</h3>
                                <div class="pa3-ns pa1">
                                    {/* PAppointment form  */}
                                    <div class="mb2">
                                        <p class="dib tl mv0">Patient</p>
                                        <p class="pa2 ba b--black-10" type="text">
                                            {AppointmentsModel.NewAppointment.p_name || "No Patient selected"}
                                        </p>
                                    </div>
                                    <div class="mb2">
                                        <p class="dib tl mv0">Doctor</p>
                                        <p class="pa2 ba b--black-10" type="text">
                                            {AppointmentsModel.NewAppointment.d_name}
                                        </p>
                                    </div>
                                    <div class="mb2">
                                        <p class="dib tl mv0">Time</p>
                                        <p class="pa2 ba b--black-10" type="text">
                                            {AppointmentsModel.NewAppointment.appointment_time}
                                        </p>
                                    </div>
                                    <div class="mb2">
                                        <p class="dib tl mv0">Description</p>
                                        <p class="pa2 ba b--black-10" type="text">
                                            {AppointmentsModel.NewAppointment.description}
                                        </p>
                                    </div>
                                    <div class="mb3">
                                        <p class="dib tl mv1 mr2">Did the patient attend?</p>
                                        <select class="pa2 ba b--blue bw1 " onchange={m.withAttr("value", function(value){
                                            AppointmentsModel.NewAppointment.status =  value;
                                        })}>
                                            <option selected={AppointmentsModel.NewAppointment.status == "pending"?"selected":""}
                                            disabled>Select Status</option>
                                            <option selected={AppointmentsModel.NewAppointment.status == "yes"?"selected":""}
                                            value="yes">Yes</option>
                                            <option selected={AppointmentsModel.NewAppointment.status == "no"?"selected":""}
                                            value="no">No</option>
                                        </select>
                                    </div>
                                    <div class="mb3">
                                        <p class="dib tl mv1">Description of appointment</p>
                                        <input class="pa2 ba b--blue bw1 w-100" type="text" value={AppointmentsModel.NewAppointment.status_desc}
                                        oninput={m.withAttr("value", function(value){
                                            AppointmentsModel.NewAppointment.status_desc = value;
                                        })}/>
                                    </div>
                                    <div class="">
                                        <button class="pa2 bg-blue white ba b--transparent card-1 dib pointer mr1" onclick={() => {
                                            if (AppointmentsModel.NewAppointment.status == "pending"){
                                                izitoast.error({
                                                    title: "Error",
                                                    message: "Did the patient attend?",
                                                    position: "topRight",
                                                    transitionIn: "bounceInDown"
                                                })
                                                return;
                                            }
                                            if (AppointmentsModel.NewAppointment.status_desc == ""){
                                                izitoast.error({
                                                    title: "Error",
                                                    message: "Please fill out the appointment status.",
                                                    position: "topRight",
                                                    transitionIn: "bounceInDown"
                                                })
                                                return;
                                            }
                                            izitoast.show({
                                                title: "Updating",
                                                message: "Please wait...",
                                                position: "center",
                                                class: "izitoast_loader",
                                                overlay: true,
                                                image: "../images/loader.svg",
                                                timeout: false
                                            })
                                            AppointmentsModel.UpdateStatus().then(function(){
                                                AppointmentsModel.GetAllAppointments();
                                                izitoast.hide(document.querySelector('.izitoast_loader'));
                                            })
                                        }}>Update</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                }
                return (
                    <section oncreate={function(){
                        AppointmentsModel.GetAllAppointments().then(function(){
                            Appointments.state.loading = false;
                        }).catch(function(){
                            Appointments.state.loading = false;
                        })
                    }}>
                        <div class="ba b--black-20 pa2 bg-white">
                            <div class="cf pb2 bb b--black-20 mb3">
                                <h3 class="mv1 dib">List of Appointments</h3>
                                <button class="pa2 bg-blue white ba b--transparent card-1 fr dib pointer" onclick={() => {
                                    PatientsModel.GetAllPatients();
                                    DoctorsModel.GetAllDoctors();
                                    Appointments.state.page = "new";
                                }}>New Appointment</button>
                            </div>
                            <div class="" style="overflow: auto">
                            {Appointments.state.loading?<div class="tc"><Loader/></div>:
                            AppointmentsModel.Appointments.length?
                                <table class="f6 w-100 mw8 center" cellspacing="0">
                                    <thead class="pa2 ">
                                        <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">S/N</th>
                                        <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Patient</th>
                                        <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Doctor</th>
                                        <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Date</th>
                                        <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Status</th>
                                        <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Edit</th>
                                    </thead>
                                    <tbody>
                                        {AppointmentsModel.Appointments.map(function(v, i){
                                            // if (!v.name){ return; }
                                            return (
                                                <tr class="">
                                                    <td class="pv3 pr3 bb b--black-20 tc">{i+1}</td>
                                                    <td class="pv3 pr3 bb b--black-20 tc">{v.p_name}</td>
                                                    <td class="pv3 pr3 bb b--black-20 tc">{v.d_name}</td>
                                                    <td class="pv3 pr3 bb b--black-20 tc">{v.appointment_time}</td>
                                                    <td class="pv3 pr3 bb b--black-20 tc">{v.status}</td>
                                                    <td class="pv3 pr3 bb b--black-20 tc">
                                                        <button class="pa2 bg-blue white ba b--transparent card-1 dib pointer mr1" onclick={() => {
                                                            console.log("edit: "+i);
                                                            AppointmentsModel.NewAppointment = v;
                                                            Modal.content = AppointmentDetails;
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
                                                                        AppointmentsModel.Delete(v.id).then(function(){
                                                                            AppointmentsModel.GetAllAppointments();
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
                            :"No appointments yet."}
                            <Modal/>
                            </div>
                        </div>
                    </section>
                )
        }
    }
}

export default Appointments;