import Button from "../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import styles from "./Buttons.module.scss";

function Buttons() {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Button Component Showcase</h1>
            <div className={styles.showcase}>
                <Button>Click me</Button>
                <Button primary>Primary Button</Button>
                <Button href="https://google.com" target="_blank">
                    Go to Google
                </Button>
                <Button size="small">Small</Button>
                <Button size="medium">Medium</Button>
                <Button size="large">Large</Button>
                <Button border>Bordered</Button>
                <Button rounded>Rounded</Button>
                <Button primary rounded>
                    Primary Rounded
                </Button>
                <Button onClick={() => alert("Clicked!")}>Click Alert</Button>
                <Button
                    primary
                    disabled
                    onClick={() => alert("Should not show")}
                >
                    Disable
                </Button>
                <Button>Loading Button</Button>
                <Button loading onClick={() => console.log("Should not log")}>
                    Loading Button
                </Button>
                <Button className="my-custom-class">Custom Styled</Button>
                <Button primary>
                    <FontAwesomeIcon icon={faEnvelope} /> Send Email
                </Button>
            </div>
        </div>
    );
}

export default Buttons;
