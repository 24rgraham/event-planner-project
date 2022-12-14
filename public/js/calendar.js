


document.addEventListener('DOMContentLoaded', function () {
  fetch(`/api/events/rsvp`).then(function (response) {
    response.json().then(function (data) {
      const eventData = data
      console.log(eventData);
      const newArray = eventData.map(obj => {
        return {
          title: obj.name,
          start: `${obj.eventDate}T${obj.time}`,
          // start:obj.date,
          url: `/event/${obj.id}`
        }
      })
      console.log(newArray)
      var calendarEl = document.getElementById('calendar');

      var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: newArray
      });

      calendar.render();
    });
  });
});
