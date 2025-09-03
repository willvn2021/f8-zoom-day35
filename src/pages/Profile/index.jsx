import React, { useState, useEffect } from "react";
import styles from "./Profile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faEnvelope,
    faPhone,
    faGlobe,
    faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fake timeout hiện loading
        const timer = setTimeout(() => {
            fetch("https://jsonplaceholder.typicode.com/users/1")
                .then((response) => response.json())
                .then((json) => setUser(json))
                .finally(() => setLoading(false));
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Chờ phản hồi Api trả ra text Loading
    if (loading) {
        return (
            <div className={styles.profileWrapper}>
                <div className={styles.loading}>Loading Profile...</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className={styles.profileWrapper}>
                <div className={styles.loading}>Could not load user data.</div>
            </div>
        );
    }

    const avatarUrl = "/src/img/avatar-01.png";

    return (
        <div className={styles.profileWrapper}>
            <div className={styles.card}>
                <div className={styles.media}>
                    <img src={avatarUrl} alt={user.name} />
                </div>

                <div className={styles.name}>
                    {user.name}
                    <span className={styles.verified}>
                        <FontAwesomeIcon icon={faCircleCheck} />
                    </span>
                </div>
                <div className={styles.subtitle}>@{user.username}</div>

                <div className={styles.list}>
                    <div className={styles.row}>
                        <span className={styles.icon}>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                        <span className={styles.label}>Email:</span>
                        <span className={styles.value}>{user.email}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.icon}>
                            <FontAwesomeIcon icon={faPhone} />
                        </span>
                        <span className={styles.label}>Phone:</span>
                        <span className={styles.value}>{user.phone}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.icon}>
                            <FontAwesomeIcon icon={faGlobe} />
                        </span>
                        <span className={styles.label}>Website:</span>
                        <span className={styles.value}>
                            <a
                                href={`http://${user.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {user.website}
                            </a>
                        </span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.icon}>
                            <FontAwesomeIcon icon={faLocationDot} />
                        </span>
                        <span className={styles.label}>Address:</span>
                        <span className={styles.value}>
                            {user?.address?.street}, {user?.address?.city}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
