


document.addEventListener('DOMContentLoaded', function() {
  fetch(`/api/events`).then(function (response) {
      response.json().then(function (data) {
        const eventData = data
        console.log(eventData);
        const newArray = eventData.map(obj=>{
          return{
            title: obj.name,
            // start:`${obj.date}T${obj.time}`,
            start:obj.date,
            url: `/events/${obj.id}`
          }
        })
        console.log(newArray)
        var calendarEl = document.getElementById('calendar');
        
        var calendar = new FullCalendar.Calendar(calendarEl, {
          initialView: 'dayGridMonth',
          initialDate: '1969-12-07',
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
      