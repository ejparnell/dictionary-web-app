'use client';

import styles from './error.module.css';

export default function DictionaryError({ error }: { error: Error; }) {
    return (
        <div className={styles.errorContainer}>
            <h2 className={styles.errorHeading}>Oops! Something went wrong.</h2>
            <p>{error.message}</p>
        </div>
    );
}
