'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/data/siteConfig';
import {
  Heart,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Cross,
  Send,
} from 'lucide-react';


export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-sm">
      {/* Top Banner - Call to Action & Vision */}
      <div className="bg-gradient-to-r from-ama-blue-900 via-blue-900 to-ama-blue-950 py-10 px-4 sm:px-6 lg:px-8 border-b border-blue-800/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
              Vision 2050
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
              Bâtir ensemble l’Église de demain dans le Plateau Central
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              « Allez, faites de toutes les nations des disciples, les baptisant au nom du Père, du Fils et du Saint-Esprit. » — Matthieu 28:19
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/faire-un-don"
              className="flex items-center gap-2 bg-gradient-to-r from-ama-gold-600 to-amber-600 hover:from-ama-gold-700 hover:to-amber-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-all"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Soutenir nos actions</span>
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-3 rounded-xl font-medium text-sm transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Nous Rejoindre</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Identity & Legal */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-ama-blue-800 text-amber-400 font-serif font-bold text-lg flex items-center justify-center border border-amber-400/40">
                AMA
              </div>
              <div>
                <h3 className="font-serif font-bold text-white text-base leading-snug">
                  Association 100,000 Âmes
                </h3>
                <p className="text-xs text-amber-400 font-medium">Thomonde, Haïti</p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-400">
              {siteConfig.legalStatus.fullStatement}
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Fondée le <strong>{siteConfig.foundationDate}</strong></span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>MAST • Cultes • Mairie de Thomonde</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-serif font-semibold text-sm tracking-wide uppercase">
              Navigation Rapide
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">
                  Accueil (Vision 2050)
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="hover:text-amber-400 transition-colors">
                  À Propos & Statuts Juridiques
                </Link>
              </li>
              <li>
                <Link href="/equipe" className="hover:text-amber-400 transition-colors">
                  Notre Équipe & Collège Pastoral
                </Link>
              </li>
              <li>
                <Link href="/ministeres" className="hover:text-amber-400 transition-colors">
                  Nos 5 Ministères d’Intervention
                </Link>
              </li>
              <li>
                <Link href="/mediatheque" className="hover:text-amber-400 transition-colors">
                  Médiathèque & Rapports Périodiques
                </Link>
              </li>
              <li>
                <Link href="/statistiques" className="hover:text-amber-400 transition-colors">
                  Statistiques & Vision 2050
                </Link>
              </li>
              <li>
                <Link href="/faire-un-don" className="hover:text-amber-400 transition-colors">
                  Faire un Don (MonCash / Natcash)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors">
                  Contact & Demande de Prière
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Ministries Overview */}
          <div className="space-y-3">
            <h4 className="text-white font-serif font-semibold text-sm tracking-wide uppercase">
              Nos Domaines d'Action
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>Évangélisation de Marché & Campagnes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>Formation Théologique & Génie Biblique</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>Forums de Réflexion Théologique & Éthique</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>Championnats de Football d'Été (4 tournois)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>Diaconat, Lessive & Secours aux Malades</span>
              </li>
            </ul>

            <div className="pt-2">
              <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 text-xs">
                <p className="font-semibold text-slate-200 mb-1">Dons Mobiles Locaux :</p>
                <p className="text-amber-400 font-mono">MonCash : 3651-2047</p>
                <p className="text-emerald-400 font-mono">Natcash : 3252-9060</p>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Headquarters */}
          <div className="space-y-3">
            <h4 className="text-white font-serif font-semibold text-sm tracking-wide uppercase">
              Siège & Contacts
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Siège :</strong> #1, Église Évangélique Galilée de Delbourg, Thomonde (Centre, Haïti)
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="flex flex-col font-mono text-slate-200">
                  <a href="tel:+50936512047" className="hover:text-amber-400 transition-colors">
                    +509 3651-2047
                  </a>
                  <a href="tel:+50932529060" className="hover:text-amber-400 transition-colors">
                    +509 3252-9060
                  </a>
                </div>
              </div>

              {/* Email caché */}
              {/* <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-amber-300 hover:underline break-all"
                >
                  {siteConfig.email}
                </a>
              </div> */}
            </div>

            {/* Social icons cachés */}
            {/* <div className="pt-2 flex items-center gap-3"> ... </div> */}
          </div>
        </div>

        {/* Bottom Bar: Copyright, Credits & Admin */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} Association 100,000 Âmes (AMA). Tous droits réservés.</p>
          
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="https://bwt.bittonik.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1 font-medium"
            >
              <span>Développé par <strong className="text-amber-400 underline decoration-amber-400/50">BWT</strong> (Blessed Wing Tech)</span>
              <ExternalLink className="w-3 h-3 text-amber-400/80" />
            </a>
            <span>•</span>
            <Link href="/admin" className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1">
              <span>🔒 Espace Direction / Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
