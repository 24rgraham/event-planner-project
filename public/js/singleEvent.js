var goingbtn = document.getElementById('goingbtn')
var maybebtn = document.getElementById('maybebtn')
const eventId = document.getElementById('event-id').textContent;
const sessId = document.querySelector("#sessId").textContent
const userId = document.querySelector("#userId").textContent




// hide buttons from logged in users and sessID users
fetch(`/api/invites/` + eventId).then(function (response) {

    response.json().then(function (data) {
        const rsvps = data
        console.log(rsvps)

        console.log(
            rsvps.map(obj => {
                return obj.sess_id
            }).includes(sessId)
        );

        if (rsvps.map(obj => {
            return obj.sess_id
        }).includes(sessId) ||
            rsvps.map(obj => {
            return obj.invitee_id
            }).includes(userId)) {
            goingbtn.style.display = 'none';
            maybebtn.style.display = 'none';
        }
    });
})


// display event goers
fetch(`/api/invites/` + eventId + `/going`).then(function (response) {
    response.json().then(function (data) {
        const going = data
        console.log(going)
        const goingNames = going.map(obj => {
            return obj.name
        })
        console.log(goingNames)
    });
});

// display event maybeers
fetch(`/api/invites/` + eventId + `/maybe`).then(function (response) {
    response.json().then(function (data) {
        const going = data
        console.log(going)
        const goingNames = going.map(obj => {
            return obj.name
        })
        console.log(goingNames)
    });
});


// new event goer
const newGoing = document.querySelector("#goingSave");

newGoing.addEventListener("click", e => {
    e.preventDefault();
    if (userId) {
        const inviteObj = {
            name: document.querySelector("#goingName").value,
            invitee_id: userId,
            event_id: eventId,
            response: "Going",
            sess_id: sessId
        }
        console.log(JSON.stringify(inviteObj))

        fetch("/api/invites", {
            method: "POST",
            body: JSON.stringify(inviteObj),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.ok) {
                location.reload();
            } else {
                alert("failed")
                location.reload();
            }
        })
    } else {
        const inviteObj = {
            name: document.querySelector("#goingName").value,
            event_id: eventId,
            response: "Going",
            sess_id: sessId
        }
        console.log(JSON.stringify(inviteObj))

        fetch("/api/invites", {
            method: "POST",
            body: JSON.stringify(inviteObj),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.ok) {
                location.reload()
            } else {
                alert("failed")
                location.reload();
            }
        })
    }
})

// new event maybeer
const newMaybe = document.querySelector("#maybeSave");

newMaybe.addEventListener("click", e => {
    e.preventDefault();
    if (userId) {
        const inviteObj = {
            name: document.querySelector("#maybeName").value,
            invitee_id: userId,
            event_id: eventId,
            response: "Maybe",
            sess_id: sessId
        }
        console.log(JSON.stringify(inviteObj))

        fetch("/api/invites", {
            method: "POST",
            body: JSON.stringify(inviteObj),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.ok) {
                location.reload();
            } else {
                alert("failed")
                location.reload();
            }
        })
    } else {
        const inviteObj = {
            name: document.querySelector("#goingName").value,
            event_id: eventId,
            response: "Maybe",
            sess_id: sessId
        }
        console.log(JSON.stringify(inviteObj))

        fetch("/api/invites", {
            method: "POST",
            body: JSON.stringify(inviteObj),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.ok) {
                location.reload()
            } else {
                alert("failed")
                location.reload();
            }
        })
    }
})

// update response
