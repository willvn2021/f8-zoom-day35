import { useState } from "react";
import styles from "./Weather.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudSun, faSync } from "@fortawesome/free-solid-svg-icons";

const weatherData = {
    hanoi: { city: "Hà Nội", temp: 28, weather: "Nắng", humidity: 65 },
    hcm: { city: "TP.HCM", temp: 32, weather: "Có mây", humidity: 78 },
    danang: { city: "Đà Nẵng", temp: 30, weather: "Mưa nhẹ", humidity: 82 },
};

//Icon theo tình trạng
const iconFor = (weather = "") => {
    const icon = weather.toLowerCase();
    switch (true) {
        case icon.includes("nắng"):
            return "☀️";
        case icon.includes("mưa"):
            return "🌧️";
        case icon.includes("mây"):
            return "🌤️";
        default:
            return "🌈";
    }
};

// Logic Random nhiệt độ, độ ẩm
const clamp = (x, min, max) => Math.min(max, Math.max(min, x));
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function Weather() {
    const [weather, setWeather] = useState(weatherData);
    const [selected, setSelected] = useState("hanoi");

    const info = weather[selected];

    const refresh = () => {
        setWeather((prev) => {
            const current = prev[selected];
            const nextTemp = clamp(current.temp + randInt(-5, 5), -10, 45);
            const nextHumidity = clamp(
                current.humidity + randInt(-5, 5),
                0,
                100
            );
            return {
                ...prev,
                [selected]: {
                    ...current,
                    temp: nextTemp,
                    humidity: nextHumidity,
                },
            };
        });
    };

    return (
        <div className={styles.weatherWrapper}>
            <h1>
                <FontAwesomeIcon icon={faCloudSun} /> Weather App
            </h1>

            <div className={styles.toolbar}>
                <select
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                >
                    {Object.entries(weather).map(([key, value]) => (
                        <option key={key} value={key}>
                            {value.city}
                        </option>
                    ))}
                </select>
                <button
                    className={`${styles.btn} ${styles.primary}`}
                    onClick={refresh}
                >
                    <FontAwesomeIcon icon={faSync} /> Làm mới
                </button>
            </div>

            <div className={styles.panel}>
                <div className={styles.icon} aria-hidden="true">
                    {iconFor(info.weather)}
                </div>

                <div className={styles.rows}>
                    <div className={styles.row}>
                        <div className={styles.label}>Thành phố</div>
                        <div className={styles.value}>{info.city}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.label}>Nhiệt độ</div>
                        <div className={styles.value}>{info.temp}°C</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.label}>Thời tiết</div>
                        <div className={styles.value}>{info.weather}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.label}>Độ ẩm</div>
                        <div className={styles.value}>{info.humidity}%</div>
                    </div>
                </div>
            </div>

            <div className={styles.hint}>
                F8 Dữ liệu đang được “Làm mới” random nhiệt độ và độ ẩm (±5
                độ/%).
            </div>
        </div>
    );
}

export default Weather;
