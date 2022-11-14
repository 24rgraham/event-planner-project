const editEvent = document.querySelector("#edit-event-form");

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

editEvent.addEventListener("submit", async (e) => {
  e.preventDefault();
  //   console.log("PREVENTED!");
  const name = document.querySelector('input[name="event-title"]').value;
  const date = document.querySelector('input[name="event-date"]').value;
  const time = document.querySelector('input[name="event-time"]').value;
  const location = document.querySelector('input[name="event-location"]').value;
  const event_photo = body
  const description = document.querySelector(
    'textarea[name="event-body"]'
  ).value;
  const edited_event = document.querySelector("#user-event").textContent;
  const event_creator = document.querySelector("#user-name").textContent;


  const currentURL = window.location.href;
//   console.log(currentURL)
  const idNum = currentURL.substring(currentURL.lastIndexOf('/') + 1);
//   console.log(idNum)

  const res = await fetch(`/api/events/${idNum}`, {
    method: "PUT",
    body: JSON.stringify({
      name,
      date,
      time,
      location,
      event_photo,
      description,
      event_creator,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  //   console.log(res);
  if (res.ok) {
    alert(name + " was successfully edited");
    window.location.replace("/users/" + event_creator);

  } else {
    alert("Failed to edit event");
  }
});
