import m from "mithril";
import PatientModel from "../models/patient";
import Loader from "../models/loader";

var Appointments = {
    oncreate:function(){
        PatientModel.GetAllAppointments().then(function(){
            Appointments.state.loading = false;
        })
    },
    state: {
        loading: true
    },
    view : function(vnode) {
        return (
            <div class="">
                <section>
                        <div class="ba b--black-20 pa3-ns pa1 bg-white">
                            <div class="cf pb2 bb b--black-20 mb3">
                                <h3 class="blue">Hi, {PatientModel.Patient?PatientModel.Patient.name:"Hello"}</h3>
                                <h3 class="mv1 dib">Here is a list of your Pending Appointments</h3>
                                {/* <button class="pa2 bg-blue white ba b--transparent card-1 fr dib pointer" onclick={() => {
                                }}>New Appointment</button> */}
                            </div>
                            <div class="" style="overflow: auto">
                            {Appointments.state.loading?<div class="tc"><Loader/></div>:
                            PatientModel.Appointments.length?
                                <table class="f6 w-100 mw8 center" cellspacing="0">
                                    <thead class="pa2 ">
                                        <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tl">S/N</th>
                                        <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tl">Doctor</th>
                                        <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tl">Date</th>
                                        <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tl">Description</th>
                                        <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tl">Status</th>
                                    </thead>
                                    <tbody>
                                        {PatientModel.Appointments.map(function(v, i){
                                            if (v.status != "pending") {
                                                return;
                                            }
                                            return (
                                                <tr class="">
                                                    <td class="pv3 pr3 bb b--black-20 tl">{i+1}</td>
                                                    <td class="pv3 pr3 bb b--black-20 tl">{v.d_name}</td>
                                                    <td class="pv3 pr3 bb b--black-20 tl">{v.appointment_time}</td>
                                                    <td class="pv3 pr3 bb b--black-20 tl">{v.description}</td>
                                                    <td class="pv3 pr3 bb b--black-20 tl"><span class='pa2 white card-2 bg-green'>PENDING</span>
                                                    {/* {v.status} */}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            :"No appointments yet."}
                            </div>
                        </div>
                    </section>
            </div>
        )
    }
}

export default Appointments;