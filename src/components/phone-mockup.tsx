"use client"

import * as React from "react"
import Image from "next/image"

export function PhoneMockup() {
  return (
    <div className="w-[280px] h-[560px] bg-slate-900/80 rounded-[3rem] border-[8px] border-slate-800 overflow-hidden shadow-2xl flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 bg-blue-500 rounded-full animate-pulse" />
          <div className="text-lg font-bold text-white">Orvio</div>
        </div>
      </div>
      
      {/* Content Skeleton */}
      <div className="flex-1 p-4 space-y-4">
        {/* Stats Card */}
        <div className="bg-slate-800/50 p-4 rounded-lg">
          <div className="h-6 w-24 bg-slate-700 rounded animate-pulse mb-2" />
          <div className="h-8 w-32 bg-blue-500/30 rounded animate-pulse" />
        </div>
        
        {/* List Items */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-slate-700 rounded-full animate-pulse" />
            <div className="flex-1">
              <div className="h-4 w-3/4 bg-slate-700 rounded animate-pulse mb-2" />
              <div className="h-3 w-1/2 bg-slate-700/50 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-slate-800 flex justify-around">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-6 w-6 bg-slate-700 rounded animate-pulse" />
        ))}
      </div>
    </div>
  )
} 