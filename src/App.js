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
import SearchIcon from '@mui/icons-material/Search';

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
        title: "Example Event",
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
    const [location, setLocation] = useState("philadelphia");
    const [inputVal, setInputVal] = useState("philadelphia");

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
      if (location !== "") {
        http.get(`/?location=${location}`)
        .then(res => {
            setSearchResults([...res.data]);
        })
      }
    }, [location])

  return (
    <div className="App">
            <h1>What's up in 
              <input type="text" value={inputVal} onChange={e => setInputVal(e.target.value)}/>
              <button onClick={() => setLocation(inputVal)} style={{fontSize: '50'}}>
                🔍
              </button>
            </h1>
            <div style={{display: 'flex'}}>
              <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, width: '50%', margin: "50px" }} />
              <SearchResults results={searchResults} handleAddEvent={handleAddEvent}/>
            </div>
        </div>
  );
}

export default App;
