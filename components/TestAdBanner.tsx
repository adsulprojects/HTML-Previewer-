'use client';

import React, { useState } from 'react';
import { Sparkles, Info, X, ExternalLink, RefreshCw } from 'lucide-react';

export interface AdUnitConfig {
  unitId: string; // e.g. "ca-app-pub-3940256099942544/9257395921" (Google AdMob test unit ID)
  slotName?: string;
  format?: 'banner' | 'leaderboard' | 'inline';
}

interface TestAdBannerProps {
  theme?: 'dark' | 'light';
  unitId?: string; // customizable test ad unit ID
  format?: 'banner' | 'leaderboard';
  onDismiss?: () => void;
  showDismiss?: boolean;
}

// Sample Google AdMob test ad creatives that simulate official test ads
const TEST_AD_CREATIVES = [
  {
    title: 'Test Ad: Google Mobile Ads SDK',
    tagline: 'AdMob Test Unit · ca-app-pub-3940256099942544/9257395921',
    description: 'Nice job! This test ad confirms your AdMob configuration (ID: ca-app-pub-3940256099942544/9257395921) is working.',
    cta: 'Test Click',
    url: 'https://developers.google.com/admob',
    badge: 'TEST AD',
    accent: '#4285F4',
  },
  {
    title: 'Test Ad: AdMob Mediation Suite',
    tagline: 'Simulating active demand with unit ca-app-pub-3940256099942544/9257395921',
    description: 'AdMob integration verified with test unit ID. Safe for developer testing.',
    cta: 'View Docs',
    url: 'https://admob.google.com',
    badge: 'TEST AD',
    accent: '#34A853',
  },
  {
    title: 'Test Ad: Developer Tools & Analytics',
    tagline: 'Test ad unit rendered safely without policy or revenue impact',
    description: 'Test mode active on ca-app-pub-3940256099942544/9257395921. Clicks simulated safely.',
    cta: 'Learn More',
    url: 'https://developers.google.com/admob/android/test-ads',
    badge: 'TEST AD',
    accent: '#EA4335',
  },
];

export function TestAdBanner({
  theme = 'dark',
  unitId = 'ca-app-pub-3940256099942544/9257395921',
  format = 'banner',
  onDismiss,
  showDismiss = true,
}: TestAdBannerProps) {
  const [creativeIndex, setCreativeIndex] = useState(0);
  const [isSimulatingClick, setIsSimulatingClick] = useState(false);
  const [showUnitInfo, setShowUnitInfo] = useState(false);

  const isLight = theme === 'light';
  const creative = TEST_AD_CREATIVES[creativeIndex];

  const handleNextCreative = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCreativeIndex((prev) => (prev + 1) % TEST_AD_CREATIVES.length);
  };

  const handleCtaClick = () => {
    setIsSimulatingClick(true);
    setTimeout(() => {
      setIsSimulatingClick(false);
      window.open(creative.url, '_blank', 'noopener,noreferrer');
    }, 400);
  };

  return (
    <div
      role="region"
      aria-label="AdMob Test Advertisement"
      className={`relative w-full border-t transition-colors shrink-0 select-none ${
        isLight
          ? 'bg-slate-50 border-slate-200 text-slate-800'
          : 'bg-[#0E1217] border-[#222730] text-[#E5E7EB]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-1.5 sm:py-2 flex items-center justify-between gap-3">
        {/* Left: Ad badge & info */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <span
              className="text-[10px] font-extrabold px-1.5 py-0.5 rounded tracking-wider uppercase"
              style={{
                backgroundColor: isLight ? '#E2E8F0' : '#1A202C',
                color: creative.accent,
                border: `1px solid ${creative.accent}40`,
              }}
            >
              {creative.badge}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
              <Sparkles className="w-3 h-3" />
              AdMob Test ID
            </span>
          </div>

          {/* Ad content */}
          <div className="min-w-0 flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-[13px] font-bold truncate">
                {creative.title}
              </span>
              <button
                type="button"
                onClick={() => setShowUnitInfo((prev) => !prev)}
                className={`hidden md:inline-flex items-center gap-1 text-[11px] hover:underline cursor-pointer ${
                  isLight ? 'text-slate-500' : 'text-[#9CA3AF]'
                }`}
                title={`Unit ID: ${unitId}`}
              >
                <Info className="w-3 h-3" />
                <span className="font-mono text-[10px] truncate max-w-[200px]">{unitId}</span>
              </button>
            </div>
            <p className={`text-[11px] hidden sm:block truncate ${isLight ? 'text-slate-500' : 'text-[#9CA3AF]'}`}>
              {creative.description}
            </p>
          </div>
        </div>

        {/* Right: CTA & Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={handleNextCreative}
            title="Cycle Test Creative"
            className={`p-1.5 rounded-lg border transition-colors ${
              isLight
                ? 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                : 'bg-[#151B23] border-[#252C36] text-[#9CA3AF] hover:text-white hover:bg-[#1E2530]'
            }`}
            aria-label="Cycle next test ad creative"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleCtaClick}
            disabled={isSimulatingClick}
            style={{
              backgroundColor: creative.accent,
            }}
            className="flex items-center gap-1.5 px-3 py-1 sm:py-1.5 rounded-lg text-white text-xs font-semibold shadow-xs hover:opacity-95 active:scale-95 transition-transform"
          >
            <span>{isSimulatingClick ? 'Loading...' : creative.cta}</span>
            <ExternalLink className="w-3 h-3" />
          </button>

          {showDismiss && onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              className={`p-1.5 rounded-lg transition-colors ${
                isLight
                  ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-200'
                  : 'text-[#6B7280] hover:text-white hover:bg-[#1E2530]'
              }`}
              title="Close banner (toggle in Settings)"
              aria-label="Dismiss test ad"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Expandable Ad Unit details drawer */}
      {showUnitInfo && (
        <div
          className={`px-3 sm:px-6 py-2 border-t text-[11px] flex flex-wrap items-center justify-between gap-2 font-mono ${
            isLight ? 'bg-slate-100/90 border-slate-200 text-slate-700' : 'bg-[#151B23] border-[#252C36] text-[#CBD5E1]'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="font-semibold uppercase tracking-wider text-[10px] text-amber-500 font-sans">
              Configured Test Unit:
            </span>
            <code className="bg-black/20 px-1.5 py-0.5 rounded text-[10px] select-all">
              {unitId}
            </code>
          </div>
          <div className="flex items-center gap-3 font-sans text-[11px]">
            <span>Format: {format.toUpperCase()} (Responsive)</span>
            <span>Adapter: Google AdMob / AdSense Test Harness</span>
            <button
              onClick={() => setShowUnitInfo(false)}
              className="text-[#7C3AED] hover:underline font-semibold"
            >
              Hide
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
