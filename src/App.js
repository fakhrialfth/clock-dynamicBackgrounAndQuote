
import { useEffect, useState } from "react";
import axios from "axios";

import './App.css';

const getCurrentTime = () => {
  return new Date().toLocaleTimeString("in-ID");
};

export default function App() {
  const [time, setTime] = useState(() => getCurrentTime());
  const [background, setBackground] = useState();
  const [textColor, setTextColor] = useState();
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [hello, setHello] = useState("");

  useEffect(() => {
    const fetchQuote = () => {
      axios({
        method: "GET",
        url: "https://api.quotable.io/random"
      }).then((result) => {
        setAuthor(result.data.author);
        setQuote(result.data.content);
      });
    };

    fetchQuote();

    const myQ = setInterval(() => {
      fetchQuote();
    }, 60000 * 15);

    return () => {
      clearInterval(myQ);
    };
  }, []);

  useEffect(() => {
    const myIn = setInterval(() => {
      setTime(getCurrentTime());
      checkTimeAndUpdateTheme();
    }, 1000);

    return () => {
      clearInterval(myIn);
    };
  }, []);

  const checkTimeAndUpdateTheme = () => {
    if ( 
      (parseInt(time.substring(0, 2), 10) >= 19 &&
      parseInt(time.substring(0, 2), 10) <= 6)
    ) {
      setHello("Good Night")
      setBackground("url(https://wallpaperaccess.com/full/6243096.jpg)");
      setTextColor("white");
    } else if (
      parseInt(time.substring(0, 2), 10) >= 6 &&
      parseInt(time.substring(0, 2), 10) <= 12
    ) {
      setHello("Good Morning")
      setBackground("url(https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)");
      setTextColor("white");
    } else if (
      parseInt(time.substring(0, 2), 10) >= 12 &&
      parseInt(time.substring(0, 2), 10) <= 17
    ) {
      setHello("Good Afternoon")
      setBackground("url(https://p0.pikist.com/photos/813/956/countryside-daylight-grass-hd-wallpaper-hill-landscape-meadow-mountain-nature-wallpaper-outdoors.jpg)");
      setTextColor("white");
    } else if (
      parseInt(time.substring(0, 2), 10) >= 17 &&
      parseInt(time.substring(0, 2), 10) <= 19
    ) {
      setHello("Good Evening")
      setBackground("url(https://images.pexels.com/photos/2386144/pexels-photo-2386144.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)");
      setTextColor("white");
    }
  };

  return (
    <div className="App" style={{ backgroundImage: background }}>
      <h1 style={{ color: textColor }}>{hello}</h1>
      <h2 style={{ fontSize: "3rem", color: textColor }}>{time}</h2>
      <h2 style={{ color: textColor }}>{quote}</h2>
      <h3 style={{ color: textColor }}>- {author}</h3>
    </div>
  );
}
