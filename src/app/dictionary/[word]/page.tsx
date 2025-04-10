import AudioButton from '@/components/AudioButton';
import styles from './DictionaryPage.module.css';
import textStyles from '@/styles/presets/TextPresets.module.css';
import Image from 'next/image';

interface DictionaryPageProps {
    params: { word: string };
}

export default async function DictionaryPage({ params }: DictionaryPageProps) {
    const { word } = await params;

    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, {
        next: { revalidate: 60 },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    interface Meaning {
        partOfSpeech: string;
        definitions: {
            definition: string;
            example?: string;
        }[];
        synonyms: string[];
        antonyms: string[];
    }

    interface WordData {
        word: string;
        phonetic?: string;
        phonetics: { text: string; audio: string }[];
        meanings: Meaning[];
        sourceUrls: string[];
    }

    const data: WordData[] = await response.json();
    const wordData = data[0];
    const resWord = wordData.word;
    const phonetics = wordData.phonetics;
    const meanings = wordData.meanings;
    const sourceUrl = wordData.sourceUrls;

    console.log('Word Data:', wordData);

    const findPheneticText = () => {
        const phoneticText = phonetics.find((phonetic) => phonetic.audio && phonetic.text);
        if (phoneticText) {
            return phoneticText.text;
        } else if (phonetics.length > 0) {
            const fallbackPhonetic = phonetics.find((phonetic) => phonetic.text);
            if (fallbackPhonetic) {
                return fallbackPhonetic.text;
            }
        } else {
            return '';
        }
    };

    const findAudio = () => {
        const phoneticAudio = phonetics.find((phonetic) => phonetic.audio && phonetic.text);
        if (phoneticAudio) {
            return phoneticAudio.audio;
        } else if (phonetics.length > 0) {
            const fallbackPhonetic = phonetics.find((phonetic) => phonetic.audio);
            if (fallbackPhonetic) {
                return fallbackPhonetic.audio;
            }
        } else {
            return '';
        }
    };

    return (
        <div>
            <section className={styles.phonetics}>
                <div>
                    <h2 className={styles.phoneticsWord}>{resWord}</h2>
                    <p className={styles.phoneticsText}>{findPheneticText()}</p>
                </div>
                <AudioButton audio={findAudio() || ''} />
            </section>

            <section>
                {meanings.map((meaning, index) => (
                    <div key={index}>
                        <div className={styles.meaningHeader}>
                            <h3 className={styles.partsOfSpeech}>{meaning.partOfSpeech}</h3>
                            <div className={styles.line} />
                        </div>
                        <p className={styles.meaning}>Meaning</p>
                        <ul className={styles.meaningUl}>
                            {meaning.definitions.map((def, index) => (
                                <li className={styles.meaningLi} key={index}>
                                    {def.definition}
                                    {def.example && <p className={styles.example}>&quot;{def.example}&quot;</p>}
                                </li>
                            ))}
                        </ul>

                        {meaning.synonyms.length > 0 && (
                            <div className={styles.san}>
                                <p className={styles.meanings}>
                                    <span className={styles.sanTitle}>Synonyms</span>
                                    {meaning.synonyms.join(', ')}
                                </p>
                            </div>
                        )}

                        {meaning.antonyms.length > 0 && (
                            <div className={styles.san}>
                                <p className={styles.meanings}>
                                    <span className={styles.sanTitle}>Antonyms</span>
                                    {meaning.antonyms.join(', ')}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </section>

            <section>
                <div className={styles.line} />

                <p className={`${textStyles.bodySm} ${styles.source}`}>Source</p>
                <div>
                    {sourceUrl.map((url, index) => (
                        <a
                            key={index}
                            href={url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className={`${textStyles.bodySm} ${styles.sourceUrl}`}
                        >
                            {url}
                            <Image
                                className={styles.sourceIcon}
                                src='/assets/images/icon-new-window.svg'
                                alt='New Window'
                                width={12}
                                height={12}
                            />
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
}
