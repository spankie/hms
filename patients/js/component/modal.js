import m from "mithril";

var Modal = {
	open: false,
	wide:false,
	close: function() {
		Modal.open = false;
	},
	content: {},
	view: function(vnode) {
		return (
			<div
				class="fixed left-0 top-0 w-100 h-100 bg-black-80 overflow-auto pa3-ns db "
				style="z-index: 4"
			>
				<div class=" absolute z-3 right-0 top-0-ns pa3-ns">
					<p class="f1 mv0 pa1 gray white-ns pointer" onclick={Modal.close}>
						×
					</p>
				</div>
				<div class={"relative pa3-ns pa1 bg-white "+(Modal.wide?" w-90-m w-80-l":" w-70-m w-60-l")} style="margin: auto;">
					{Modal.content.view ? <Modal.content /> : ""}
				</div>
			</div>
		);
	}
};

export default Modal;