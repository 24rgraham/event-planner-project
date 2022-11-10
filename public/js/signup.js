const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit", e => {
    e.preventDefault();

    const userObj = {
        name: document.querySelector("#name-signup").value,
        email: document.querySelector("#email-signup").value,
        password : document.querySelector("#password-signup").value
    }

    fetch("/api/user/", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type" : "application/json"
        }
    }).then (res => {
        if (res.ok) {
            alert("Sign Up Successful")
           return res.json()
        } else {
            alert("Sign Up failed")
            location.reload()
        }
    }).then(data=>{
        location.href = `/user/${data.id}`
    })
})