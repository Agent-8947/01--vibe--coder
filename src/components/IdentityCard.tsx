import React, { useRef, useState } from 'react';
import { useStore } from '../store';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';

export const IdentityCard: React.FC<{ id: string, localOverrides: any, isPreview?: boolean }> = ({ id, localOverrides, isPreview = true }) => {
    const { globalSettings, updateBlockLocal } = useStore();
    const gl02 = globalSettings['GL02'].params;
    const gl07 = globalSettings['GL07'].params;

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

    const data = localOverrides.data || {
        title: 'IDENTITY PROFILE',
        subtitle: 'Digital Access Card',
        images: [
            { url: 'https://placehold.co/100', shape: 'circle' },
            { url: 'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=DNA', shape: 'square' },
            { url: 'https://placehold.co/100', shape: 'circle' }
        ],
        buttons: [{ label: 'Contact', url: '#' }],
        text: 'Identity Block V1.0'
    };

    const layoutConfig = localOverrides.layout || {};
    const paddingY = layoutConfig.paddingY || '40';
    const titleSize = layoutConfig.titleSize || '18';
    const subtitleSize = layoutConfig.subtitleSize || '12';
    const textSize = layoutConfig.textSize || '12';
    const textLineHeight = layoutConfig.textLineHeight || '1.2';
    const textSpacing = layoutConfig.textSpacing || '0';

    const accent = gl02[2].value;

    const handleButtonClick = (e: React.MouseEvent) => {
        if (isPreview) {
            e.preventDefault();
            console.log("Navigation blocked in constructor mode.");
        }
    };

    const handleImageClick = (index: number) => {
        if (!isPreview) return;
        setActiveImageIndex(index);
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && activeImageIndex !== null) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newImages = [...data.images];
                newImages[activeImageIndex] = { ...newImages[activeImageIndex], url: reader.result as string };
                updateBlockLocal(id, 'data.images', newImages);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <section id={id} className="w-full flex justify-center px-4" style={{ paddingTop: `${paddingY}px`, paddingBottom: `${paddingY}px` }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="max-w-sm w-full p-8 border relative overflow-hidden group"
                style={{
                    backgroundColor: localOverrides.style?.bgFill || 'rgba(255,255,255,0.02)',
                    backdropFilter: 'blur(20px)',
                    borderColor: `${gl02[2].value}20`,
                    borderRadius: `${gl07[0].value}px`,
                    fontFamily: 'var(--dna-font-family)',
                    boxShadow: `0 20px 50px -12px ${gl02[2].value}15`
                }}
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-2 h-2 border-l border-t" style={{ borderColor: accent }} />
                <div className="absolute top-0 right-0 w-2 h-2 border-r border-t" style={{ borderColor: accent }} />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b" style={{ borderColor: accent }} />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b" style={{ borderColor: accent }} />

                {/* Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

                {/* Header */}
                <div className="w-full flex justify-between items-start mb-8">
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black tracking-[0.3em] opacity-30 leading-none mb-1">SYSTEM://AUTH</span>
                        <h3 className="font-black uppercase tracking-tight leading-none" style={{ color: gl02[3].value, fontSize: `${titleSize}px` }}>
                            {data.title}
                        </h3>
                    </div>
                    <div className="text-[10px] font-mono opacity-20">#{id.slice(0, 8)}</div>
                </div>

                {/* Primary Image Slot */}
                <div className="relative mb-8 group/img">
                    <div
                        onClick={() => handleImageClick(1)}
                        className={`relative w-24 h-24 overflow-hidden border-2 transition-all duration-500 ${isPreview ? 'cursor-pointer group-hover/img:scale-105' : ''}`}
                        style={{
                            borderColor: `${accent}40`,
                            borderRadius: data.images[1]?.shape === 'circle' ? '999px' : `${gl07[3].value}px`
                        }}
                    >
                        <img src={data.images[1]?.url} className="w-full h-full object-cover" alt="Primary Identity" />
                        {isPreview && (
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                                <Upload className="text-white" size={24} />
                            </div>
                        )}
                    </div>
                    {/* Animated Ring */}
                    <div className="absolute -inset-2 border border-dashed rounded-full opacity-10 animate-[spin_20s_linear_infinite]" style={{ borderColor: accent }} />
                </div>

                {/* Metadata Grid */}
                <div className="w-full space-y-4 mb-8">
                    <div className="flex justify-between border-b pb-2" style={{ borderColor: `${gl02[5].value}20` }}>
                        <span className="text-[9px] font-black opacity-30 uppercase tracking-widest">Classification</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: accent }}>{data.subtitle}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2" style={{ borderColor: `${gl02[5].value}20` }}>
                        <span className="text-[9px] font-black opacity-30 uppercase tracking-widest">Visual Hash</span>
                        <div className="flex gap-2">
                            {data.images.filter((_: any, i: number) => i !== 1).map((img: any, i: number) => (
                                <div
                                    key={i}
                                    onClick={() => handleImageClick(i === 0 ? 0 : 2)}
                                    className={`w-6 h-6 border bg-black/10 overflow-hidden ${isPreview ? 'cursor-pointer' : ''}`}
                                    style={{
                                        borderColor: `${gl02[5].value}40`,
                                        borderRadius: '2px'
                                    }}
                                >
                                    <img src={img.url} className="w-full h-full object-cover grayscale opacity-50" alt="" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Action Area */}
                <div className="w-full flex flex-col gap-4">
                    {data.buttons.map((btn: any, i: number) => (
                        <a
                            key={i}
                            href={btn.url}
                            onClick={handleButtonClick}
                            className="w-full py-4 text-[10px] font-black uppercase tracking-[0.3em] text-center transition-all relative overflow-hidden group/btn"
                            style={{ backgroundColor: accent, color: '#FFF', borderRadius: '4px' }}
                        >
                            <span className="relative z-10">{btn.label}</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                        </a>
                    ))}

                    <div
                        className="text-[9px] text-center opacity-40 font-mono tracking-tighter"
                        style={{ color: gl02[3].value, fontSize: `${textSize}px` }}
                    >
                        {data.text || 'ENCRYPTED_STREAM_ID: 0x9942'}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};
