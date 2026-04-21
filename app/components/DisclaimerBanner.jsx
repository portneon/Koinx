"use client"
import React, { useState } from 'react';
import { Info, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const DisclaimerBanner = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { isDark } = useTheme();

    const styles = {
        wrapper: {
            border: isDark ? '1px solid #1E3A5F' : '1px solid #BFDBFE',
            borderRadius: 'var(--radius-md)',
            background: isDark ? '#0D1E33' : '#EFF6FF',
            overflow: 'hidden',
            transition: 'background 0.2s ease, border-color 0.2s ease',
        },
        button: {
            width: '100%', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', padding: '14px 16px',
            background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
        },
        titleText: {
            fontSize: '14px', fontWeight: 600,
            color: isDark ? '#93C5FD' : '#1E3A8A',
        },
        expandedArea: {
            borderTop: isDark ? '1px solid #1E3A5F' : '1px solid #BFDBFE',
            padding: '0 16px 16px',
        },
        listItem: {
            fontSize: '13px',
            color: isDark ? '#94A3B8' : '#1E40AF',
            lineHeight: '1.6',
            listStyle: 'disc',
        },
        link: {
            color: isDark ? '#60A5FA' : '#2563EB',
            textDecoration: 'underline',
        },
        accentColor: isDark ? '#60A5FA' : '#2563EB',
    };

    const items = [
        <>
            Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.{' '}
            <a href="https://help.koinx.com/hc/en-us/articles/tax-loss-harvesting-india" target="_blank" rel="noopener noreferrer" style={styles.link}>
                Know More
            </a>
        </>,
        'Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.',
        'Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.',
        'Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.',
        'Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.',
    ];

    return (
        <div style={styles.wrapper}>
            <button onClick={() => setIsExpanded(!isExpanded)} style={styles.button}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Info size={18} color={styles.accentColor} />
                    <span style={styles.titleText}>Important Notes &amp; Disclaimers</span>
                </div>
                <ChevronDown
                    size={18}
                    color={styles.accentColor}
                    style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease', flexShrink: 0 }}
                />
            </button>

            {isExpanded && (
                <div style={styles.expandedArea}>
                    <ul style={{ margin: '12px 0 0 16px', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {items.map((item, i) => (
                            <li key={i} style={styles.listItem}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DisclaimerBanner;