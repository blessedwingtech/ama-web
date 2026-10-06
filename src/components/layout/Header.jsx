'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/data/siteConfig';
import {
  Heart,
  Menu,
  X,
  Globe,
  Phone,
  Cross,
  ChevronDown,
} from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t('nav.home', 'Accueil') },
    { href: '/a-propos', label: t('nav.about', 'À Propos') },
    { href: '/equipe', label: t('nav.team', 'Notre Équipe') },
    { href: '/ministeres', label: t('nav.ministries', 'Nos Ministères') },
    { href: '/mediatheque', label: t('nav.media', 'Médiathèque') },
    { href: '/statistiques', label: t('nav.stats', 'Statistiques') },
    { href: '/contact', label: t('nav.contact', 'Contact & Adhésion') },
  ];

  const languages = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'ht', label: 'Kreyòl Ayisyen', flag: '🇭🇹' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
  ];

  const currentLangObj = languages.find((l) => l.code === language) || languages[0];

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      {/* Top Banner - Phone & Quick Info */}
      <div className="bg-ama-blue-900 text-white text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-200">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-400"></span>
              {siteConfig.headquarters.region} — Thomonde, Centre
            </span>
            <span className="text-slate-400">|</span>
            <a
              href={`tel:${siteConfig.primaryPhone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1 text-slate-200 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              {siteConfig.primaryPhone} / {siteConfig.secondaryPhone}
            </a>
          </div>
          <div className="flex items-center gap-3 text-slate-200 font-medium">
            <span>Vision 2050 : 100 000 Âmes pour Christ</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ama-blue-900 to-ama-blue-700 text-white flex items-center justify-center font-serif font-bold text-xl shadow-md border-2 border-amber-400/40 group-hover:scale-105 transition-transform">
              <span className="tracking-tight text-amber-400">AMA</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-slate-900 text-base sm:text-lg leading-tight group-hover:text-ama-blue-900 transition-colors">
                Association 100,000 Âmes
              </span>
              <span className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide">
                Thomonde • Lac de Péligre, Haïti
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2 xl:px-2.5 2xl:px-3.5 py-1.5 rounded-lg text-xs xl:text-[13px] 2xl:text-sm font-medium whitespace-nowrap transition-all ${
                    active
                      ? 'text-ama-blue-900 bg-blue-50 font-semibold shadow-xs'
                      : 'text-slate-700 hover:text-ama-blue-900 hover:bg-slate-100/70'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-2 xl:gap-3 shrink-0">
            {/* Language Switcher (Masqué pour l'instant) */}
            {/* <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                aria-label="Changer de langue"
              >
                <Globe className="w-3.5 h-3.5 text-ama-blue-700" />
                <span>{currentLangObj.flag} {currentLangObj.code.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50 animate-fade-in">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-blue-50 transition-colors ${
                        language === l.code ? 'font-bold text-ama-blue-900 bg-blue-50/50' : 'text-slate-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{l.flag}</span>
                        <span>{l.label}</span>
                      </span>
                      {language === l.code && <span className="text-ama-blue-700">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div> */}

            {/* Donate CTA (Strictement sur 1 seule ligne, élégant & compact) */}
            <Link
              href="/faire-un-don"
              className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-ama-gold-600 to-amber-600 text-white px-4 xl:px-5 py-2 xl:py-2.5 rounded-xl font-bold text-xs xl:text-sm shadow-md hover:shadow-lg hover:from-ama-gold-700 hover:to-amber-700 active:scale-95 transition-all whitespace-nowrap shrink-0"
            >
              <Heart className="w-4 h-4 fill-white shrink-0" />
              <span className="whitespace-nowrap leading-none">{t('nav.donate', 'Faire un Don')}</span>
            </Link>
          </div>

          {/* Mobile Menu & Action Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/faire-un-don"
              className="flex items-center gap-1 bg-amber-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs whitespace-nowrap shrink-0"
            >
              <Heart className="w-3.5 h-3.5 fill-white shrink-0" />
              <span>Faire un Don</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Ouvrir le menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 animate-fade-in shadow-xl">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between ${
                    active
                      ? 'text-ama-blue-900 bg-blue-50 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {active && <span className="w-2 h-2 rounded-full bg-ama-blue-700"></span>}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-3">
            <div className="pt-1">
              <Link
                href="/faire-un-don"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-ama-gold-600 to-amber-600 text-white py-3 rounded-xl font-bold text-sm shadow-md"
              >
                <Heart className="w-4 h-4 fill-white shrink-0" />
                <span>{t('nav.donate', 'Faire un Don (MonCash / Natcash / Diaspora)')}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
