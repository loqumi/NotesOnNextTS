import React from "react";
import '../styles/globals.css';
import Layout from "../components/Layout";
import ReduxProvider from "./redux-provider";
import 'bootstrap/dist/css/bootstrap.min.css';

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
                <ReduxProvider>
                    <div className="container">
                        <header className="py-3 border-bottom">
                            <h1>Notes App</h1>
                        </header>
                        <Layout children={children} />
                    </div>
                </ReduxProvider>
            </body>
        </html>
    );
}