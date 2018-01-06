import m from "mithril";

import Shell from "./container/shell.js";
import Dashboard from "./component/dashboard.js";
import Appointments from "./component/appointments.js";
import Settings from "./component/settings.js";
import Login from "./component/login";
import PatientAuth from "./container/patientauth";

var root = document.getElementById("appContainer");

m.route(root, "/appointments", {
    "/dashboard" : {
        view: function(vnode) {
            return m(PatientAuth, vnode.attrs, m(Shell, vnode.attrs, m(Dashboard, vnode.attrs)));
        }
    },
    "/appointments": {
        view: function(vnode){
            return m(PatientAuth, vnode.attrs, m(Shell, vnode.attrs, m(Appointments, vnode.attrs)));
        }
    },
    // "/settings": {
    //     view: function(vnode){
    //         return m(PatientAuth, vnode.attrs, m(Shell, vnode.attrs, m(Settings, vnode.attrs)));
    //     }
    // },
    "/login": {
        view: function(vnode){
            return m(Login, vnode.attrs);
        }
    }
})