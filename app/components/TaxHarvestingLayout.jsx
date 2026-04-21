"use client"
import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import DisclaimerBanner from './DisclaimerBanner';
import SummaryCard from './SummaryCard';
import HoldingsTable from './HoldingsTable';
import { getHoldings, getCapitalGains } from '../utils/mockData';
import { Info } from 'lucide-react';

const TaxHarvestingLayout = () => {
  const [assetsData, setAssetsData] = useState([]);
  const [preCapitalGains, setPreCapitalGains] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const tooltipRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [holdings, gains] = await Promise.all([getHoldings(), getCapitalGains()]);
        setAssetsData(holdings);
        setPreCapitalGains(gains.capitalGains);
      } catch (err) {
        console.error('Failed to load data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target)) {
        setTooltipOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleToggleAsset = useCallback((id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }, []);

  const handleToggleAll = useCallback(() => {
    setSelectedIds(prev =>
      prev.length === assetsData.length ? [] : assetsData.map(a => a.coinName)
    );
  }, [assetsData]);

  const preStats = useMemo(() => {
    if (!preCapitalGains) return null;
    const { stcg, ltcg } = preCapitalGains;
    const ns = stcg.profits - stcg.losses;
    const nl = ltcg.profits - ltcg.losses;
    return {
      shortTermProfits: stcg.profits, shortTermLosses: stcg.losses,
      longTermProfits: ltcg.profits, longTermLosses: ltcg.losses,
      netShortTerm: ns, netLongTerm: nl,
      realisedCapitalGains: ns + nl,
    };
  }, [preCapitalGains]);

  const postStats = useMemo(() => {
    if (!preCapitalGains) return null;
    let sp = preCapitalGains.stcg.profits, sl = preCapitalGains.stcg.losses;
    let lp = preCapitalGains.ltcg.profits, ll = preCapitalGains.ltcg.losses;
    for (const id of selectedIds) {
      const a = assetsData.find(x => x.coinName === id);
      if (!a) continue;
      if (a.stcg.gain > 0) sp += a.stcg.gain; else if (a.stcg.gain < 0) sl += Math.abs(a.stcg.gain);
      if (a.ltcg.gain > 0) lp += a.ltcg.gain; else if (a.ltcg.gain < 0) ll += Math.abs(a.ltcg.gain);
    }
    const ns = sp - sl, nl = lp - ll;
    return {
      shortTermProfits: sp, shortTermLosses: sl,
      longTermProfits: lp, longTermLosses: ll,
      netShortTerm: ns, netLongTerm: nl,
      realisedCapitalGains: ns + nl,
    };
  }, [preCapitalGains, selectedIds, assetsData]);

  if (isLoading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '50%',
          border: '3px solid var(--surface-card-border)', borderTopColor: '#2563EB',
          animation: 'spin 0.8s linear infinite',
        }} />
        <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Loading your portfolio…</span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!preStats || !postStats) return null;

  const savings = preStats.realisedCapitalGains - postStats.realisedCapitalGains;
  const savingsMsg = savings > 0
    ? `You are going to save upto ₹ ${savings.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`
    : null;

  return (
    <div className="p-4 md:p-8" style={{ width: '100%', minHeight: '100vh', background: 'var(--surface-page)', transition: 'background 0.2s ease' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Page Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Tax Harvesting</h1>

          <div style={{ position: 'relative' }} ref={tooltipRef}>
            <button
              onClick={() => setTooltipOpen(o => !o)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '4px',
                fontSize: '14px', fontWeight: 500, color: '#2563EB', padding: 0,
              }}
            >
              How it works?
              <Info size={16} color="#2563EB" />
            </button>

            {tooltipOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 8px)', left: 0, zIndex: 100,
                background: 'var(--surface-card)',
                border: '1px solid var(--surface-card-border)',
                color: 'var(--text-primary)',
                borderRadius: '10px', padding: '14px 16px', width: '280px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                fontSize: '13px', lineHeight: '1.6',
              }}>
                <p style={{ margin: '0 0 8px', color: 'var(--text-secondary)' }}>
                  Tax-loss harvesting involves selling assets at a loss to offset capital gains tax liability, reducing your tax burden.
                </p>
                <a
                  href="https://help.koinx.com/hc/en-us/articles/tax-loss-harvesting"
                  target="_blank" rel="noopener noreferrer"
                  style={{ color: '#2563EB', fontWeight: 600, textDecoration: 'none', fontSize: '13px' }}
                >
                  Read full article →
                </a>
              </div>
            )}
          </div>
        </div>

        <DisclaimerBanner />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <SummaryCard
            title="Pre Harvesting"
            shortTermProfits={preStats.shortTermProfits}
            longTermProfits={preStats.longTermProfits}
            shortTermLosses={preStats.shortTermLosses}
            longTermLosses={preStats.longTermLosses}
            netShortTerm={preStats.netShortTerm}
            netLongTerm={preStats.netLongTerm}
            finalLabel="Realised Capital Gains"
            finalAmount={preStats.realisedCapitalGains}
          />
          <SummaryCard
            title="After Harvesting"
            isHighlighted
            shortTermProfits={postStats.shortTermProfits}
            longTermProfits={postStats.longTermProfits}
            shortTermLosses={postStats.shortTermLosses}
            longTermLosses={postStats.longTermLosses}
            netShortTerm={postStats.netShortTerm}
            netLongTerm={postStats.netLongTerm}
            finalLabel="Effective Capital Gains"
            finalAmount={postStats.realisedCapitalGains}
            savingsMessage={savingsMsg}
          />
        </div>

        <HoldingsTable
          assetsData={assetsData}
          selectedIds={selectedIds}
          onToggleAsset={handleToggleAsset}
          onToggleAll={handleToggleAll}
        />

      </div>
    </div>
  );
};

export default TaxHarvestingLayout;