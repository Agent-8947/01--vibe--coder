
import React, { useState } from 'react';
import { useStore } from '../store';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Database, Palette, Zap, Cloud, Shield } from 'lucide-react';

export const TechStack: React.FC<{ id: string, localOverrides: any }> = ({ id, localOverrides }) => {
    const { globalSettings } = useStore();
    const gl02 = globalSettings['GL02'].params;
    const gl07 = globalSettings['GL07'].params;
    const gl09 = globalSettings['GL09'].params;

    const textPrim = gl02[3].value;
    const accent = gl02[2].value;
    const border = gl02[5].value;

    // GL09 Animations
    const animDuration = parseFloat(gl09[0].value);
    const animEntranceY = parseFloat(gl09[2].value);

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const data = localOverrides.data || {
        title: 'Technology Stack',
        description: 'Cutting-edge tools and frameworks powering our solutions',
        categories: [
            {
                id: 'frontend',
                name: 'Frontend',
                icon: 'code',
                color: '#3B82F6',
                technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
            },
            {
                id: 'backend',
                name: 'Backend',
                icon: 'database',
                color: '#10B981',
                technologies: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Redis']
            },
            {
                id: 'design',
                name: 'Design',
                icon: 'palette',
                color: '#F59E0B',
                technologies: ['Figma', 'Adobe XD', 'Sketch', 'Blender', 'After Effects']
            },
            {
                id: 'devops',
                name: 'DevOps',
                icon: 'cloud',
                color: '#8B5CF6',
                technologies: ['Docker', 'Kubernetes', 'AWS', 'Vercel', 'GitHub Actions']
            },
            {
                id: 'tools',
                name: 'Tools',
                icon: 'zap',
                color: '#EC4899',
                technologies: ['Git', 'VS Code', 'Postman', 'Jira', 'Notion']
            },
            {
                id: 'security',
                name: 'Security',
                icon: 'shield',
                color: '#EF4444',
                technologies: ['OAuth', 'JWT', 'SSL/TLS', 'OWASP', 'Cloudflare']
            }
        ]
    };

    const layout = localOverrides.layout || { paddingY: '80' };

    const getIcon = (iconName: string) => {
        const icons: Record<string, any> = {
            code: Code2,
            database: Database,
            palette: Palette,
            zap: Zap,
            cloud: Cloud,
            shield: Shield
        };
        const IconComponent = icons[iconName] || Code2;
        return <IconComponent size={24} />;
    };

    return (
        <motion.div
            id={id}
            initial={{ opacity: 0, y: animEntranceY }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: animDuration }}
            className="w-full px-6"
            style={{
                paddingTop: `${layout.paddingY}px`,
                paddingBottom: `${layout.paddingY}px`
            }}
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                {data.title && (
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-black uppercase mb-6"
                            style={{ color: textPrim, fontFamily: 'var(--dna-font-family)' }}
                        >
                            {data.title}
                        </motion.h2>
                        {data.description && (
                            <p className="text-lg opacity-50 max-w-2xl mx-auto" style={{ color: textPrim }}>
                                {data.description}
                            </p>
                        )}
                    </div>
                )}

                {/* Interactive Grid - Flexible row */}
                <div className="flex flex-wrap justify-center gap-6">
                    {data.categories?.map((category: any, index: number) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05, duration: animDuration }}
                            className="flex-1 min-w-[130px] max-w-[200px]"
                        >
                            <button
                                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                                className="w-full p-6 border transition-all duration-500 hover:-translate-y-1 group flex flex-col items-center relative overflow-hidden"
                                style={{
                                    borderColor: selectedCategory === category.id ? category.color : `${border}40`,
                                    borderRadius: `${gl07[0].value}px`,
                                    backgroundColor: selectedCategory === category.id ? `${category.color}15` : 'rgba(255,255,255,0.02)',
                                    backdropFilter: 'blur(10px)',
                                    boxShadow: selectedCategory === category.id ? `0 10px 30px -10px ${category.color}40` : 'none'
                                }}
                            >
                                {/* Selection Indicator */}
                                {selectedCategory === category.id && (
                                    <motion.div
                                        layoutId="category-glow"
                                        className="absolute inset-0 pointer-events-none"
                                        style={{
                                            background: `radial-gradient(circle at center, ${category.color}20 0%, transparent 70%)`
                                        }}
                                    />
                                )}

                                {/* Icon */}
                                <div
                                    className="mb-4 transition-all duration-500 flex justify-center scale-110"
                                    style={{
                                        color: selectedCategory === category.id ? category.color : textPrim,
                                        opacity: selectedCategory === category.id ? 1 : 0.4
                                    }}
                                >
                                    {getIcon(category.icon)}
                                </div>

                                {/* Name */}
                                <div
                                    className="text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 text-center"
                                    style={{
                                        color: selectedCategory === category.id ? category.color : textPrim,
                                        opacity: selectedCategory === category.id ? 1 : 0.6
                                    }}
                                >
                                    {category.name}
                                </div>

                                {/* Count - Hidden on very small screens, visible on md+ */}
                                {category.technologies?.length > 0 && (
                                    <div className="hidden md:block text-[9px] font-bold uppercase tracking-widest opacity-20 mt-2">
                                        {category.technologies.length} Tools
                                    </div>
                                )}
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Technologies List */}
                <AnimatePresence mode="wait">
                    {selectedCategory && (
                        <motion.div
                            key={selectedCategory}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-8 overflow-hidden"
                        >
                            <div
                                className="p-8 border"
                                style={{
                                    borderColor: data.categories.find((c: any) => c.id === selectedCategory)?.color || accent,
                                    borderRadius: `${gl07[0].value}px`,
                                    backgroundColor: `${data.categories.find((c: any) => c.id === selectedCategory)?.color || accent}05`,
                                    borderWidth: '2px'
                                }}
                            >
                                <h3
                                    className="text-2xl font-black uppercase mb-6"
                                    style={{
                                        color: data.categories.find((c: any) => c.id === selectedCategory)?.color || accent,
                                        fontFamily: 'var(--dna-font-family)'
                                    }}
                                >
                                    {data.categories.find((c: any) => c.id === selectedCategory)?.name}
                                </h3>

                                <div className="flex flex-wrap gap-3">
                                    {data.categories
                                        .find((c: any) => c.id === selectedCategory)
                                        ?.technologies?.map((tech: string, idx: number) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="px-4 py-2 border font-bold text-sm"
                                                style={{
                                                    borderColor: data.categories.find((c: any) => c.id === selectedCategory)?.color || accent,
                                                    borderRadius: `${gl07[0].value}px`,
                                                    color: textPrim,
                                                    backgroundColor: 'rgba(255,255,255,0.5)'
                                                }}
                                            >
                                                {tech}
                                            </motion.div>
                                        ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};
