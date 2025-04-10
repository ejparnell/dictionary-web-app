'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import Image from 'next/image';
import styles from './FontSelector.module.css';

type FontOption = {
    label: string;
    value: 'sans' | 'serif' | 'mono';
    fontFamily: string;
};

const fontOptions: FontOption[] = [
    { label: 'Sans Serif', value: 'sans', fontFamily: `'Inter', sans-serif;` },
    { label: 'Serif', value: 'serif', fontFamily: `'Merriweather', serif;` },
    { label: 'Mono', value: 'mono', fontFamily: `'Fira Code', monospace;` },
];

export default function FontSelector() {
    const { font, setFont } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const formatDisplayFont = (font: string) => {
        switch (font) {
            case 'sans':
                return 'Sans Serif';
            case 'serif':
                return 'Serif';
            case 'mono':
                return 'Mono';
            default:
                return font;
        }
    };

    const handleFontChange = (fontOption: FontOption) => {
        setFont(fontOption.value);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.container} ref={dropdownRef}>
            <div className={styles.selector} onClick={() => setIsOpen((prev) => !prev)}>
                <p className={styles.selectorText}>{formatDisplayFont(font)}</p>
                <Image src='/assets/images/icon-arrow-down.svg' alt='Font Selector' width={12} height={12} />
            </div>

            {isOpen && (
                <div className={styles.options}>
                    {fontOptions.map((fontOption) => (
                        <div
                            className={styles.option}
                            key={fontOption.value}
                            onClick={() => handleFontChange(fontOption)}
                        >
                            <p className={`${styles.selectorText} ${styles[fontOption.value]}`}>{fontOption.label}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
