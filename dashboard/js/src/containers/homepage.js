import m from "mithril";

var HomePage = {
    view: function(vnode){
        return (
            <div class="pa4 white" style="background: white url('img/bluenurse.jpeg') top left no-repeat; background-size: cover;">
                <h2 class="">Adele's HMS</h2>
                <p class="">Say something nice about Adele's Hospital management system...</p>
                <ul>
                    <li>Patients login</li>
                    <li>Doctors Login</li>
                    <li>Patients dashboard</li>
                    <li>Doctors Dashboard</li>
                    <li></li>
                </ul>
                <button class="pa2 ma2 pointer bg-white blue shadow-2 grow ba b--transparent br2">Patient's Login</button>
                <button class="pa2 ma2 pointer bg-white blue shadow-2 grow ba b--transparent br2">Doctor's Login</button>
            </div>
        )
    }
}

export default HomePage;