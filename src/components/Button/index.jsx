import PropTypes from "prop-types";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import styles from "./Buttons.module.scss";

function Button({
    primary = false,
    rounded = false,
    border = false,
    disabled = false,
    loading = false,
    children,
    href,
    size = "medium",
    onClick,
    className,
    ...passProps
}) {
    const Component = href ? "a" : "button";
    const finalDisabled = loading || disabled;

    const props = {
        onClick,
        ...passProps,
    };

    // Xóa các event listener khi button bị disabled hoặc loading
    if (finalDisabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith("on") && typeof props[key] === "function") {
                delete props[key];
            }
        });
    }

    const classes = clsx(
        styles.btn,
        styles[size],
        {
            [styles.primary]: primary,
            [styles.rounded]: rounded,
            [styles.border]: border,
            [styles.disabled]: finalDisabled,
            [styles.loading]: loading,
        },
        className
    );

    const loadingIcon = loading && (
        <FontAwesomeIcon className={styles.loadingIcon} icon={faSpinner} />
    );

    return (
        <Component
            {...props}
            className={classes}
            disabled={finalDisabled}
            href={href}
        >
            {loadingIcon}
            <span className={styles.content}>{children}</span>
        </Component>
    );
}

Button.propTypes = {
    children: PropTypes.node,
    primary: PropTypes.bool,
    rounded: PropTypes.bool,
    border: PropTypes.bool,
    href: PropTypes.string,
    size: PropTypes.oneOf(["small", "medium", "large"]),
    className: PropTypes.string,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    onClick: PropTypes.func,
};

export default Button;
