'use client'
import { useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Context untuk share state antara PageSwitcher dan PageWrapper
const PageContext = createContext();

export const PageSwitcher = ({ pages, children }) => {
    const [activeTab, setActiveTab] = useState(pages[0]);
    const [direction, setDirection] = useState(0);

    const handleTabChange = (newTab) => {
        const currentIndex = pages.indexOf(activeTab);
        const newIndex = pages.indexOf(newTab);
        setDirection(newIndex > currentIndex ? 1 : -1);
        setActiveTab(newTab);
    };

    // Reorder tabs: active tab selalu di index 0
    const orderedTabs = [
        activeTab,
        ...pages.filter(tab => tab !== activeTab)
    ];

    return (
        <PageContext.Provider value={{ activeTab, direction }}>
            <div className="">
                <div className="margin spacing flex items-end gap-4 mb-12">
                    <AnimatePresence mode="popLayout">
                        {orderedTabs.map((tab) => {
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
                                    onClick={() => handleTabChange(tab)}
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

                {/* Content wrapper */}
                <div className="relative overflow-hidden min-h-[400px]">
                    {children}
                </div>
            </div>
        </PageContext.Provider>
    );
};

export const PageWrapper = ({ id, children }) => {
    const { activeTab, direction } = useContext(PageContext);
    const isActive = activeTab === id;

    const variants = {
        enter: (direction) => ({
            y: direction > 0 ? '100%' : '-100%',
            opacity: 0,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
        }),
        center: {
            y: 0,
            opacity: 1,
            position: 'relative',
        },
        exit: (direction) => ({
            y: direction > 0 ? '-100%' : '100%',
            opacity: 0,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
        })
    };

    return (
        <AnimatePresence mode="wait" custom={direction}>
            {isActive && (
                <motion.div
                    key={id}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "inertia", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    className="w-full"
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};