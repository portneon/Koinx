"use client"
import React from 'react';
import Image from 'next/image';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav
      className="px-4 md:px-20"
      style={{
        background: isDark ? '#1A1D2E' : '#FFFFFF',
        borderBottom: `1px solid ${isDark ? '#2D3148' : '#E5E7EB'}`,
        boxShadow: isDark
          ? '0 0 12px 0 rgba(0, 0, 0, 0.3)'
          : '0 0 12px 0 rgba(16, 38, 73, 0.06)',
        height: '72px',
        paddingTop: '8px',
        paddingBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        transition: 'background 0.2s ease, border-color 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Image src="/logo.svg" alt="KoinX Logo" width={100} height={40} priority />
      </div>

      <button
        onClick={toggleTheme}
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '6px', padding: '8px 16px',
          borderRadius: '8px',
          border: `1px solid ${isDark ? '#3E4460' : '#E5E7EB'}`,
          background: isDark ? '#252840' : '#F9FAFB',
          color: isDark ? '#F1F5F9' : '#374151',
          cursor: 'pointer', fontSize: '13px', fontWeight: 500,
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = isDark ? '#2D325A' : '#F3F4F6'; }}
        onMouseLeave={e => { e.currentTarget.style.background = isDark ? '#252840' : '#F9FAFB'; }}
      >
        {isDark ? <Sun size={16} /> : <Moon size={16} />}
        <span>{isDark ? 'Light mode' : 'Dark mode'}</span>
      </button>
    </nav>
  );
};

export default Navbar;
