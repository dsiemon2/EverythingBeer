'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { GitCompare, Search, Beer, ArrowRight, X, Check } from 'lucide-react';
import { beers, getBeerById } from '@/data/beers';
import type { Beer as BeerType } from '@/types';

const popularComparisons = [
  { a: 'bud-light', b: 'miller-lite', title: 'Bud Light vs Miller Lite' },
  { a: 'corona-extra', b: 'modelo-especial', title: 'Corona vs Modelo' },
  { a: 'heineken', b: 'stella-artois', title: 'Heineken vs Stella Artois' },
  { a: 'pliny-the-elder', b: 'heady-topper', title: 'Pliny the Elder vs Heady Topper' },
  { a: 'guinness-draught', b: 'samuel-adams-boston-lager', title: 'Guinness vs Samuel Adams' },
];

function CompareContent() {
  const searchParams = useSearchParams();
  const [beerA, setBeerA] = useState<BeerType | null>(
    searchParams.get('a') ? getBeerById(searchParams.get('a')!) || null : null
  );
  const [beerB, setBeerB] = useState<BeerType | null>(
    searchParams.get('b') ? getBeerById(searchParams.get('b')!) || null : null
  );
  const [searchA, setSearchA] = useState('');
  const [searchB, setSearchB] = useState('');
  const [showDropdownA, setShowDropdownA] = useState(false);
  const [showDropdownB, setShowDropdownB] = useState(false);

  const filteredBeersA = beers.filter((b) =>
    b.name.toLowerCase().includes(searchA.toLowerCase()) ||
    b.brewery_name.toLowerCase().includes(searchA.toLowerCase())
  ).slice(0, 5);

  const filteredBeersB = beers.filter((b) =>
    b.name.toLowerCase().includes(searchB.toLowerCase()) ||
    b.brewery_name.toLowerCase().includes(searchB.toLowerCase())
  ).slice(0, 5);

  const getSrmColor = (srm: number | null) => {
    if (srm === null) return '#f59e0b';
    if (srm <= 4) return '#fef3c7';
    if (srm <= 8) return '#fcd34d';
    if (srm <= 12) return '#f59e0b';
    if (srm <= 18) return '#d97706';
    if (srm <= 24) return '#92400e';
    if (srm <= 30) return '#78350f';
    return '#1c1917';
  };

  const compareValue = (a: number | null, b: number | null, higherBetter: boolean = true) => {
    if (a === null || b === null) return null;
    if (a === b) return 'tie';
    if (higherBetter) return a > b ? 'a' : 'b';
    return a < b ? 'a' : 'b';
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <GitCompare className="w-8 h-8 text-amber-600" />
            <h1 className="text-3xl font-bold text-brown-800 dark:text-amber-100">
              Compare Beers
            </h1>
          </div>
          <p className="text-brown-600 dark:text-brown-300">
            Side-by-side comparison to help you find your perfect beer.
          </p>
        </div>

        {/* Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Beer A Selection */}
          <div className="bg-white dark:bg-brown-800 rounded-2xl border border-amber-100 dark:border-brown-700 overflow-hidden">
            <div className="bg-amber-500 p-4">
              <h2 className="text-lg font-bold text-white">Beer A</h2>
            </div>
            <div className="p-4">
              {beerA ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-16 rounded-lg"
                      style={{ background: getSrmColor(beerA.srm) }}
                    />
                    <div>
                      <h3 className="font-bold text-brown-800 dark:text-amber-100">{beerA.name}</h3>
                      <p className="text-sm text-brown-500">{beerA.brewery_name}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setBeerA(null)}
                    className="p-2 text-brown-400 hover:text-red-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for a beer..."
                    value={searchA}
                    onChange={(e) => {
                      setSearchA(e.target.value);
                      setShowDropdownA(true);
                    }}
                    onFocus={() => setShowDropdownA(true)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-amber-50 dark:bg-brown-700 border border-amber-200 dark:border-brown-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400" />

                  {showDropdownA && searchA && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-brown-700 border border-amber-200 dark:border-brown-600 rounded-lg shadow-lg z-10">
                      {filteredBeersA.map((beer) => (
                        <button
                          key={beer.id}
                          onClick={() => {
                            setBeerA(beer);
                            setSearchA('');
                            setShowDropdownA(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-amber-50 dark:hover:bg-brown-600"
                        >
                          <div className="font-medium text-brown-800 dark:text-amber-100">{beer.name}</div>
                          <div className="text-sm text-brown-500">{beer.brewery_name}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Beer B Selection */}
          <div className="bg-white dark:bg-brown-800 rounded-2xl border border-amber-100 dark:border-brown-700 overflow-hidden">
            <div className="bg-orange-500 p-4">
              <h2 className="text-lg font-bold text-white">Beer B</h2>
            </div>
            <div className="p-4">
              {beerB ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-16 rounded-lg"
                      style={{ background: getSrmColor(beerB.srm) }}
                    />
                    <div>
                      <h3 className="font-bold text-brown-800 dark:text-amber-100">{beerB.name}</h3>
                      <p className="text-sm text-brown-500">{beerB.brewery_name}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setBeerB(null)}
                    className="p-2 text-brown-400 hover:text-red-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for a beer..."
                    value={searchB}
                    onChange={(e) => {
                      setSearchB(e.target.value);
                      setShowDropdownB(true);
                    }}
                    onFocus={() => setShowDropdownB(true)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-amber-50 dark:bg-brown-700 border border-amber-200 dark:border-brown-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400" />

                  {showDropdownB && searchB && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-brown-700 border border-amber-200 dark:border-brown-600 rounded-lg shadow-lg z-10">
                      {filteredBeersB.map((beer) => (
                        <button
                          key={beer.id}
                          onClick={() => {
                            setBeerB(beer);
                            setSearchB('');
                            setShowDropdownB(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-amber-50 dark:hover:bg-brown-600"
                        >
                          <div className="font-medium text-brown-800 dark:text-amber-100">{beer.name}</div>
                          <div className="text-sm text-brown-500">{beer.brewery_name}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        {beerA && beerB && (
          <div className="bg-white dark:bg-brown-800 rounded-2xl border border-amber-100 dark:border-brown-700 overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-brown-800 dark:text-amber-100 mb-6 text-center">
                {beerA.name} vs {beerB.name}
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-amber-200 dark:border-brown-600">
                      <th className="py-3 px-4 text-left text-amber-600 font-semibold">Attribute</th>
                      <th className="py-3 px-4 text-center bg-amber-50 dark:bg-amber-900/30 font-semibold text-brown-800 dark:text-amber-100">
                        {beerA.name}
                      </th>
                      <th className="py-3 px-4 text-center bg-orange-50 dark:bg-orange-900/30 font-semibold text-brown-800 dark:text-amber-100">
                        {beerB.name}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-amber-100 dark:border-brown-700">
                      <td className="py-3 px-4 text-brown-600 dark:text-brown-300">Brewery</td>
                      <td className="py-3 px-4 text-center">{beerA.brewery_name}</td>
                      <td className="py-3 px-4 text-center">{beerB.brewery_name}</td>
                    </tr>
                    <tr className="border-b border-amber-100 dark:border-brown-700">
                      <td className="py-3 px-4 text-brown-600 dark:text-brown-300">Style</td>
                      <td className="py-3 px-4 text-center">{beerA.style_name}</td>
                      <td className="py-3 px-4 text-center">{beerB.style_name}</td>
                    </tr>
                    <tr className="border-b border-amber-100 dark:border-brown-700">
                      <td className="py-3 px-4 text-brown-600 dark:text-brown-300">ABV</td>
                      <td className={`py-3 px-4 text-center font-bold ${compareValue(beerA.abv, beerB.abv) === 'a' ? 'text-green-600' : ''}`}>
                        {beerA.abv ? `${beerA.abv}%` : 'N/A'}
                        {compareValue(beerA.abv, beerB.abv) === 'a' && <Check className="w-4 h-4 inline ml-1" />}
                      </td>
                      <td className={`py-3 px-4 text-center font-bold ${compareValue(beerA.abv, beerB.abv) === 'b' ? 'text-green-600' : ''}`}>
                        {beerB.abv ? `${beerB.abv}%` : 'N/A'}
                        {compareValue(beerA.abv, beerB.abv) === 'b' && <Check className="w-4 h-4 inline ml-1" />}
                      </td>
                    </tr>
                    <tr className="border-b border-amber-100 dark:border-brown-700">
                      <td className="py-3 px-4 text-brown-600 dark:text-brown-300">IBU (Bitterness)</td>
                      <td className={`py-3 px-4 text-center font-bold ${compareValue(beerA.ibu, beerB.ibu) === 'a' ? 'text-green-600' : ''}`}>
                        {beerA.ibu || 'N/A'}
                        {compareValue(beerA.ibu, beerB.ibu) === 'a' && <Check className="w-4 h-4 inline ml-1" />}
                      </td>
                      <td className={`py-3 px-4 text-center font-bold ${compareValue(beerA.ibu, beerB.ibu) === 'b' ? 'text-green-600' : ''}`}>
                        {beerB.ibu || 'N/A'}
                        {compareValue(beerA.ibu, beerB.ibu) === 'b' && <Check className="w-4 h-4 inline ml-1" />}
                      </td>
                    </tr>
                    <tr className="border-b border-amber-100 dark:border-brown-700">
                      <td className="py-3 px-4 text-brown-600 dark:text-brown-300">Color (SRM)</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <div
                            className="w-8 h-8 rounded"
                            style={{ background: getSrmColor(beerA.srm) }}
                          />
                          <span>{beerA.srm || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <div
                            className="w-8 h-8 rounded"
                            style={{ background: getSrmColor(beerB.srm) }}
                          />
                          <span>{beerB.srm || 'N/A'}</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-amber-100 dark:border-brown-700">
                      <td className="py-3 px-4 text-brown-600 dark:text-brown-300">Country</td>
                      <td className="py-3 px-4 text-center">{beerA.country_of_origin}</td>
                      <td className="py-3 px-4 text-center">{beerB.country_of_origin}</td>
                    </tr>
                    <tr className="border-b border-amber-100 dark:border-brown-700">
                      <td className="py-3 px-4 text-brown-600 dark:text-brown-300">Type</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${beerA.is_craft ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                          {beerA.is_craft ? 'Craft' : 'Commercial'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${beerB.is_craft ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                          {beerB.is_craft ? 'Craft' : 'Commercial'}
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-amber-100 dark:border-brown-700">
                      <td className="py-3 px-4 text-brown-600 dark:text-brown-300">Availability</td>
                      <td className="py-3 px-4 text-center capitalize">{beerA.availability || 'Year-round'}</td>
                      <td className="py-3 px-4 text-center capitalize">{beerB.availability || 'Year-round'}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-brown-600 dark:text-brown-300">Flavor Tags</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap justify-center gap-1">
                          {beerA.tags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 rounded-full text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap justify-center gap-1">
                          {beerB.tags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 rounded-full text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Popular Comparisons */}
        <div>
          <h2 className="text-2xl font-bold text-brown-800 dark:text-amber-100 mb-6">
            Popular Comparisons
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularComparisons.map((comp) => (
              <button
                key={comp.title}
                onClick={() => {
                  setBeerA(getBeerById(comp.a) || null);
                  setBeerB(getBeerById(comp.b) || null);
                }}
                className="flex items-center justify-between p-4 bg-white dark:bg-brown-800 rounded-xl border border-amber-200 dark:border-brown-700 hover:border-amber-400 dark:hover:border-amber-600 transition-colors text-left"
              >
                <span className="font-medium text-brown-800 dark:text-amber-100">{comp.title}</span>
                <ArrowRight className="w-5 h-5 text-amber-600" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background py-8 flex items-center justify-center">
        <div className="animate-pulse text-amber-600">Loading comparison tool...</div>
      </div>
    }>
      <CompareContent />
    </Suspense>
  );
}
