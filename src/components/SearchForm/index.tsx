import React from 'react';
import Image from 'next/image';
import { useTheme } from '@/components/providers/ThemeProvider';
import styles from './SearchForm.module.css';

interface SearchFormProps {
    word: string;
    setWord: (word: string) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    error: boolean | null;
}

export default function SearchForm({ word, setWord, handleSubmit, error }: SearchFormProps) {
    const { font } = useTheme();
    const fontStyle = {
        fontFamily:
            font === 'sans' ? 'Inter, sans-serif' : font === 'serif' ? 'Merriweather, serif' : 'Fira Code, monospace',
    };

    const inputStyle = {
        ...fontStyle,
        outline: error ? '1px solid #FF5252' : 'none',
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
                <input
                    type='text'
                    value={word}
                    onChange={(event) => setWord(event.target.value)}
                    placeholder='Search for a word...'
                    style={inputStyle}
                    className={styles.input}
                />
                <Image
                    className={styles.icon}
                    src='/assets/images/icon-search.svg'
                    alt='Search Icon'
                    width={16}
                    height={16}
                />
            </div>
            {error && <p className={styles.errorText}>Whoops, can&apos;t be empty...</p>}
        </form>
    );
}
