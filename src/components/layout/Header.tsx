'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Database } from 'lucide-react'
import { useProgressStore } from '@/stores/useProgressStore'
import { XpBar } from '@/components/game/XpBar'
import { Badge } from '@/components/ui/Badge'
import { PLAYER_RANKS } from '@/lib/utils/constants'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { totalXp, getPlayerRank } = useProgressStore()

  const rank = getPlayerRank()
  const nextRank = PLAYER_RANKS.find(r => r.minXp > totalXp) || PLAYER_RANKS[PLAYER_RANKS.length - 1]

  const navLinks = [
    { href: '/jugar', label: '🎮 Jugar' },
    { href: '/sandbox', label: '🧪 Sandbox' },
    { href: '/progreso', label: '🏆 Progreso' },
    { href: '/referencia', label: '📖 Referencia' },
  ]

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Database className="h-8 w-8 text-emerald-600 mr-2" />
            <span className="font-bold text-xl text-slate-900 tracking-tight">EscuelaSQL</span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="w-48">
              <XpBar
                currentXp={totalXp}
                currentRank={rank.name}
                nextRankXp={nextRank.minXp}
                hideRankText
              />
            </div>
            <Badge variant="warning" className="text-xs px-2.5 py-1">
              {rank.icon} {rank.name}
            </Badge>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-500 hover:text-slate-700 focus:outline-none p-2"
              aria-label="Menú"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-50 border-b border-slate-200 p-4 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-medium text-slate-700 hover:text-emerald-600 py-1"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="border-t border-slate-200 pt-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-slate-500">Rango:</span>
              <Badge variant="warning" className="text-xs">
                {rank.icon} {rank.name}
              </Badge>
            </div>
            <XpBar
              currentXp={totalXp}
              currentRank={rank.name}
              nextRankXp={nextRank.minXp}
            />
          </div>
        </div>
      )}
    </header>
  )
}
