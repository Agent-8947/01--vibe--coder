
import React, { useState, useEffect } from 'react';
import { useStore } from '../store';

interface HeroProps {
    id: string;
    type: string;
    localOverrides: any;
    currentLang?: string;
}

export const Hero: React.FC<HeroProps> = ({ id, type, localOverrides: overrides, currentLang = 'en' }) => {
    const { globalSettings, viewportMode } = useStore();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const isMobileMode = isMobile || viewportMode === 'mobile';

    // DNA Binding Engine
    const gl01 = globalSettings['GL01'].params; // Typography
    const gl02 = globalSettings['GL02'].params; // Colors
    const gl03 = globalSettings['GL03'].params; // Spacing
    const gl04 = globalSettings['GL04'].params; // Buttons
    const gl07 = globalSettings['GL07'].params; // Radius
    const gl09 = globalSettings['GL09'].params; // Animation
    const gl06 = globalSettings['GL06'].params; // Effects

    const safeData = overrides.data || {
        title: "DESIGN DRIVEN BY DNA",
        description: "Configure your interface through global genetic parameters or local overrides.",
        primaryBtnText: "Get Started",
        primaryBtnVisible: true,
        secondaryBtnText: "Documentation",
        secondaryBtnVisible: true
    };

    // Translation helper function
    const getTranslatedText = (key: string): string => {
        if (currentLang === 'en' || !currentLang) {
            return safeData[key] || '';
        }
        const translatedKey = `${key}_${currentLang}`;
        const result = safeData[translatedKey] || safeData[key] || '';

        // Debug logging
        const availableKeys = Object.keys(safeData).filter(k => k.startsWith(key));
        console.log(`[Hero Translation] key="${key}", lang="${currentLang}", translatedKey="${translatedKey}", result="${result}", availableKeys:`, availableKeys);

        return result;
    };

    const layout = overrides.layout || { height: '70vh', alignment: 'center', paddingTop: '80px' };

    // Motion Engine
    const [motionKey, setMotionKey] = useState(0);
    const isLocalAnim = overrides.animation?.useGlobal === false;
    const m = {
        duration: isLocalAnim ? overrides.animation.duration : gl09[0].value,
        stagger: isLocalAnim ? overrides.animation.stagger : gl09[1].value,
        entranceY: isLocalAnim ? overrides.animation.entranceY : gl09[2].value,
        scale: isLocalAnim ? (overrides.animation.scale || gl09[3].value) : gl09[3].value,
        blur: isLocalAnim ? (overrides.animation.blur || gl09[4].value) : gl09[4].value,
    };

    useEffect(() => {
        setMotionKey(prev => prev + 1);
    }, [m.duration, m.stagger, m.entranceY, m.scale, m.blur]);

    const getEntranceStyle = (index: number) => ({
        opacity: 0,
        transform: `translateY(${m.entranceY}px) scale(${m.scale})`,
        filter: `blur(${m.blur}px)`,
        transition: `all ${m.duration}s cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: `${index * m.stagger}s`,
        animation: `entrance-${id}-${motionKey} ${m.duration}s cubic-bezier(0.16, 1, 0.3, 1) ${index * m.stagger}s forwards`
    });

    // Typography Inheritance
    const getTypoStyle = (typo: any, defaults: any) => {
        const useGlobal = !typo || typo.useGlobal !== false;
        if (useGlobal) return defaults;
        return {
            fontSize: (typo.fontSize || String(defaults.fontSize ?? '').replace('px', '')) + 'px',
            fontWeight: typo.fontWeight || defaults.fontWeight,
            letterSpacing: (typo.letterSpacing !== undefined ? typo.letterSpacing : String(defaults.letterSpacing ?? '').replace('em', '')) + 'em',
            lineHeight: typo.lineHeight || defaults.lineHeight,
            // Prioritize local uppercase preference if defined, else fallback to global
            textTransform: (typo.uppercase !== undefined ? (typo.uppercase ? 'uppercase' : 'none') : (gl01[5].value === 'true' ? 'uppercase' : 'none')) as any,
            WebkitFontSmoothing: gl01[6].value === 'true' ? 'antialiased' : 'auto'
        };
    };

    const titleStyle = {
        ...getTypoStyle(safeData.titleTypo, {
            fontSize: isMobileMode ? 'calc(var(--dna-unit) * 3.25)' : 'calc(var(--dna-unit) * 6)',
            fontWeight: gl01[3].value,
            letterSpacing: gl01[4].value + 'em',
            lineHeight: '1.1',
            textTransform: gl01[5].value === 'true' ? 'uppercase' as const : 'none' as const,
            WebkitFontSmoothing: gl01[6].value === 'true' ? 'antialiased' : 'auto'
        }),
        color: overrides.style?.titleColor || overrides.style?.textColor || gl02[3].value,
        fontFamily: 'var(--dna-font-family)',
        whiteSpace: 'pre-line' as const
    };

    const descStyle = {
        ...getTypoStyle(safeData.descriptionTypo, {
            fontSize: isMobileMode ? 'calc(var(--dna-unit) * 1.125)' : 'calc(var(--dna-unit) * 1.5)',
            fontWeight: '400',
            letterSpacing: '0',
            lineHeight: '1.6',
            textTransform: 'none' as const,
            WebkitFontSmoothing: gl01[6].value === 'true' ? 'antialiased' : 'auto'
        }),
        color: overrides.style?.descColor || overrides.style?.textColor || gl02[4].value,
        fontFamily: 'var(--dna-font-family)',
        whiteSpace: 'pre-line' as const
    };

    const px = overrides.layout?.paddingX || gl03[2].value;
    const py = overrides.layout?.paddingY || gl03[3].value;

    const containerStyle: React.CSSProperties = {
        minHeight: layout.height || '70vh',
        backgroundColor: overrides.background?.lockBackground
            ? overrides.background.fixedColor
            : (overrides.style?.bgFill || 'transparent'),
        padding: isMobileMode ? '40px 16px' : `${py}px ${px}px`,
        display: 'flex',
        flexDirection: isMobileMode
            ? 'column'
            : (overrides.media?.imagePosition === 'left' ? 'row-reverse' :
                overrides.media?.imagePosition === 'top' ? 'column-reverse' :
                    overrides.media?.imagePosition === 'bottom' ? 'column' : 'row'),
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: (layout.alignment as any || 'center'),
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.5s ease-out'
    };

    const renderButton = (text: string, isPrimary: boolean) => {
        const useGlobal = overrides.btnUseGlobal !== false;
        const b = useGlobal ? {
            size: gl04[0].value,
            padX: gl04[1].value,
            padY: gl04[2].value,
            font: gl04[3].value,
            stroke: gl04[4].value,
            radius: gl04[5].value,
            shadow: gl04[6].value
        } : (overrides.btnStyles || {
            size: "1.0", padX: "24", padY: "12", font: "12", stroke: "1", radius: "4", shadow: "false"
        });

        return (
            <button
                style={{
                    padding: `${parseFloat(b.padY) * parseFloat(b.size)}px ${parseFloat(b.padX) * parseFloat(b.size)}px`,
                    minHeight: isMobileMode ? '48px' : '0',
                    backgroundColor: isPrimary ? (gl02[2]?.value || '#3B82F6') : 'transparent',
                    color: isPrimary ? 'white' : (overrides.style?.descColor || gl02[3].value),
                    borderRadius: b.radius + 'px',
                    fontSize: (parseFloat(b.font) * parseFloat(b.size)) + 'px',
                    fontWeight: 600,
                    border: isPrimary ? 'none' : `${b.stroke}px solid rgba(0,0,0,0.1)`,
                    boxShadow: (isPrimary && b.shadow === 'true') ? '0 10px 30px -10px rgba(59, 130, 246, 0.5)' : 'none',
                    fontFamily: 'var(--dna-font-family)'
                }}
                className="active:scale-95 transition-all duration-300 whitespace-nowrap"
            >
                {text}
            </button>
        );
    };

    const hasImage = overrides.media?.showImage && overrides.media?.imageUrl;
    const mediaPos = overrides.media?.imagePosition || 'right';

    // Mobile: Stack mode (Image Top, Text Bottom)
    // We treat mobile as 'top' position to allow stacking
    const effectivePos = isMobileMode && hasImage ? 'top' : mediaPos;
    const isSplit = hasImage && ['left', 'right', 'top', 'bottom'].includes(effectivePos);
    // On mobile, we do NOT use full background essentially, we split. 
    // Unless the USER specifically set 'background' which we might want to respect, 
    // BUT the user request says "photo first, text under". 
    // So for mobile we force split-top logic if an image exists.
    const isFullBg = hasImage && (overrides.media?.imagePosition === 'background' && !isMobileMode);

    // Mobile uses normal opacity or overrides
    const imageOpacity = (overrides.media?.imageOpacity || 100) / 100;

    const shapeStyles: Record<string, string> = {
        square: 'aspect-square rounded-none',
        circle: 'aspect-square rounded-full',
        portrait: 'aspect-[3/4] rounded-2xl',
        landscape: 'aspect-[16/9] rounded-2xl'
    };
    const shapeClass = shapeStyles[overrides.media?.shape] ||
        ((mediaPos === 'top' || mediaPos === 'bottom' || isMobileMode) ? 'aspect-[4/3] w-full rounded-2xl' : 'aspect-video md:aspect-square lg:aspect-[4/3] rounded-2xl');

    return (
        <section id={id} style={containerStyle} className="w-full relative overflow-hidden group">
            <style>{`
                @keyframes entrance-${id}-${motionKey} {
                    to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
                }
                @keyframes levitate-${id} {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                    100% { transform: translateY(0px); }
                }
            `}</style>

            {/* Background "Substrate" Layer (Desktop Full BG only) */}
            {hasImage && isFullBg && (
                <div
                    className="absolute inset-0 z-0 transition-opacity duration-700 pointer-events-none"
                    style={{ opacity: imageOpacity }}
                >
                    <img
                        src={overrides.media.imageUrl}
                        className="w-full h-full object-cover"
                        alt="Hero background"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                </div>
            )}

            {/* Background DNA Blur Effects (Hidden if Full BG is high opacity) */}
            <div className={`absolute top-0 left-0 w-full h-full -z-10 opacity-20 pointer-events-none transition-opacity ${isFullBg ? 'opacity-0' : 'opacity-20'}`}>
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
            </div>

            <div className={`relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center gap-8 md:gap-20 transition-all duration-500
                ${!isMobileMode ? (
                    mediaPos === 'left' ? 'md:flex-row' :
                        mediaPos === 'top' ? 'md:flex-col' :
                            mediaPos === 'bottom' ? 'md:flex-col-reverse' :
                                'md:flex-row-reverse'
                ) : ''}
            `}>

                {/* 1. IMAGE CONTAINER (First in DOM for Mobile Stack) */}
                {hasImage && !isFullBg && (
                    <div style={getEntranceStyle(3)} className={`
                        relative w-full overflow-hidden
                        ${isMobileMode ? 'h-[50vh] min-h-[400px] mb-8' : 'hidden md:flex md:w-1/2 justify-center items-center'}
                    `}>
                        <div
                            className={`relative w-full h-full overflow-hidden
                                ${isMobileMode ? 'rounded-b-3xl' : shapeClass}
                            `}
                            style={{
                                boxShadow: isMobileMode ? 'none' : `0px ${parseFloat(gl06[0]?.value || '10')}px ${parseFloat(gl06[1]?.value || '40')}px rgba(0,0,0,0.3)`,
                                border: isMobileMode ? 'none' : `${gl06[4]?.value || '1'}px solid rgba(255,255,255,0.1)`,
                                animation: (!isMobileMode && overrides.media?.levitation) ? `levitate-${id} ${overrides.media?.levitationSpeed || 3}s ease-in-out infinite` : 'none',
                            }}
                        >
                            <img
                                src={overrides.media.imageUrl}
                                className={`w-full h-full object-cover transition-transform duration-1000 
                                    ${isMobileMode ? 'scale-100' : 'group-hover:scale-110'}
                                `}
                                style={{
                                    opacity: imageOpacity,
                                    transform: isMobileMode ? 'none' : `scale(${(overrides.media?.imageScale || 110) / 100})`
                                }}
                                alt="Hero media"
                            />
                            {/* Mobile visual separation gradient at bottom of image */}
                            {isMobileMode && <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-50" />}
                        </div>
                    </div>
                )}

                {/* 2. TEXT CONTENT (Second in DOM for Mobile Stack) */}
                <div className={`
                    flex flex-col
                    ${isMobileMode ? 'w-full px-6' : (isSplit ? 'md:w-[45%]' : 'w-full max-w-4xl')}
                    ${layout.alignment === 'center' && !isMobileMode ? 'text-center mx-auto' : 'text-left'}
                `}>
                    <h1 style={{
                        ...titleStyle,
                        ...getEntranceStyle(0),
                        fontSize: isMobileMode ? '3.5rem' : undefined,
                        lineHeight: isMobileMode ? '0.9' : undefined,
                    }} className="font-black tracking-tighter mb-6">
                        {getTranslatedText('title')}
                    </h1>

                    <p style={{
                        ...descStyle,
                        ...getEntranceStyle(1),
                    }} className={`opacity-80 max-w-2xl font-medium tracking-tight text-lg md:text-2xl mb-8 ${layout.alignment === 'center' && !isMobileMode ? 'mx-auto' : ''}`}>
                        {getTranslatedText('description')}
                    </p>

                    <div style={getEntranceStyle(2)} className={`flex items-center gap-4 ${layout.alignment === 'center' && !isMobileMode ? 'justify-center' : 'justify-start'}`}>
                        {safeData.primaryBtnVisible !== false && renderButton(getTranslatedText('primaryBtnText'), true)}
                        {safeData.secondaryBtnVisible !== false && renderButton(getTranslatedText('secondaryBtnText'), false)}
                    </div>
                </div>

            </div>
        </section>
    );
};
