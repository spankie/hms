import m from "mithril";
import PatientModel from "../models/patient";
import Loader from "../models/loader";

var Dashboard = {
    oncreate: function(){
        PatientModel.GetAllAppointmentsReports().then(function(){
            Dashboard.state.loading = false;
        })
    },
    state:{
        loading: true
    },
    view : function(vnode) {
        return (
            <div class="ba b--black-20 pa2 bg-white">
                <h2 class="ph3-ns ph1">Dashboard</h2>
                <h2 class="blue tc underline"> Appointments Reports</h2>
                <div class="bt b--black-20 pt3">
                    <div class="" style="overflow: auto">
                        <table class="f6 w-100 mw8 center" cellspacing="0">
                            <thead class="pa2 ">
                                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tl">S/N</th>
                                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tl">Doctor</th>
                                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tl">Date</th>
                                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tl">Description</th>
                                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tl">Status</th>
                                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tl">Description of Visit</th>
                            </thead>
                            <tbody>
                            {Dashboard.state.loading?<div class="tc"><Loader/></div>:
                            PatientModel.AppointmentsReports.length?
                            PatientModel.AppointmentsReports.map(function(v,i){
                                return (
                                    <tr class="">
                                        <td class="pv3 pr3 bb b--black-20 tl">{i+1}</td>
                                        <td class="pv3 pr3 bb b--black-20 tl">{v.d_name}</td>
                                        <td class="pv3 pr3 bb b--black-20 tl">{v.appointment_time}</td>
                                        <td class="pv3 pr3 bb b--black-20 tl">{v.description}</td>
                                        <td class="pv3 pr3 bb b--black-20 tl">{v.status == "pending"?<span class='pa2 white card-2 bg-green'>PENDING</span>:v.status == "yes"?<span class='pa2 white card-2 bg-blue'>VISITED</span>:<span class='pa2 white card-2 bg-red'>NOT VISITED</span>}</td>
                                        <td class="pv3 pr3 bb b--black-20 tl">{v.status_desc}</td>
                                    </tr>
                                )
                            }):""}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;