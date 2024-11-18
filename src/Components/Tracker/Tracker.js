import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import Moment from 'react-moment';
import { database, auth } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import AboutBackground from '../../Assets/bg2whole.jpg';
import './Tracker.css';

const Tracker = () => {
  const [value, onChange] = useState(new Date());
  const [cycle, setCycle] = useState("28");
  const [user, setUser] = useState(null);
  const [periodDates, setPeriodDates] = useState([]);
  const [predictedDate, setPredictedDate] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state

  const cycleLength = parseInt(cycle);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        loadUserData(currentUser.uid);
      } else {
        setUser(null);
        setPeriodDates([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const loadUserData = async (userId) => {
    try {
      const userDocRef = doc(database, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.periodDate) {
          onChange(new Date(userData.periodDate));
          predictCurrentMonthPeriod(new Date(userData.periodDate));
        }
        if (userData.cycleLength) {
          setCycle(userData.cycleLength.toString());
        }
        if (userData.periodDates) {
          setPeriodDates(userData.periodDates);
        }
      } else {
        console.warn("No user data found, initializing default values.");
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const predictCurrentMonthPeriod = (lastPeriodDate) => {
    const today = new Date();
    let predicted = new Date(lastPeriodDate);

    while (predicted < today) {
      predicted = new Date(predicted.getTime() + cycleLength * 24 * 60 * 60 * 1000);
    }

    setPredictedDate(predicted);
  };

  const handleSave = async () => {
    if (user) {
      setLoading(true); // Start loading
      try {
        const newPeriodDate = value.toISOString();
        const newPeriodDates = [...periodDates, newPeriodDate].slice(-10);

        const userDocRef = doc(database, 'users', user.uid);

        await setDoc(userDocRef, {
          periodDate: newPeriodDate,
          cycleLength: cycleLength,
          periodDates: newPeriodDates
        }, { merge: true });

        setPeriodDates(newPeriodDates);
        alert("Data saved successfully!");
      } catch (error) {
        console.error("Error saving data:", error);
        alert("Error saving data. Please try again.");
      } finally {
        setLoading(false); // End loading
      }
    } else {
      alert("User not logged in");
    }
  };

  const getNextPeriodDates = () => {
    const nextDates = [];
    let currentDate = new Date(value);

    for (let i = 1; i <= 10; i++) {
      currentDate = new Date(currentDate.getTime() + cycleLength * 24 * 60 * 60 * 1000);
      nextDates.push(currentDate);
    }

    return nextDates;
  };

  return (
    <div>
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>

      <div className="text-center">
        <h4>Calculate Next Period and Ovulation Day</h4>
        <label htmlFor="cycle">Select your Cycle Length:</label>
        <select
          onChange={(e) => setCycle(e.target.value)}
          value={cycle}
          className="m-2"
        >
          {Array.from({ length: 18 }, (_, i) => i + 28).map((value) => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
      </div>

      <p className="text-center">
        Select Your Last Period Start Date from the Calendar
      </p>

      <div className="d-flex justify-content-center">
        <Calendar
          onChange={onChange}
          value={value}
          className="calendar mt-0"
          tileClassName={({ date }) => {
            if (periodDates.includes(date.toISOString().split('T')[0])) {
              return 'highlighted';
            }
            return null;
          }}
        />
      </div>

      <div className="text-center mt-4 p-2">
        <div className="row">
          <div className="d-flex justify-content-center">
            <div className="col-md-3 m-3 box">
              <p>Next Period</p>
              <Moment format="Do MMMM YYYY" add={{ days: cycleLength - 1 }}>
                {value}
              </Moment>
            </div>
            <div className="col-md-3 m-3 box">
              <p>Approximate Ovulation Day</p>
              <Moment format="Do MMMM YYYY" add={{ days: cycleLength - 1 - 14 }}>
                {value}
              </Moment>
            </div>
          </div>
        </div>
        <button onClick={handleSave} className="btn btn-primary mt-3" disabled={loading}>
          {loading ? "Saving..." : "Save Data"}
        </button>
      </div>

      <div className="text-center mt-4 p-2">
        <h5>Predicted Period Date for this Month:</h5>
        {predictedDate && (
          <p>
            <Moment format="Do MMMM YYYY">{predictedDate}</Moment>
          </p>
        )}
      </div>

      <div className="text-center mt-4 p-2">
        <h5>Next 10 Period Dates:</h5>
        <ul>
          {getNextPeriodDates().map((date, index) => (
            <li key={index}>
              <Moment format="Do MMMM YYYY">{date}</Moment>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center mt-4 p-2">
        <h5>Saved Period Dates:</h5>
        <ul>
          {periodDates.map((date, index) => (
            <li key={index}>
              <Moment format="Do MMMM YYYY">{date}</Moment>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tracker;
