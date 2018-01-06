import m from "mithril";
import izitoast from "izitoast";

var AppointmentsModel = {
    Appointments: [],
    NewAppointment: {},
    AddNewAppointment : function(){
        return m.request({
            url:"api/appointments.php?do=new",
            method: "POST",
            data: AppointmentsModel.NewAppointment
        }).then(function(resp){
            if (resp.error) {
                izitoast.error({
                    title: "Error",
                    message: resp.error,
                    position: "topRight",
                    transitionIn: "bounceInDown"
                })
            } else if (resp.success) {
                console.log(resp.success);
                izitoast.success({
                    title: "Success",
                    message: resp.success,
                    position: "center"
                });
                AppointmentsModel.NewAppointment = {};
            }
        }).catch(function(err) {
            izitoast.error({
                title: "Error",
                message: "Connection Error",
                position: "topRight",
                transitionIn: "bounceInDown"
            })
        })
    },
    UpdateStatus: function(){
        return m.request({
            url: "api/appointments.php?do=updatestatus",
            method: "POST",
            data: AppointmentsModel.NewAppointment
        }).then(function(resp){
            if (resp.error) {
                izitoast.error({
                    title: "Error",
                    message: resp.error,
                    position: "topRight",
                    transitionIn: "bounceInDown"
                })
            } else if (resp.success) {
                console.log(resp.success);
                izitoast.success({
                    title: "Success",
                    message: resp.success,
                    position: "center"
                });
                AppointmentsModel.NewAppointment = {};
            }
        }).catch(function(err) {
            izitoast.error({
                title: "Error",
                message: "Connection Error",
                position: "topRight",
                transitionIn: "bounceInDown"
            })
        })
    },
    Delete: (i) => {
        return m.request({
            url: "api/appointments.php?do=delete",
            method: "POST",
            data: {id: i}
        }).then(function(resp){
            if (resp.error) {
                izitoast.error({
                    title: "Error",
                    message: resp.error,
                    position: "topRight",
                    transitionIn: "bounceInDown"
                })
            } else if (resp.success) {
                console.log(resp.success);
                izitoast.success({
                    title: "Success",
                    message: resp.success,
                    position: "center"
                });
                AppointmentsModel.NewAppointment = {};
            }
        }).catch(function(err) {
            izitoast.error({
                title: "Error",
                message: "Connection Error",
                position: "topRight",
                transitionIn: "bounceInDown"
            })
        })
    },
    GetAllAppointments: function() {
        return m.request({
            url:"api/appointments.php?do=getall",
            method: "GET"
        }).then(function(resp){
            if (resp.error){
                console.error(resp.error);
            } else {
                console.log(resp);
                AppointmentsModel.Appointments = resp;
            }
        })
    }
}

export default AppointmentsModel;