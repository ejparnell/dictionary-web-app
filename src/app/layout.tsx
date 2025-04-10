import type { Metadata } from 'next';
import { Space_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import '@/styles/globals.css';
import SearchHeader from '@/components/SearchHeader';

const mono = Space_Mono({
    subsets: ['latin'],
    variable: '--font-mono',
    weight: ['400', '700'],
});

export const metadata: Metadata = {
    title: 'Frontend Mentor | Dictionary web app',
    description: 'A project completed by Elizabeth Parnell',
    icons: {
        icon: '/assets/images/favicon-32x32.png',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={mono.variable}>
                <ThemeProvider>
                    <SearchHeader />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
