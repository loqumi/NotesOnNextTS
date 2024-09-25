import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import React from "react";

export const metadata = {
    title: 'Notes Next App',
    description: 'Notes application built with Next.ts 14',
};

export default function RootLayout({children}:
    { children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <div className="container">
                    <header className="py-3">
                        <h1>Notes App</h1>
                    </header>
                    <main>{children}</main>
                </div>
            </body>
        </html>
    );
}