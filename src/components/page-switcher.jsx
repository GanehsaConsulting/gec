'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineArrowOutward } from 'react-icons/md';

export const PageSwitcher = () => {
    const [activeTab, setActiveTab] = useState('Activity');

    const tabs = ['Activity', 'Article'];

    // Reorder tabs: active tab selalu di index 0
    const orderedTabs = [
        activeTab,
        ...tabs.filter(tab => tab !== activeTab)
    ];

    return (
        <main className="margin spacing pt-40">
            <div className="flex items-end gap-4">
                <AnimatePresence mode="popLayout">
                    {orderedTabs.map((tab, index) => {
                        const isActive = tab === activeTab;

                        return (
                            <motion.button
                                key={tab}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{
                                    opacity: isActive ? 1 : 0.4,
                                    scale: 1,
                                }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{
                                    layout: {
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30
                                    },
                                    opacity: { duration: 0.2 }
                                }}
                                onClick={() => setActiveTab(tab)}
                                className="relative"
                            >
                                <motion.p
                                    layout
                                    className={`flex items-end justify-end gap-1 cursor-pointer tracking-tighter text-balance pb-1 transition-all duration-300 hover:font-semibold hover:scale-105
                                        ${isActive
                                            ? 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl'
                                            : 'text-2xl md:text-3xl lg:text-4xl font-normal'
                                        }`}
                                >
                                    {tab}
                                </motion.p>
                            </motion.button>
                        );
                    })}
                </AnimatePresence>
            </div>
        </main>
    );
};