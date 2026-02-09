document.addEventListener('click', function (e) {
	if (e.target.classList.contains('copy-link')) {
		const link = e.target.getAttribute('data-link');
		navigator.clipboard.writeText(link);
		e.target.innerText = 'Copied!';
	}
});

document.addEventListener('DOMContentLoaded', function () {
	const backButton = document.querySelector('.back-button');

	if (backButton) {
		backButton.addEventListener('click', function () {
			if (window.history.length > 1) {
				window.history.back();
			} else {
				window.location.href = '/';
			}
		});
	}
});