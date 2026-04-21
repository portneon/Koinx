"use client"
import React from 'react';

const fmt = (n) =>
  Math.abs(n).toLocaleString('en-IN', { maximumFractionDigits: 2 });

const SummaryCard = ({
  title, shortTermProfits, longTermProfits, shortTermLosses, longTermLosses,
  netShortTerm, netLongTerm, finalLabel, finalAmount,
  isHighlighted = false, savingsMessage = null,
}) => {
  if (isHighlighted) {
    return (
      <div className="p-4 md:p-6" style={{
        background: '#2563EB',
        borderRadius: 'var(--radius-lg)',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <h3 className="text-base font-semibold mb-4 md:mb-5">{title}</h3>

        {/* Column headers */}
        <div className="grid grid-cols-3 gap-2 md:gap-3 mb-3">
          <div />
          <div className="text-right text-xs font-medium text-white/70">Short-term</div>
          <div className="text-right text-xs font-medium text-white/70">Long-term</div>
        </div>

        {[
          { label: 'Profits', st: `₹ ${fmt(shortTermProfits)}`, lt: `₹ ${fmt(longTermProfits)}` },
          { label: 'Losses', st: `- ₹ ${fmt(shortTermLosses)}`, lt: `- ₹ ${fmt(longTermLosses)}` },
          {
            label: 'Net Capital Gains', bold: true,
            st: `${netShortTerm < 0 ? '- ' : ''}₹ ${fmt(netShortTerm)}`,
            lt: `${netLongTerm < 0 ? '- ' : ''}₹ ${fmt(netLongTerm)}`,
          },
        ].map(row => (
          <div key={row.label} className="grid grid-cols-3 gap-2 md:gap-3 mb-2 md:mb-3 items-center">
            <div className={`text-xs md:text-sm text-white/85 ${row.bold ? 'font-semibold' : ''}`}>{row.label}</div>
            <div className={`text-right text-xs md:text-sm ${row.bold ? 'font-bold' : 'font-medium'}`}>{row.st}</div>
            <div className={`text-right text-xs md:text-sm ${row.bold ? 'font-bold' : 'font-medium'}`}>{row.lt}</div>
          </div>
        ))}

        <div className="h-px bg-white/20 my-4" />

        <div className="flex justify-between items-center">
          <span className="text-sm md:text-[15px] font-semibold">{finalLabel}:</span>
          <span className="text-lg md:text-[22px] font-bold">
            {finalAmount < 0 ? '- ' : ''}₹ {fmt(Math.abs(finalAmount))}
          </span>
        </div>

        {savingsMessage && (
          <div className="mt-3 bg-white/15 rounded-lg p-2.5 md:px-[14px] text-xs md:text-[13px] font-medium flex items-center gap-2">
            🎉 <span>{savingsMessage}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6" style={{
      background: 'var(--surface-card)',
      border: '1px solid var(--surface-card-border)',
      borderRadius: 'var(--radius-lg)',
      color: 'var(--text-primary)',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: 'var(--shadow-card)',
      transition: 'background 0.2s ease, border-color 0.2s ease',
    }}>
      <h3 className="text-base font-semibold mb-4 md:mb-5" style={{ color: 'var(--text-primary)' }}>{title}</h3>

      <div className="grid grid-cols-3 gap-2 md:gap-3 mb-3">
        <div />
        <div className="text-right text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Short-term</div>
        <div className="text-right text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Long-term</div>
      </div>

      {[
        { label: 'Profits', st: `₹ ${fmt(shortTermProfits)}`, lt: `₹ ${fmt(longTermProfits)}` },
        { label: 'Losses', st: `- ₹ ${fmt(shortTermLosses)}`, lt: `- ₹ ${fmt(longTermLosses)}` },
        {
          label: 'Net Capital Gains', bold: true,
          st: `${netShortTerm < 0 ? '- ' : ''}₹ ${fmt(netShortTerm)}`,
          lt: `${netLongTerm < 0 ? '- ' : ''}₹ ${fmt(netLongTerm)}`,
        },
      ].map(row => (
        <div key={row.label} className="grid grid-cols-3 gap-2 md:gap-3 mb-2 md:mb-3 items-center">
          <div className={`text-xs md:text-sm ${row.bold ? 'font-semibold' : ''}`} style={{ color: row.bold ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{row.label}</div>
          <div className={`text-right text-xs md:text-sm ${row.bold ? 'font-bold' : 'font-medium'}`} style={{ color: 'var(--text-primary)' }}>{row.st}</div>
          <div className={`text-right text-xs md:text-sm ${row.bold ? 'font-bold' : 'font-medium'}`} style={{ color: 'var(--text-primary)' }}>{row.lt}</div>
        </div>
      ))}

      <div className="h-px my-4" style={{ background: 'var(--surface-card-border)' }} />

      <div className="flex justify-between items-center">
        <span className="text-sm md:text-[15px] font-semibold" style={{ color: 'var(--text-primary)' }}>{finalLabel}:</span>
        <span className="text-lg md:text-[22px] font-bold" style={{ color: 'var(--text-primary)' }}>
          {finalAmount < 0 ? '- ' : ''}₹ {fmt(Math.abs(finalAmount))}
        </span>
      </div>
    </div>
  );
};

export default SummaryCard;