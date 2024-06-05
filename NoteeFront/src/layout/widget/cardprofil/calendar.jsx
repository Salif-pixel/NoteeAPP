
import * as React from 'react';
import dayjs from 'dayjs';
import { theme } from '../../../App';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useContext } from 'react';





export default function BasicDateCalendar() {
    const { toggle, setToggle } = useContext(theme);
const bgcolor=toggle==='dark' ? 'bg-white':'bg-customdark';
const textcolor=toggle==='light' ? 'white':'black';
  return (
    <div className={`rounded-lg text-${textcolor}  bg-opacity-0 relative m-5 bottom-4 w-fit`}>
    <LocalizationProvider  dateAdapter={AdapterDayjs}>
    <DateCalendar/>
    </LocalizationProvider>
    </div>
  );
}
