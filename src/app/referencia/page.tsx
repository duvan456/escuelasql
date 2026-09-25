'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { BookOpen, Code, Search, ArrowRight } from 'lucide-react'

interface ReferenceTopic {
  title: string
  category: string
  description: string
  example: string
  tips?: string
}

const topics: ReferenceTopic[] = [
  {
    title: 'SELECT Básico',
    category: 'Consultas Básicas',
    description: 'La instrucción primordial para extraer columnas específicas o todas las columnas de una tabla.',
    example: '-- Todas las columnas:\nSELECT * FROM clientes;\n\n-- Columnas específicas:\nSELECT nombre, nit, ciudad FROM clientes;',
    tips: 'El asterisco (*) significa "todas las columnas", pero en reportes contables es mejor pedir solo lo que necesitas.'
  },
  {
    title: 'Alias (AS)',
    category: 'Consultas Básicas',
    description: 'Permite renombrar temporalmente columnas o tablas para que los encabezados sean más claros.',
    example: 'SELECT nombre AS cliente, telefono AS contacto_directo FROM clientes;',
    tips: 'Ideal para que los reportes salgan con nombres claros como "Total con IVA" en lugar de "col_tot_calc".'
  },
  {
    title: 'WHERE (Filtrado)',
    category: 'Filtros y Condiciones',
    description: 'Filtra las filas devueltas basándose en condiciones matemáticas o de texto.',
    example: "-- Facturas pagadas mayores a $500.000:\nSELECT * FROM facturas \nWHERE total > 500000 AND estado = 'Pagada';",
    tips: 'Los textos van entre comillas simples (\'Pagada\'), mientras que los números no llevan comillas ni puntos de mil.'
  },
  {
    title: 'BETWEEN e IN',
    category: 'Filtros y Condiciones',
    description: 'Operadores útiles para rangos de fechas/valores (BETWEEN) o listas de opciones (IN).',
    example: "-- Rango de fechas o valores:\nSELECT * FROM facturas WHERE fecha BETWEEN '2024-01-01' AND '2024-03-31';\n\n-- Múltiples ciudades:\nSELECT * FROM clientes WHERE ciudad IN ('Bogotá', 'Medellín', 'Cali');",
    tips: 'BETWEEN incluye los dos extremos del rango.'
  },
  {
    title: 'LIKE (Búsqueda de texto)',
    category: 'Filtros y Condiciones',
    description: 'Busca patrones de texto usando el comodín % (cualquier cantidad de caracteres).',
    example: "-- Nombres que empiezan con 'DISTRIBUIDORA':\nSELECT * FROM clientes WHERE nombre LIKE 'DISTRIBUIDORA%';\n\n-- Correos que contienen 'gmail':\nSELECT * FROM clientes WHERE email LIKE '%gmail%';",
    tips: 'El signo % reemplaza cualquier cantidad de letras o números.'
  },
  {
    title: 'ORDER BY y LIMIT',
    category: 'Ordenamiento',
    description: 'Ordena los resultados de manera ascendente (ASC) o descendente (DESC), y limita el total de filas.',
    example: '-- Los 5 productos más costosos:\nSELECT nombre, precio FROM productos \nORDER BY precio DESC \nLIMIT 5;',
    tips: 'Por defecto el orden es ASC (de menor a mayor). Para ver los "Top", usa DESC y LIMIT.'
  },
  {
    title: 'Funciones de Agregación',
    category: 'Cálculos y Resúmenes',
    description: 'Cálculos matemáticos instantáneos sobre conjuntos de datos: COUNT, SUM, AVG, MAX, MIN.',
    example: 'SELECT \n  COUNT(*) AS total_facturas,\n  SUM(total) AS venta_total,\n  AVG(total) AS ticket_promedio,\n  MAX(total) AS factura_mas_alta\nFROM facturas;',
    tips: 'COUNT cuenta filas, SUM suma valores numéricos y AVG calcula el promedio ponderado.'
  },
  {
    title: 'GROUP BY',
    category: 'Cálculos y Resúmenes',
    description: 'Agrupa datos por una o más categorías para calcular totales por grupo (ej. ventas por ciudad o por mes).',
    example: 'SELECT ciudad, COUNT(*) AS total_clientes \nFROM clientes \nGROUP BY ciudad;',
    tips: 'Toda columna en el SELECT que no tenga una función como SUM o COUNT debe estar en el GROUP BY.'
  },
  {
    title: 'HAVING',
    category: 'Cálculos y Resúmenes',
    description: 'Filtra los resultados de las funciones de agregación (el "WHERE" de los grupos).',
    example: 'SELECT departamento, AVG(salario) AS salario_promedio \nFROM empleados \nGROUP BY departamento \nHAVING AVG(salario) > 3500000;',
    tips: 'Usa WHERE para filtrar filas antes de agrupar, y HAVING para filtrar después de calcular los totales.'
  },
  {
    title: 'INNER JOIN y LEFT JOIN',
    category: 'Relación entre Tablas',
    description: 'Cruza información entre dos tablas mediante una llave común (ej. cliente_id).',
    example: "-- Relacionar facturas con el nombre de su cliente:\nSELECT facturas.id, clientes.nombre, facturas.total\nFROM facturas\nINNER JOIN clientes ON facturas.cliente_id = clientes.id;",
    tips: 'INNER JOIN solo trae filas con coincidencia en ambas tablas. LEFT JOIN mantiene todos los registros de la tabla izquierda.'
  },
  {
    title: 'Subconsultas',
    category: 'Avanzado',
    description: 'Una consulta dentro de otra consulta para comparar valores contra promedios o listas dinámicas.',
    example: '-- Empleados con salario superior al promedio de la empresa:\nSELECT nombre, cargo, salario \nFROM empleados \nWHERE salario > (SELECT AVG(salario) FROM empleados);',
    tips: 'La subconsulta se resuelve primero y entrega su resultado a la consulta principal.'
  }
]

