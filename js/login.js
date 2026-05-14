const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

function saveCookie(name, value) {
    document.cookie = `${name}=${JSON.stringify(value)}; path=/`; 
    // stores the cookies 'key' as the name, value is the cart array, 
    // gets translated into a string so the cookie can read it,
    // path makes it so the cookie is available on every page

}

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email.match(emailPattern)) {
        alert('Invalid Email Format');
        return;
    }

    // login api request
    console.log("EMAIL:", email);
    console.log("PASSWORD:", password);

    try {
        // we fetch the response from reqres
        const response = await  fetch('https://reqres.in/api/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'free_user_3Djgl5yLWVGt09qL5z1QEcj2gky'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });


        // convert response to json
        const data = await response.json();

        if (response.ok) {
            saveCookie('user', {
                email: email,
                token: data.token
            });

            setTimeout(() => {
                window.location.href='index.html';
            }, 1000);
        } else {
            alert(data.error);
        }
    } catch(error) {
        alert('Network error');
    }

});