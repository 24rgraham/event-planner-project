

async function newEventHandler(e) {
    // e.preventDefault();
    console.log('hi');
    

    const name = document.querySelector('input[name="event-title"]').value
    const date = document.querySelector('input[name="event-date"]').value
    const time = document.querySelector('input[name="event-time"]').value
    const place = document.querySelector('input[name="event-location"]').value
    const description = document.querySelector('textarea[name="event-body"]').value
    const event_creator = document.querySelector("#user-name").textContent
    console.log(event_creator)
    console.log(JSON.stringify({
        name,
        date,
        time,
        place,
        description,
        event_creator
    }),);
    

    const res = await fetch(`/api/events`, {
        method: "POST",
        body: JSON.stringify({
            name,
            date,
            time,
            place,
            description,
            event_creator
        }),
        headers: {
            "Content-Type" : "application/json"
        }
    })

    if (res.ok) {
        alert(name + " was successfully created")
        location.reload()
        
    } else {
        alert("Failed to create event")
    }
}


document.querySelector("#new-event-form").addEventListener("submit", newEventHandler)