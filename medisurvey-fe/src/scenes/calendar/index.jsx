import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import React, { useState } from "react";
import Headeer from "../../components/Headeer";
import FullCalendar  from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import { formatDate } from '@fullcalendar/core'

export default function Calendar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)
  const [currentEvents, setCurrentEvents] = useState([]);
  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();
    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };
  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };
  return (
    <Box marginLeft={2} marginRight={2}>
      <Headeer title="Calendar" subtitle="Full Calendar Intractive Page" />
      <Box display="flex" justifyContent="space-between">
        <Box
       flex="20%"
        sx={{backgroundColor:colors.primary[400],padding:2 , borderRadius:2 , marginRight:2}}>
          <Typography variant="h5" >Events</Typography>
          <List
          sx={{
            width: '100%',
            position: 'relative',
            overflow: 'auto',
            maxHeight:750,
           
          }}
          >
            {currentEvents.map((events)=>(
              <ListItem
              sx={{backgroundColor:colors.greenAccent[500] , marginTop:3, borderRadius:2}}
              >
                <ListItemText>
                {events.title}
                <Typography>
                      {formatDate(events.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                </ListItemText>
              </ListItem>
            ))}
          </List>
          
        </Box>

        <Box flex="100%" >
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true} //Bunu true yaparak tıklamayı aktifleştirdim ama bir fonksşiyon koymadan bir işe yaramaz
            select={handleDateClick} //takvim yaprağına tıkladıktan sonra olacak işlemi fonksiyona atadım ve böylece plan girilmesin sağalabileceğim
            eventClick={handleEventClick} //  Girmiş olduğum plana tıkladıktan sonra çalışacak olan Fonsiyon
            eventsSet={(events) => setCurrentEvents(events)} //
            
          />
        </Box>
      </Box>
    </Box>
  );
}
