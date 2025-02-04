import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const WeatherSearch = () => {
const [city, setCity] = useState("");
const [weatherData, setWeatherData] = useState(null);
const [searchHistory, setSearchHistory] = useState([]);
const [currentTime, setCurrentTime] = useState("");
const navigate = useNavigate();

 //Updates Time
useEffect(() => {
    const updateCurrentTime = () => {
        setCurrentTime(new Date().toLocaleString());
    };
    updateCurrentTime();
    const timer = setInterval(updateCurrentTime, 1000);
    return () => clearInterval(timer);
    }, []);

  //gets search history
useEffect(() => {
    fetchSearchHistory();
}, []);

const fetchSearchHistory = async () => {
        const user = auth.currentUser;
        if (user) {
        const userSearchCollection = collection(db, "searchHistory");
        const q = query(userSearchCollection, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const history = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setSearchHistory(history);
        }
};

const fetchWeather = async () => {
    const apiKey = "d206a812c0499a8b2493f77fed776960";
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(weatherApiUrl);
        if (!response.ok) {
        throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        setWeatherData(data);

        const user = auth.currentUser;
        if (!user) {
        alert("User not authenticated. Please log in.");
        return;
        }

        const userSearchCollection = collection(db, "searchHistory");
        await addDoc(userSearchCollection, {
        userId: user.uid,
        city: city,
        date: new Date().toISOString(),
        weather: data,
        });
        fetchSearchHistory();
    } catch (error) {
        alert("Couldn't find entered location: Please check the city name and try again.");
    }
    };

const handleLogout = async () => {
        await signOut(auth);
        navigate("/");
    };

return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "'Poppins', sans-serif", color: "#3d4859" }}>
        <button
        onClick={handleLogout}
        style={{
            padding: "10px 20px",
            background: "#F5A8A8",
            color: "#3d4859",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            marginBottom: "20px",
        }}
    >
        Log Out
    </button>
    <p style={{ marginTop: "10px", fontSize: "16px", color: "#3d4859" }}>
        Current Time: {currentTime}
    </p>
    <div style={{ marginBottom: "20px" }}>
        <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter City"
            style={{
            padding: "10px",
            marginRight: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
        }}
        />
        <button
        onClick={fetchWeather}
        style={{
            padding: "10px 20px",
            background: "#A8CFF5",
            color: "#3d4859",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            }}
        >
        Search
        </button>
    </div>
    {weatherData && (
        <div
        style={{
            marginTop: "20px",
            padding: "20px",
            background: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            maxWidth: "500px",
            margin: "20px auto 0 auto",
        }}
        >
        <h3 style={{ marginBottom: "10px", fontSize: "24px", color: "#3d4859" }}>
            {weatherData.name} {weatherData.sys && weatherData.sys.country ? `, ${weatherData.sys.country}` : ""}
        </h3>
        <p style={{ margin: "5px 0", fontSize: "18px" }}>
            <strong>Temperature:</strong> {weatherData.main.temp}°C
        </p>
        <p style={{ margin: "5px 0", fontSize: "18px" }}>
            <strong>Feels Like:</strong> {weatherData.main.feels_like}°C
        </p>
        <p style={{ margin: "5px 0", fontSize: "18px" }}>
            <strong>Description:</strong> {weatherData.weather[0].description}
        </p>
        <p style={{ margin: "5px 0", fontSize: "18px" }}>
            <strong>Humidity:</strong> {weatherData.main.humidity}%
        </p>
        <p style={{ margin: "5px 0", fontSize: "18px" }}>
            <strong>Wind Speed:</strong> {weatherData.wind.speed} m/s
        </p>
        </div>
        )}
    <div style={{ marginTop: "20px", fontSize: "16px", color: "#3d4859" }}>
        <h3>Search History</h3>
        {searchHistory.length > 0 ? (
        <ul style={{ listStyle: "none", padding: "0" }}>
            {searchHistory.map((entry) => (
            <li
                key={entry.id}
                style={{
                    marginBottom: "10px",
                    padding: "10px",
                    background: "#fff",
                    borderRadius: "5px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
                >
                <p style={{ margin: 0 }}>
                    <strong>City:</strong> {entry.city}
                </p>
                <p style={{ margin: 0, fontSize: "14px", color: "#999" }}>
                    {new Date(entry.date).toLocaleString()}
                </p>
                <div>
                    <p style={{ margin: "5px 0" }}>
                    <strong>Temperature:</strong> {entry.weather.main.temp}°C
                    </p>
                    <p style={{ margin: "5px 0" }}>
                    <strong>Description:</strong> {entry.weather.weather[0].description}
                    </p>
                {entry.weather.main.humidity && (
                    <p style={{ margin: "5px 0" }}>
                        <strong>Humidity:</strong> {entry.weather.main.humidity}%
                    </p>
                    )}
                </div>
            </li>
            ))}
            </ul>
        ) : (
            <p>No search history yet.</p>
        )}
        </div>
    </div>
    );
};

export default WeatherSearch;
