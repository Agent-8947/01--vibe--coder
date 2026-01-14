
import React from 'react';
import { useStore } from '../store';

export const Footer: React.FC<{ id: string, localOverrides: any, isPreview?: boolean }> = ({ id, localOverrides: overrides, isPreview = true }) => {
    const { globalSettings } = useStore();
    const gl02 = globalSettings['GL02'].params;

    const handleLinkClick = (e: React.MouseEvent) => {
        if (isPreview) {
            e.preventDefault();
            console.log("Navigation blocked in constructor mode.");
        }
    };

    const style = {
        paddingTop: (overrides.layout?.paddingTop || '100') + 'px',
        paddingBottom: (overrides.layout?.paddingBottom || '60') + 'px',
        backgroundColor: overrides.style?.bgFill || overrides.style?.background || 'transparent',
        color: overrides.style?.textColor || 'var(--dna-text-prim)',
        fontFamily: 'var(--dna-font-family)',
        borderTop: `1px solid ${gl02[5].value}15`
    };

    return (
        <footer style={style} className="w-full flex flex-col items-center gap-12 px-8">
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4">
                <a href="#" className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-all duration-300 hover:tracking-[0.3em]" onClick={handleLinkClick}>Privacy Policy</a>
                <a href="#" className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-all duration-300 hover:tracking-[0.3em]" onClick={handleLinkClick}>Terms of Service</a>
                <a href="#" className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-all duration-300 hover:tracking-[0.3em]" onClick={handleLinkClick}>Contact</a>
                <a href="https://github.com/Agent-8947" className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-all duration-300 hover:tracking-[0.3em]" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>

            <div className="flex flex-col items-center gap-2">
                <div className="text-[9px] uppercase tracking-[0.4em] opacity-20 font-black">
                    {overrides.data?.companyName || 'Yura Rulev'} — Vibe Coder
                </div>
                <div className="text-[8px] uppercase tracking-[0.2em] opacity-10">
                    © {new Date().getFullYear()} Architectural Protocol. All rights reserved.
                </div>
            </div>
        </footer>
    );
};
