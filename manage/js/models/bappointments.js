import m from "mithril";
import izitoast from "izitoast";

var BAppointmentsModel = {
    Appointments: [],
    GetAllBAppointments: function() {
        return m.request({
            url:"api/appointments.php?do=getallbapps",
            method: "GET"
        }).then(function(resp){
            if (resp.error){
                console.error(resp.error);
            } else {
                console.log(resp);
                BAppointmentsModel.Appointments = resp;
            }
        })
    }
}

export default BAppointmentsModel;