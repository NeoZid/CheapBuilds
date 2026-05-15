const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password1 = document.getElementById('password1').value.trim();
    const password2 = document.getElementById('password2').value.trim();

    if (!email.match(emailPattern)) {
        alert('Invalid Email Format');
        return;
    } 

    if(password1 != password2) {
        alert('Password must be the same');
        return;
    } else {
        document.getElementById('email').value = "";
        document.getElementById('password1').value = "";
        document.getElementById('password2').value = "";
        alert("Registered!");
    }

});