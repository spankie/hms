import m from "mithril";
import izitoast from "izitoast";
import localforage from  "localforage";

var AdminModel = {
    Admin:{},
    NewAdmin:{},
    Login: function() {
        return m.request({
            url : "api/admin.php?do=login",
            method: "POST",
            data: AdminModel.NewAdmin
        }).then(function(resp) {
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
                    image:"../images/logo.jpeg",
                    position: "center"
                });
                localforage.setItem("admin", resp.success).then(function(resp){
                    AdminModel.Admin = resp.success;
                    AdminModel.NewAdmin = {};
                    RESU_NIMDA = true;
                    m.route.set("/patients");
                }).catch(function(error){
                    izitoast.error({
                        title: "Error",
                        message: "Unable to login.",
                        position: "topRight",
                        transitionIn: "bounceInDown"
                    })
                })
                
            }
            console.log(resp);
        })
    },
    Logout: function() {
        return m.request({
            url:"api/admin.php?do=logout",
            method:"GET"
        }).then(function(resp){
            RESU_NIMDA = false;
        })
    }
}

export default AdminModel;