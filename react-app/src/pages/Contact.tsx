import React from 'react';
import MainLayout from '../layouts/MainLayout';
import profileData from '../data/profile.json';

/**
 * Contact page summary:
 * Provides contact information and social media links.
 * Features a prominent profile card and a list of external links.
 */

const Contact: React.FC = () => {
    return (
        <MainLayout title="联系我">
            <header className="pt-8 pb-3 px-6 bg-white shrink-0">
                <h1 className="text-3xl font-black text-gray-900 mb-1.5 tracking-tight">
                    联系我
                </h1>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest opacity-80">
                    {profileData.contactTitle}
                </p>
            </header>

            <main className="p-4 pb-24 max-w-2xl mx-auto">
                {/* Profile Card */}
                <div
                    className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 text-center mb-10 overflow-hidden relative"
                >
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent pointer-events-none"
                    >
                    </div>
                    <div className="relative z-10">
                        <div
                            className="w-24 h-24 bg-black rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold text-white shadow-xl shadow-black/10"
                        >
                            {profileData.avatarUrl ? (
                                <img
                                    src={profileData.avatarUrl}
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                "Me"
                            )}
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 mb-2">
                            {profileData.name}
                        </h2>
                        <p
                            className="text-gray-400 text-sm font-medium mb-8 max-w-xs mx-auto leading-relaxed"
                        >
                            {profileData.contactText}
                        </p>

                        <a
                            href={`mailto:${profileData.email}`}
                            className="inline-block bg-black text-white text-sm font-bold px-10 py-3.5 rounded-full hover:bg-gray-800 transition-all duration-300 shadow-xl shadow-black/10 active:scale-95"
                        >
                            发送邮件
                        </a>
                    </div>
                </div>

                {/* Social Links --> */}
                <div className="space-y-3 px-2">
                    <h3
                        className="text-[11px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4"
                    >
                        社交媒体
                    </h3>
                    {profileData.socials
                        .filter((s) => s.visible !== false)
                        .map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 group shadow-sm"
                            >
                                <span className="font-bold text-gray-700 group-hover:text-black transition-colors">
                                    {social.name}
                                </span>
                                <span className="text-gray-300 group-hover:text-gray-500 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                                    ↗
                                </span>
                            </a>
                        ))}
                </div>
            </main>
        </MainLayout>
    );
};

export default Contact;
