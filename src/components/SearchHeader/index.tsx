'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import SearchForm from '../SearchForm';
import useWindowSize from '@/hooks/useWindowSize';
import FontSelector from '../FontSelector';
import styles from './SearchHeader.module.css';
import ThemeToggle from '../ThemeToggle';

export default function SearchHeader() {
    const { width } = useWindowSize();
    const router = useRouter(); 
    const [word, setWord] = useState('');
    const [error, setError] = useState<boolean | null>(null);
    
    const LOGO_SIZE = width && width > 768 ? 36 : 32;

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();

        if (!word.trim()) {
            setError(true);
            return;
        }

        if (word.trim()) {
            router.push(`/dictionary/${word}`);
        }
    }

    return (
        <header>
            <div className={styles.controlsContainer}>
                <Image
                    src='/assets/images/logo.svg'
                    alt='Dictionary Logo'
                    width={LOGO_SIZE}
                    height={LOGO_SIZE}
                />

                <div className={styles.controls}>
                    <FontSelector />
                    <div className={styles.hr} />
                    <ThemeToggle />
                </div>
            </div>
            <SearchForm error={error} handleSubmit={handleSearch} word={word} setWord={setWord} />
        </header>
    )
}
