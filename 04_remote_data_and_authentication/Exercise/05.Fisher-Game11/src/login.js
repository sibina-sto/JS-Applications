if (sessionStorage.getItem('userdata')) {
    document.getElementById('guest').style.display = 'none';
} else {
    document.getElementById('user').style.display = 'none';
}

document.getElementById('login-form').addEventListener('submit', async ev => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const res = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (res.ok == false) {
            throw new Error(data.message);
        }
        const userData = {
            email: data.email,
            id: data._id,
            accessToken: data.accessToken,
        };
        sessionStorage.setItem('userdata', JSON.stringify(userData));
        window.location = './index.html';
    } catch (err) {
        alert(err.message);
    }
});
