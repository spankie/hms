import m from "mithril";
import izitoast from "izitoast";
import localforage from "localforage";

var PatientModel = {
    NewPatient:{},
    Patient:{},
    Appointments:[],
    AppointmentsReports:[],
    Login: function() {
        return m.request({
            url: "api/patients.php?do=login",
            method: "POST",
            data: PatientModel.NewPatient
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
                    title: "Welcome",
                    message : resp.success.name,
                    image: resp.success.image || "../images/logo.jpeg",
                    position: "center"
                });
                localforage.setItem("patient", resp.success).then(function(resp) {
                    PatientModel.Patient = resp.success;
                    PatientModel.NewPatient = {};
                    RESU_TNEITAP = true;
                    m.route.set("/dashboard");
                }).catch(function(error) {
                    izitoast.error({
                        title: "Error",
                        message: "Unable to login.",
                        position: "topRight",
                        transitionIn: "bounceInDown"
                    })
                })
            }
        }).catch(function(error){
            izitoast.error({
                title: "Error",
                message: "Connection Error",
                position: "topRight",
                transitionIn: "bounceInDown"
            })
        })
    },
    Logout: function(){
        return m.request({
            url: "api/patients.php?do=logout",
            method: "GET"
        }).then(function(resp){
            localforage.removeItem("patient");
            RESU_TNEITAP = false;
        }).catch(function(error){
            izitoast.error({
                title: "Error",
                message: "Connection Error",
                position: "topRight",
                transitionIn: "bounceInDown"
            })
        })
    },
    UpdatePassword: function(){
        return m.request({
            url:"api/patients.php?do=updatepassword",
            method: "POST",
            data: PatientModel.Patient
        }).then(function(resp){
            if (resp.error) {
                izitoast.error({
                    title: "Error",
                    message: resp.error,
                    position: "topRight",
                    transitionIn: "bounceInDown"
                })
            } else if (resp.success) {
                izitoast.success({
                    title: "Welcome",
                    message : resp.success,
                    image: PatientModel.Patient.image || "../images/logo.jpeg",
                    position: "center"
                });
                PatientModel.Patient.OldPassword = "";
                PatientModel.Patient.NewPassword = "";
                PatientModel.Patient.ConfirmPassword = "";
                izitoast.hide(document.querySelector('.izitoast_loader'));
                m.redraw();
            }
        }).catch(function(error){
            console.log(error);
            izitoast.error({
                title: "Error",
                message: "Connection Error",
                position: "topRight",
                transitionIn: "bounceInDown"
            })
            izitoast.hide(document.querySelector('.izitoast_loader'));
        })
    },
    UpdateImage:function(data){
        return m.request({
            url:"api/patients.php?do=updateimage",
            method:"POST",
            data: data
        }).then(function(resp){
            // console.log(resp);
            if (resp.error) {
                izitoast.error({
                    title: "Error",
                    message: resp.error,
                    position: "topRight",
                    transitionIn: "bounceInDown"
                })
            } else if (resp.success) {
                izitoast.success({
                    title: "Welcome",
                    message : resp.success,
                    image: resp.image? "images/patients/"+resp.image: "../images/logo.jpeg",
                    position: "center"
                });
                PatientModel.Patient.image = resp.image;
                localforage.setItem("patient", PatientModel.Patient).then(function(){
                    izitoast.hide(document.querySelector('.izitoast_loader'));
                    m.redraw();
                }).catch(function(){
                    izitoast.hide(document.querySelector('.izitoast_loader'));
                    m.redraw();
                })
            }
        }).catch(function(error){
            izitoast.hide(document.querySelector('.izitoast_loader'));
            console.log(error);
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
            url: "api/patients.php?do=getappointments",
            method: "GET"
        }).then(function(resp){
            // console.log(resp);
            if (resp.error) {
                izitoast.error({
                    title: "Error",
                    message: resp.error,
                    position: "topRight",
                    transitionIn: "bounceInDown"
                })
            } else {
                PatientModel.Appointments = resp;
            }
        })
    },
    GetAllAppointmentsReports: function(){
        return m.request({
            url: "api/patients.php?do=getappointmentsreports",
            method: "GET"
        }).then(function(resp){
            // console.log(resp);
            if (resp.error) {
                izitoast.error({
                    title: "Error",
                    message: resp.error,
                    position: "topRight",
                    transitionIn: "bounceInDown"
                })
            } else {
                PatientModel.AppointmentsReports = resp;
            }
        })
    }
}

export default PatientModel;