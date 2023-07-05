import React, { useState, useEffect } from "react";

const AlarmClock = () => {
  const [timer, setTimer] = useState("");
  const [hourInput, setHourInput] = useState("");
  const [minuteInput, setMinuteInput] = useState("");
  const [alarmsArray, setAlarmsArray] = useState([]);
  const [alarmIndex, setAlarmIndex] = useState(0);

  const appendZero = (value) => (value < 10 ? "0" + value : value);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const hours = appendZero(date.getHours());
      const minutes = appendZero(date.getMinutes());
      const seconds = appendZero(date.getSeconds());
      setTimer(`${hours}:${minutes}:${seconds}`);
      checkActiveAlarms(hours, minutes);
    }, 1000);
    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const checkActiveAlarms = (hours, minutes) => {
    alarmsArray.forEach((alarm) => {
      if (alarm.isActive && alarm.alarmHour === hours && alarm.alarmMinute === minutes) {
        playAlarmSound();
      }
    });
  };

  const inputCheck = (inputValue) => {
    inputValue = parseInt(inputValue, 10); // Specify the radix parameter
    if (isNaN(inputValue)) {
      return "";
    }
    if (inputValue < 10) {
      inputValue = appendZero(inputValue);
    }
    return inputValue;
  };

  const handleHourInputChange = (event) => {
    const value = inputCheck(event.target.value);
    setHourInput(value);
  };

  const handleMinuteInputChange = (event) => {
    const value = inputCheck(event.target.value);
    setMinuteInput(value);
  };

  const createAlarm = () => {
    const id = `${alarmIndex}_${hourInput}_${minuteInput}`;
    const alarmObj = {
      id,
      alarmHour: hourInput,
      alarmMinute: minuteInput,
      isActive: false,
    };
    const updatedAlarmsArray = [...alarmsArray, alarmObj];
    setAlarmsArray(updatedAlarmsArray);
    setAlarmIndex((prevIndex) => prevIndex + 1);
    saveAlarmsToLocalStorage(updatedAlarmsArray);
  };

  const deleteAlarm = (id) => {
    const updatedAlarmsArray = alarmsArray.filter((alarm) => alarm.id !== id);
    setAlarmsArray(updatedAlarmsArray);
    saveAlarmsToLocalStorage(updatedAlarmsArray);
  };

  const toggleAlarm = (id) => {
    const updatedAlarmsArray = alarmsArray.map((alarm) => {
      if (alarm.id === id) {
        return { ...alarm, isActive: !alarm.isActive };
      }
      return alarm;
    });
    setAlarmsArray(updatedAlarmsArray);
    saveAlarmsToLocalStorage(updatedAlarmsArray);
  };

  const playAlarmSound = () => {
    const alarmSound = new Audio("./mixkit-alarm-tone-996.wav");
    alarmSound.play();
    alarmSound.loop = true;
  };

  const saveAlarmsToLocalStorage = (alarms) => {
    localStorage.setItem("alarms", JSON.stringify(alarms));
  };

  useEffect(() => {
    const storedAlarms = localStorage.getItem("alarms");
    if (storedAlarms) {
      setAlarmsArray(JSON.parse(storedAlarms));
    }
  }, []);

  useEffect(() => {
    saveAlarmsToLocalStorage(alarmsArray);
  }, [alarmsArray]);

  return (
    <div>
      <div className="timer-display">{timer}</div>
      <div>
        <input type="text" value={hourInput} onChange={handleHourInputChange} />
        <input type="text" value={minuteInput} onChange={handleMinuteInputChange} />
        <button onClick={createAlarm}>Set Alarm</button>
      </div>
      <div className="activeAlarms">
        {alarmsArray.map((alarm) => (
          <div className="alarm" key={alarm.id}>
            <span>{`${alarm.alarmHour}:${alarm.alarmMinute}`}</span>
            <input
              type="checkbox"
              checked={alarm.isActive}
              onChange={() => toggleAlarm(alarm.id)}
            />
            <button onClick={() => deleteAlarm(alarm.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlarmClock;
