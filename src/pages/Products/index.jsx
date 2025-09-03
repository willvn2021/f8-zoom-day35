import styles from "./Products.module.scss";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBoxOpen,
    faEye,
    faSpinner,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";

// Upcase từng từ trong tiêu đề
const titleCase = (str = "") =>
    str.replace(
        /\w\S*/g,
        (word) => word[0].toLocaleUpperCase() + word.slice(1)
    );
// Upcase chữ đầu tiên
const capFirst = (str = "") => str[0].toLocaleUpperCase() + str.slice(1);

// Cắt dòng quá 100 từ
const truncate = (str = "", n = 100) =>
    str.length > n ? str.slice(0, n).trimEnd() + "..." : str;

function Modal({ open, onClose, post }) {
    React.useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open || !post) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button
                    className={styles.close}
                    onClick={onClose}
                    aria-label="Đóng"
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <h2>{titleCase(post.title)}</h2>
                <div className={styles.meta}>
                    ID: {post.id} • User: {post.userId}
                </div>
                <p>{capFirst(post.body)}</p>
            </div>
        </div>
    );
}

function Products() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMore, setViewMore] = useState(null);

    React.useEffect(() => {
        setTimeout(() => {
            fetch("https://jsonplaceholder.typicode.com/posts?_limit=12")
                .then((response) => response.json())
                .then((json) => setPosts(json))
                .finally(() => setLoading(false));
        }, 1000);
    }, []);

    console.log(posts);
    // Chờ phản hồi Api trả ra text Loading
    if (loading) {
        return (
            <div className={styles.loading}>
                <FontAwesomeIcon icon={faSpinner} spin />
                <span>Loading...</span>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1>
                <FontAwesomeIcon icon={faBoxOpen} />
                <span>Products Post</span>
            </h1>
            <div className={styles.sub}>
                Danh sách bài viết: {posts.length} post
            </div>

            <div className={styles.grid}>
                {posts.map((post) => (
                    <article className={styles.card} key={post.id}>
                        <span className={styles.idfill}>ID #{post.id}</span>
                        <h2 className={styles.title}>
                            {titleCase(post.title)}
                        </h2>
                        <p className={styles.body}>
                            {capFirst(
                                truncate(post.body.replace(/\n/g, " "), 100)
                            )}
                        </p>
                        <div className={styles.actions}>
                            <button
                                className={`${styles.btn} ${styles.primary}`}
                                onClick={() => setViewMore(post)}
                            >
                                <FontAwesomeIcon icon={faEye} />
                                <span>Xem chi tiết</span>
                            </button>
                        </div>
                    </article>
                ))}
            </div>

            <Modal
                open={!!viewMore}
                post={viewMore}
                onClose={() => setViewMore(null)}
            />
        </div>
    );
}

export default Products;
