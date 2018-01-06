import m from "mithril";
import izitoast from "izitoast";

var DoctorsModel = {
    NewDoctor:{},
    Doctors:[],
    GetAllDoctors:function() {
        console.log("getting doctors");
        return m.request({
            url: "api/doctors.php?do=getall",
            method: "GET"
        }).then(function(resp){
            console.log(resp);
            if (resp.error){
                console.error(resp.error);
            } else {
                console.log(resp);
                DoctorsModel.Doctors = resp;
            }
        })
    },
    AddNewDoctor: ()=>{
        return m.request({
            method: "POST",
            url:"api/doctors.php?do=new",
            data: DoctorsModel.NewDoctor
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
                DoctorsModel.NewDoctor = {};
            }
        })
    }
}

export default DoctorsModel;