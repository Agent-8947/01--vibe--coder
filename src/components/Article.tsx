import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { motion } from 'framer-motion';

export const Article: React.FC<{ id: string, type: string, localOverrides: any }> = ({ id, type, localOverrides }) => {
    const { globalSettings } = useStore();
    const [currentDate, setCurrentDate] = useState('');

    const data = localOverrides?.data || {};
    const layout = localOverrides?.layout || {};
    const styleData = localOverrides?.style || {};

    // System DNA Colors
    const gl02 = globalSettings['GL02']?.params || [];
    const accent = gl02[2]?.value || '#3B82F6';
    const textPrim = gl02[3]?.value || '#ffffff';
    const textSec = gl02[4]?.value || '#A1A1AA';

    // System DNA Typography
    const gl01 = globalSettings['GL01']?.params || [];
    const baseFont = gl01[7]?.value || 'Inter';

    useEffect(() => {
        // Generates current date and time in en-GB format
        const now = new Date();
        const formattedDate = now.toLocaleDateString('en-GB') + ' ' +
            now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        setCurrentDate(formattedDate);
    }, []);

    // Handle B0403 System Loader case
    if (type === 'B0403') {
        return (
            <section
                id={id}
                className="w-full flex flex-col items-center justify-center min-h-[400px] relative font-mono overflow-hidden"
                style={{
                    paddingTop: `${layout.paddingY || 120}px`,
                    paddingBottom: `${layout.paddingY || 120}px`,
                    backgroundColor: styleData.backgroundColor || 'transparent'
                }}
            >
                <div className="flex flex-col items-center gap-8 z-10">
                    {/* Infinite Spinner */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="w-12 h-12 border-2 rounded-full"
                        style={{
                            borderColor: `${accent}20`,
                            borderTopColor: accent
                        }}
                    />

                    <div className="text-center space-y-3">
                        {/* Pulsing Loading Text */}
                        <motion.div
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="text-sm font-black uppercase tracking-[0.6em]"
                            style={{ color: accent }}
                        >
                            LOADING DATA...
                        </motion.div>

                        {/* Timestamp */}
                        <div
                            className="text-[10px] uppercase tracking-[0.2em] opacity-40 font-bold"
                            style={{ color: textPrim }}
                        >
                            Last update date: {currentDate}
                        </div>
                    </div>
                </div>

                {/* Status indicator */}
                <div
                    className="absolute bottom-6 right-10 text-[8px] opacity-10 uppercase tracking-widest font-mono"
                    style={{ color: textPrim }}
                >
                    Status: Infinite_Sync_Active
                </div>
            </section>
        );
    }

    return (
        <section
            id={id}
            className="w-full flex flex-col items-center relative"
            style={{
                paddingTop: `${layout.paddingY || 120}px`,
                paddingBottom: `${layout.paddingY || 120}px`,
                fontFamily: baseFont
            }}
        >
            <div
                className="w-full px-8 z-10"
                style={{
                    maxWidth: `${layout.maxWidth || 850}px`,
                    textAlign: layout.textAlign || 'left'
                }}
            >
                {data.subtitle && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 0.5, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-xs font-bold uppercase tracking-[0.2em] mb-4"
                        style={{ color: textPrim }}
                    >
                        {data.subtitle}
                    </motion.div>
                )}

                {data.title && (
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black tracking-tight mb-8 leading-tight"
                        style={{ color: textPrim }}
                    >
                        {data.title}
                    </motion.h2>
                )}

                {data.body && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 0.8, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg whitespace-pre-wrap"
                        style={{
                            color: textSec,
                            fontSize: `${styleData.fontSize || 18}px`,
                            lineHeight: styleData.lineHeight || 1.8
                        }}
                    >
                        {data.body}
                    </motion.div>
                )}
            </div>
        </section>
    );
};