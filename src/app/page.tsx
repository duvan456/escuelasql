import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Database, Target, Trophy } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex-col w-full h-full">
      {/* Hero Section */}
      <section className="bg-emerald-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl font-bold">Aprende SQL jugando 🎮</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Domina las consultas de datos sin escribir una línea de código... bueno, solo SELECT 😄
          </p>
          <div className="pt-8">
            <Link href="/jugar">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-lg px-8">
                Comenzar a jugar
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <Card className="p-6 text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
              <Target size={24} />
            </div>
            <h3 className="text-xl font-semibold">🎯 Aprende haciendo</h3>
            <p className="text-slate-600">
              Resuelve problemas reales paso a paso, desde lo más básico hasta consultas avanzadas.
            </p>
          </Card>
          
          <Card className="p-6 text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
              <Database size={24} />
            </div>
            <h3 className="text-xl font-semibold">📊 Contexto contable</h3>
            <p className="text-slate-600">
              Practica con bases de datos familiares: contabilidad, nómina e inventarios.
            </p>
          </Card>

          <Card className="p-6 text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <Trophy size={24} />
            </div>
            <h3 className="text-xl font-semibold">🏆 Gana puntos y sube de nivel</h3>
            <p className="text-slate-600">
              Desbloquea logros, gana experiencia y demuestra tu dominio de los datos.
            </p>
          </Card>
        </div>
      </section>
    </div>
  )
}
