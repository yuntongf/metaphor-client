import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect, useState, useMemo, useCallback} from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import http from './services/HttpServices';
import "./components/SearchResults.css"
import SearchResults from "./components/SearchResults";

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import "bootstrap/dist/css/bootstrap.css"
import "./App.css";

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const events = [
    {
        title: "Big Meeting",
        allDay: true,
        start: new Date(2023, 10 - 1, 3),
        end: new Date(2023, 10 - 1, 3),
    },
    {
        title: "Vacation",
        start: new Date(2021, 10 - 1, 20),
        end: new Date(2021, 10 - 1, 25),
    }
];


function App() {
    const [searchResults, setSearchResults] = useState([]);
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(events);
    const [details, setDetails] = useState({});

    function handleAddEvent(title, year, month, day) {

        
        for (let i=0; i<allEvents.length; i++){

            const d1 = new Date (allEvents[i].start);
            const d2 = new Date(new Date(Number(year), Number(month) - 1, Number(day)));
            const d3 = new Date(allEvents[i].end);
            const d4 = new Date(new Date(Number(year), Number(month) - 1, Number(day)));

             if (
              ( (d1  <= d2) && (d2 <= d3) ) || ( (d1  <= d4) &&
                (d4 <= d3) )
              )
            {   
                alert("CLASH"); 
                break;
             }
    
        }

        setAllEvents([...allEvents, {
          "title": title,
          "start": new Date(Number(year), Number(month) - 1, Number(day)),
          "end": new Date(Number(year), Number(month) - 1, Number(day)),
      }]);
    }

    useEffect(() => {
      http.get('/')
      .then(res => {
          setSearchResults([...res.data]);
      })
    }, [])

  return (
    <div className="App">
            <h1>Philly Events</h1>
            <div style={{display: 'flex'}}>
              <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, width: '50%', margin: "50px" }} />
              {searchResults.length === 0 && <div> loading events for you... </div>}
              <div >
                <div >
                    {/* <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                    <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                    <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} /> */}
                    {/* <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
                        Add Event
                    </button> */}
                    <SearchResults results={searchResults} handleAddEvent={handleAddEvent}/>
                </div>
              </div>
            </div>
        </div>
  );
}

export default App;
