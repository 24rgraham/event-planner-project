async function newEventHandler(e) {
    e.preventDefault();

    const title = document.querySelector('input[name="event-title"]').value
    const date = document.querySelector('input[name="event-date"]').value
    const time = document.querySelector('input[name="event-time"]').value
    const location = document.querySelector('input[name="event-location"]').value
    const description = document.querySelector('input[name="event-description"]').value

    const res = await fetch(`/api/event/`, {
        method: "PUT",
        body: JSON.stringify({
            title,
            date,
            time,
            location,
            description
        }),
        headers: {
            "Content-Type" : "application/json"
        }
    })

    if (res.ok) {
        location.reload()
    } else {
        alert("Failed to create event")
    }
}

document.querySelector("#new-event-form").addEventListener("submit", newEventHandler)