import m from "mithril";

var PatientAuth = {
    view: function(vnode) {
        if (RESU_TNEITAP) {
            return (<section>{m.fragment(vnode.attrs, vnode.children)}</section>);
        } else {
            history.replaceState({home: "index"}, "Home", document.referrer);
            console.log(document.referrer);
            // m.route.prefix("patients");
            m.route.set("/login");
        }
    }
}

export default PatientAuth;