import m from "mithril";
import izitoast from "izitoast";

var PatientsModel = {
    NewPatient:{image:""},
    Patients: [],
    GetAllPatients: function() {
        console.log("getting patients");
        return m.request({
            url: "api/patients.php?do=getall",
            method: "GET"
        }).then(function(resp){
            // console.log(resp);
            if (resp.error) {
                PatientsModel.Patients = [];
                console.log("Error: ", resp.error);
            } else {
                console.log(resp);
                PatientsModel.Patients = resp;
            }
        })
    },
    UpdatePatient: function(){
        return m.request({
            url:"api/patients.php?do=update",
            method:"POST",
            data: PatientsModel.NewPatient
        }).then(function(resp){
            console.log(resp);
            if (resp.error) {
                console.error(resp.error);
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
                PatientsModel.NewPatient = {}
            }
        }).catch(function(error){
            console.log(error);
            izitoast.error({
                title: "Error",
                message: "Connection Error",
                position: "topRight",
                transitionIn: "bounceInDown"
            })
        })
    },
    AddNewPatient: function() {
        return m.request({
            url: "api/patients.php?do=new",
            method: "POST",
            data: PatientsModel.NewPatient
        }).then(function(resp) {
            console.log(resp);
            if (resp.error) {
                console.error(resp.error);
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
                PatientsModel.NewPatient = {}
            }
        }).catch(function(){
            izitoast.error({
                title: "Error",
                message: "Connection Error",
                position: "topRight",
                transitionIn: "bounceInDown"
            })
        })
    },
    UpdateImage:(data) =>{
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
                    image: resp.image? "../patients/images/patients/"+resp.image: "../images/logo.jpeg",
                    position: "center"
                });
                PatientsModel.NewPatient.image = resp.image;
                m.redraw();
                izitoast.hide(document.querySelector('.izitoast_loader'));
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
    Delete: function(i){
        return m.request({
            url: "api/patients.php?do=delete",
            method: "POST",
            data: {"id": i}
        }).then(function(resp){
            console.log(resp);
            if (resp.error) {
                console.error(resp.error);
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
            }
        }).catch(function(){
            izitoast.error({
                title: "Error",
                message: "Connection Error",
                position: "topRight",
                transitionIn: "bounceInDown"
            })
        })
    }
}

export default PatientsModel;