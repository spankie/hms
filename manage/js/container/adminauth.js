import m from "mithril";
import AdminModel from "../models/admin.js";

var AdminAuth = {
    view: function(vnode) {
        if (RESU_NIMDA) {
            console.log(RESU_NIMDA);
            return (
                <div class="">
                    {m.fragment(vnode.attrs, vnode.children)}
                </div>
            )
        } else {
            history.replaceState({home: "index"}, "Home", document.referrer);
            m.route.set("/login");
        }
    }
}

export default AdminAuth;