export default function ReferenciaPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas')

  const categories = ['Todas', ...Array.from(new Set(topics.map(t => t.category)))]

  const filteredTopics = topics.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.example.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'Todas' || topic.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="max-w-4xl mx-auto p-6 w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-2xl shadow-sm">
            <BookOpen size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Referencia SQL Contable</h1>
            <p className="text-slate-600">Guía rápida de sintaxis y consultas prácticas</p>
          </div>
        </div>

        <Link 
          href="/sandbox" 
          className="inline-flex items-center text-sm font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-lg transition-colors"
        >
          Probar en Sandbox <ArrowRight size={16} className="ml-1.5" />
        </Link>
      </div>

      {/* Search and Category Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar conceptos, sintaxis o ejemplos (ej: JOIN, SUM, WHERE)..." 
            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-slate-800 text-sm shadow-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Topics List */}
      <div className="space-y-6">
        {filteredTopics.length === 0 ? (
          <Card className="p-8 text-center text-slate-500">
            No se encontraron conceptos para &ldquo;{searchTerm}&rdquo;. Prueba con otra palabra clave.
          </Card>
        ) : (
          filteredTopics.map((topic, idx) => (
            <Card key={idx} className="p-6 overflow-hidden border-slate-200 hover:border-emerald-300 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-slate-800">{topic.title}</h3>
                <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-medium">
                  {topic.category}
                </span>
              </div>
              <p className="text-slate-600 text-sm mb-4 leading-relaxed">{topic.description}</p>
              
              <div className="bg-slate-900 rounded-xl p-4 flex gap-3 shadow-inner">
                <Code className="text-emerald-400 shrink-0 mt-1" size={16} />
                <pre className="text-slate-200 text-xs sm:text-sm whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto">
                  {topic.example}
                </pre>
              </div>

              {topic.tips && (
                <div className="mt-3 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-start gap-2">
                  <span className="text-amber-500 font-bold shrink-0">💡 Consejo contable:</span>
                  <span>{topic.tips}</span>
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
