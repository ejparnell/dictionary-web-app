'use client';

import { useTheme } from '@/components/providers/ThemeProvider';
import Image from 'next/image';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={styles.container}>
            <div
                className={`${theme === 'light' ? styles.toggleBackgroundLight : styles.toggleBackgroundDark} ${
                    styles.toggle
                }`}
                onClick={toggleTheme}
            >
                <div className={`${theme === 'light' ? styles.sliderLeft : styles.sliderRight} ${styles.slider}`} />
            </div>
            <Image
                src={`/assets/images/icon-moon.svg`}
                alt='Theme Toggle'
                width={20}
                height={20}
                className={`${theme === 'light' ? '' : styles.iconDark}`}
            />
        </div>
    );
}
