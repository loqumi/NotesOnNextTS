'use client';

import React from "react";
import { usePathname, useRouter } from "next/navigation";


export default function Layout({children}:
                                       { children: React.ReactNode;
                                       }) {
    const router = useRouter();
    const pathname = usePathname();

    const handleBack = () => {
        router.back();
    };

    return (
            <main>
                {pathname !== '/' && (
                    <button onClick={handleBack} className="btn btn-outline-dark mt-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                        </svg>
                        back
                    </button>
                )}
                <div className="py-5">
                    {children}
                </div>
            </main>
    );
}