import React from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function DateTimePicker(props) {
  const { date, setDate, showTime, onlyTime } = props;

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };
  return (
    <DatePicker
      showTimeSelect={showTime}
      filterTime={filterPassedTime}
      dateFormat={
        showTime
          ? `MMMM d, yyyy h:mm aa`
          : onlyTime
          ? `h:mm aa`
          : `MMMM d, yyyy`
      }
      selected={date}
      onChange={(date) => setDate(date)}
    />
  );
}
