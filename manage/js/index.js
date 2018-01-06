import m from "mithril";

import Shell from "./container/shell.js";
import Patients from "./component/patients.js";
import Doctors from "./component/doctors.js";
import AdminAuth from "./container/adminauth";
import Login from "./component/login";
import Appointments from "./component/appointments";
import BAppointments from "./component/bappointments";

var root = document.getElementById("appContainer");

m.route(root, "/patients", {
    "/patients" : {
        view: function(vnode) {
            return m(AdminAuth, vnode.attrs, m(Shell, vnode.attrs, m(Patients, vnode.attrs)));
        }
    },
    "/doctors": {
        view: function(vnode){
            return m(AdminAuth, vnode.attrs, m(Shell, vnode.attrs, m(Doctors, vnode.attrs)))
        }
    },
    "/appointments": {
        view: function(vnode){
            return m(AdminAuth, vnode.attrs, m(Shell, vnode.attrs, m(Appointments, vnode.attrs)))
        }
    },
    "/b-appointments": {
        view: function(vnode){
            return m(AdminAuth, vnode.attrs, m(Shell, vnode.attrs, m(BAppointments, vnode.attrs)))
        }
    },
    "/settings": {
        view: function(vnode){
            return m(AdminAuth, vnode.attrs, m(Shell, vnode.attrs))
        }
    },
    "/login":{
        view: function(vnode){
            return m(Login, vnode.attrs);
        }
    },
    "/logout": {
        view: function(vnode){
            return m(AdminAuth, vnode.attrs, m(Shell, vnode.attrs))
        }
    }
})