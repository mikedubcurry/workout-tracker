export function portal(node: HTMLElement) {
	let target: HTMLElement;

	function update() {
		target = document.querySelector('body');
		target.appendChild(node);
		node.hidden = false;
	}

	function destroy() {
		if (node.parentNode) {
			node.parentNode.removeChild(node);
		}
	}

	update();

	return {
		update,
		destroy
	};
}
