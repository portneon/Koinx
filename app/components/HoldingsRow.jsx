"use client"
import React, { memo } from 'react';

const fmt = (n, d = 2) => Math.abs(n).toLocaleString('en-IN', { maximumFractionDigits: d });

const HoldingsRow = ({ item, isSelected, onToggle }) => {
  const currentValue = item.totalHolding * item.currentPrice;

  const PnlCell = ({ gain, balance, symbol }) => {
    const positive = gain >= 0;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: positive ? '#16A34A' : '#DC2626' }}>
          {positive ? '+' : '−'}₹ {fmt(gain)}
        </span>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          {balance > 0 ? fmt(balance, 5) : '0'} {symbol}
        </span>
      </div>
    );
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1.5fr 1.5fr 1.5fr 1.5fr 1.5fr',
        gap: '12px',
        padding: '14px 16px',
        alignItems: 'center',
        borderBottom: '1px solid var(--surface-card-border)',
        background: isSelected ? 'var(--surface-row-selected)' : 'var(--surface-card)',
        transition: 'background 0.15s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'var(--surface-row-hover)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = isSelected ? 'var(--surface-row-selected)' : 'var(--surface-card)'; }}
    >
      {/* Asset */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggle(item.coinName)}
          style={{ width: '16px', height: '16px', accentColor: '#2563EB', cursor: 'pointer', flexShrink: 0 }}
          onClick={e => e.stopPropagation()}
        />
        <img
          src={item.logo}
          alt={item.coinName || 'Asset'}
          style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
          onError={e => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%', background: '#F59E0B',
          display: 'none', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: '12px', fontWeight: 700, flexShrink: 0,
        }}>
          {(item.coin || '?')[0]}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <span title={item.coinName} style={{
            fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {item.coinName.length > 18 ? item.coinName.substring(0, 16) + '…' : item.coinName}
          </span>
          <span style={{
            fontSize: '11px', fontWeight: 500, color: 'var(--text-secondary)',
            background: 'var(--surface-row-hover)', borderRadius: '4px',
            padding: '1px 5px', width: 'fit-content', marginTop: '2px',
          }}>
            {item.coin}
          </span>
        </div>
      </div>

      {/* Holdings */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
          {fmt(item.totalHolding, 5)} {item.coin}
        </span>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          ₹ {fmt(item.averageBuyPrice)}/{item.coin}
        </span>
      </div>

      {/* Current value */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
          ₹ {fmt(currentValue)}
        </span>
      </div>

      {/* STCG */}
      <PnlCell gain={item.stcg.gain} balance={item.stcg.balance} symbol={item.coin} />

      {/* LTCG */}
      <PnlCell gain={item.ltcg.gain} balance={item.ltcg.balance} symbol={item.coin} />

      {/* Amount to sell */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        {isSelected ? (
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
            {fmt(item.totalHolding, 5)} {item.coin}
          </span>
        ) : (
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>-</span>
        )}
      </div>
    </div>
  );
};

export default memo(HoldingsRow);