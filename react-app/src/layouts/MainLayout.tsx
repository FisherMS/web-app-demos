import React from 'react';
import BottomMenu from '../components/BottomMenu';
import profileData from '../data/profile.json';
import '../styles/global.css';

/**
 * MainLayout component summary:
 * The primary layout wrapper for the application.
 * Manages SEO-related head elements (simulated via props) and common UI pieces like navigation.
 */

interface MainLayoutProps {
    children: React.ReactNode;
    title: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title }) => {
    const siteName = profileData.name || "设计作品集";
    const pageTitle = `${title} | ${siteName}`;

    // In a real React app, you'd use react-helmet-async for head management.
    // For this conversion, we'll assume the browser title and global body styles are enough.
    React.useEffect(() => {
        document.title = pageTitle;
    }, [pageTitle]);

    return (
        <div className="bg-gray-50 text-gray-900 font-sans antialiased pb-20 min-h-screen">
            <main>
                {children}
            </main>
            <BottomMenu />
        </div>
    );
};

export default MainLayout;
