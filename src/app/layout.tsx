import type {Metadata} from "next";
import "./globals.css";


export const metadata: Metadata = {
    title: "Questionnaire de satisfaction",
    description: "Questionnaire de satisfaction",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="fr">
            <body>
                <header>
                    <h1>Questionnaire de satisfaction</h1>
                </header>
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}
