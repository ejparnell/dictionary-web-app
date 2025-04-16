'use client';

import { useRef } from 'react';
import Image from 'next/image';
import useWindowSize from '@/hooks/useWindowSize';
import styles from './AudioButton.module.css';

export default function AudioButton({ audio }: { audio: string }) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const { width } = useWindowSize();
    const AUIDO_ICON_SIZE = (width ?? 0) < 768 ? 48 : 75;

    const handlePlay = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
    };

    return (
        <button className={styles.audioBtn} onClick={handlePlay}>
            <audio ref={audioRef}>
                <source src={audio} type='audio/mpeg' />
            </audio>
            <Image
                src='/assets/images/icon-play.svg'
                alt='Play Audio'
                width={AUIDO_ICON_SIZE}
                height={AUIDO_ICON_SIZE}
            />
        </button>
    );
}
