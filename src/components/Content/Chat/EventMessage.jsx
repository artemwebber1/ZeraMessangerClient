import styles from '../../Styles/ChatStyles/chatStyles.module.css'

export const EventMessage = ({text}) => {
    return (
        <div className={styles.eventMessage}>
            {text}
        </div>
    );
};