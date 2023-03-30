const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
	event.preventDefault();
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;
	if (username === 'username' && password === 'password') {
		alert('Login successful!');
		window.location.href = "todo.html"; 
	} else {
		alert('Invalid username or password. Please try again.');
	}
}
