import m from "mithril";
import BAppointmentsModel from "../models/bappointments";
import PatientsModel from "../models/patients";
import DoctorsModel from "../models/doctors";
import izitoast from "izitoast";
import flatpickr from "flatpickr";
import Loader from "../models/loader";

var BAppointments = {
    oncreate: function(vnode){
        BAppointmentsModel.GetAllBAppointments().then(function(){
            BAppointments.state.loading = false;
        }).catch(function(){
            BAppointments.state.loading = false;
        })
    },
    state:{
        loading: true
    },
    view: function(vnode) {
        return (
            <section>
                <div class="ba b--black-20 pa2 bg-white">
                    <div class="cf pb2 bb b--black-20 mb3">
                        <h3 class="mv1 dib">List of Booked Appointments</h3>
                        {/* <button class="pa2 bg-blue white ba b--transparent card-1 fr dib pointer" onclick={() => {
                            PatientsModel.GetAllPatients();
                            DoctorsModel.GetAllDoctors();
                            Appointments.state.page = "new";
                        }}>New Appointment</button> */}
                    </div>
                    <div class="" style="overflow: auto">
                    {BAppointments.state.loading?<div class="tc"><Loader/></div>:
                    BAppointmentsModel.Appointments.length?
                        <table class="f6 w-100 mw8 center" cellspacing="0">
                            <thead class="pa2 ">
                                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">S/N</th>
                                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Name</th>
                                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Email</th>
                                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Appt. Date</th>
                                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Date Created</th>
                                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Message</th>
                            </thead>
                            <tbody>
                                {BAppointmentsModel.Appointments.map(function(v, i) {
                                    return (
                                        <tr class="">
                                            <td class="pv3 pr3 bb b--black-20 tc">{i+1}</td>
                                            <td class="pv3 pr3 bb b--black-20 tc">{v.name}</td>
                                            <td class="pv3 pr3 bb b--black-20 tc">{v.email}</td>
                                            <td class="pv3 pr3 bb b--black-20 tc">{v.appointment_date}</td>
                                            <td class="pv3 pr3 bb b--black-20 tc">{v.date_created}</td>
                                            <td class="pv3 pr3 bb b--black-20 tc">{v.message}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    :"No appointments yet."}
                    </div>
                </div>
            </section>
        )
    }
}

export default BAppointments;