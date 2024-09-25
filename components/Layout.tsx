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
                {pathname !== '/' && ( // Проверяем, что текущий путь не корневой
                    <button onClick={handleBack} className="btn btn-secondary mt-3">
                        back
                    </button>
                )}
                <div className="container">
                    {children}
                </div>
            </main>
    );
}