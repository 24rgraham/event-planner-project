const deleteEvent = document.querySelectorAll(".deleteEvent");

deleteEvent.forEach((delBtn) => {
    delBtn.addEventListener("click", (e) => {
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

  