import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import React from 'react';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
	title: 'CT.GG',
	description: '모든 롤 전적 검색',
};

export default function RootLayout({children}: { children: React.ReactNode }) {
	return (
		<html lang='kr'>
		<body className={inter.className}>{children}</body>
		</html>
	);
}
