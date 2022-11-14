const editEvent = document.querySelector("#edit-event-form");

editEvent.addEventListener("submit", async (e) => {
  e.preventDefault();
  //   console.log("PREVENTED!");
  const name = document.querySelector('input[name="event-title"]').value;
  const date = document.querySelector('input[name="event-date"]').value;
  const time = document.querySelector('input[name="event-time"]').value;
  const location = document.querySelector('input[name="event-location"]').value;
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
