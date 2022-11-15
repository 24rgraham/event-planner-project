const deleteEvent = document.querySelectorAll(".deleteEvent");

const editEvent = document.querySelectorAll(".editEvent");

editEvent.forEach((editBtn) => {
  editBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // console.log("Prevented Default")
    const eventId = e.target.getAttribute("data-eventId");
    location.href = `/edit-event/${eventId}`
  });
});

deleteEvent.forEach((delBtn) => {
    delBtn.addEventListener("click", (e) => {
      // e.preventDefault();
      const eventId = e.target.getAttribute("data-eventId");
      console.log(eventId);
      fetch(`/api/events/${eventId}`, {
        method: "DELETE"
      }).then((res) => {
        if (res.ok) {
          location.reload();
        } else {
          alert("trumpet sound");
        }
      });
    });
  });

