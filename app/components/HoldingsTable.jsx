"use client"
import React, { useState, useMemo } from 'react';
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import HoldingsRow from './HoldingsRow';

const COLS = [
  { label: 'Asset', key: 'coinName' },
  { label: 'Holdings\nAvg Buy Price', key: 'totalHolding' },
  { label: 'Total Current Value', key: 'currentValue' },
  { label: 'Short-term', key: 'stcg.gain' },
  { label: 'Long-Term', key: 'ltcg.gain' },
  { label: 'Amount to Sell', key: null },
];

const HoldingsTable = ({ assetsData = [], selectedIds = [], onToggleAsset, onToggleAll }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'desc' });
  const [isExpanded, setIsExpanded] = useState(false);

  const isAllSelected = assetsData.length > 0 && selectedIds.length === assetsData.length;
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < assetsData.length;

  const handleSort = (key) => {
    if (!key) return;
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  const sortedData = useMemo(() => {
    const items = [...assetsData];
    if (!sortConfig.key) return items;
    return items.sort((a, b) => {
      let av, bv;
      if (sortConfig.key === 'stcg.gain') { av = a.stcg.gain; bv = b.stcg.gain; }
      else if (sortConfig.key === 'ltcg.gain') { av = a.ltcg.gain; bv = b.ltcg.gain; }
      else if (sortConfig.key === 'currentValue') { av = a.totalHolding * a.currentPrice; bv = b.totalHolding * b.currentPrice; }
      else { av = a[sortConfig.key]; bv = b[sortConfig.key]; }
      if (av < bv) return sortConfig.direction === 'asc' ? -1 : 1;
      if (av > bv) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [assetsData, sortConfig]);

  const visibleData = isExpanded ? sortedData : sortedData.slice(0, 4);

  const SortArrow = ({ col }) => {
    if (!col) return null;
    const active = sortConfig.key === col;
    const color = active ? '#2563EB' : 'var(--text-muted)';
    return (
      <span style={{ marginLeft: '4px', display: 'flex', alignItems: 'center', color, userSelect: 'none' }}>
        {active 
          ? (sortConfig.direction === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />) 
          : <ArrowUpDown size={12} />}
      </span>
    );
  };

  const headerBtnStyle = (key) => ({
    background: 'none', border: 'none', padding: 0,
    cursor: key ? 'pointer' : 'default',
    display: 'flex', alignItems: 'center',
    fontSize: '12px', fontWeight: 600,
    color: 'var(--text-secondary)',
    textTransform: 'uppercase', letterSpacing: '0.04em',
    whiteSpace: 'pre-line', textAlign: 'right',
  });

  return (
    <div style={{
      background: 'var(--surface-card)',
      border: '1px solid var(--surface-card-border)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-card)',
      overflow: 'hidden',
      transition: 'background 0.2s ease, border-color 0.2s ease',
    }}>
      {/* Title */}
      <div className="p-4 md:px-6 md:pt-5 md:pb-4 border-b" style={{ borderColor: 'var(--surface-card-border)' }}>
        <h2 className="text-lg font-bold m-0" style={{ color: 'var(--text-primary)' }}>Holdings</h2>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: '860px' }}>
          {/* Header row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1.5fr 1.5fr 1.5fr 1.5fr 1.5fr',
            gap: '12px', padding: '10px 16px',
            background: 'var(--surface-table-header)',
            borderBottom: '1px solid var(--surface-card-border)',
          }}>
            {/* Asset col with select-all */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                checked={isAllSelected}
                ref={el => { if (el) el.indeterminate = isIndeterminate; }}
                onChange={onToggleAll}
                style={{ width: '16px', height: '16px', accentColor: '#2563EB', cursor: 'pointer', flexShrink: 0 }}
              />
              <button onClick={() => handleSort('coinName')} style={headerBtnStyle('coinName')}>
                Asset <SortArrow col="coinName" />
              </button>
            </div>

            {COLS.slice(1).map((col) => (
              <div key={col.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <button onClick={() => handleSort(col.key)} disabled={!col.key} style={headerBtnStyle(col.key)}>
                  {col.label}
                  {col.key && <SortArrow col={col.key} />}
                </button>
              </div>
            ))}
          </div>

          {/* Rows */}
          <div>
            {visibleData.map((item) => (
              <HoldingsRow
                key={item.coinName}
                item={item}
                isSelected={selectedIds.includes(item.coinName)}
                onToggle={onToggleAsset}
              />
            ))}
          </div>
        </div>
      </div>

      {assetsData.length > 4 && (
        <div className="p-4 md:py-3.5 md:px-6 border-t" style={{ borderColor: 'var(--surface-card-border)' }}>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '14px', fontWeight: 600, color: '#2563EB', padding: 0,
            }}
          >
            {isExpanded ? '↑ View Less' : 'View all →'}
          </button>
        </div>
      )}
    </div>
  );
};

export default HoldingsTable;