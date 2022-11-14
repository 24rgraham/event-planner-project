const cloudName = `dqv6cj4bc`;
const apiKey = `444617613757917`;

let body;

var widget = cloudinary.createUploadWidget(
    {
      cloudName: `dqv6cj4bc`,
      uploadPreset: `unsigned_default`
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info.path);
        body = result.info.path;
      }
    }
)

document.getElementById("upload_widget").addEventListener("click", function(e) {
    e.preventDefault();
    widget.open();
}, false);

async function newEventHandler(e) {
    e.preventDefault();
    console.log('hi');
    
    const name = document.querySelector('input[name="event-title"]').value
    const date = document.querySelector('input[name="event-date"]').value
    const time = document.querySelector('input[name="event-time"]').value
    const place = document.querySelector('input[name="event-location"]').value
    const event_photo = body
    const description = document.querySelector('textarea[name="event-body"]').value
    const event_creator = document.querySelector("#user-name").textContent

    console.log(event_creator)  
    console.log(body)

    const res = await fetch(`/api/events`, {
        method: "POST",
        body: JSON.stringify({
            name,
            date,
            time,
            place,
            event_photo,
            description,
            event_creator
        }),
        headers: {
            "Content-Type" : "application/json"
        }
    })
    console.log(res)
    if (res.ok) {
        alert(name + " was successfully created")
        location.replace("/users/" + event_creator);
    } else {
        alert("Failed to create event")
    }
}

document.querySelector("#new-event-form").addEventListener("submit", newEventHandler)