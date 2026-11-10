import React, { useState } from 'react';
import { ACADEMIC_SCHEDULE } from '../utils/characterLogic';

interface AcademicTimelineSectionProps {
  mode: 'angel' | 'realist';
}

export const AcademicTimelineSection: React.FC<AcademicTimelineSectionProps> = ({ mode }) => {
  const [selectedSemester, setSelectedSemester] = useState(0);

  const activeSemester = ACADEMIC_SCHEDULE[selectedSemester];

  return (
    <section id="timeline" className="py-24 sm:py-32 border-t border-current/15">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Section Heading */}
        <div className="mb-14 space-y-3 text-left">
          <div className="text-xs font-mono tracking-widest uppercase opacity-60">
            RECORD NO. 05 · ACADEMIC CALENDAR & MILESTONES
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl tracking-tight ${
              mode === 'angel' ? 'font-serif-kr font-bold' : 'font-sans-kr font-bold'
            }`}
          >
            학교 일정 및 학사 타임라인
          </h2>
          <p className="text-xs sm:text-sm font-mono opacity-60 max-w-xl">
            신학기 5주차 벚꽃 만개에서 종업식까지. 둘만의 비밀이 덧칠되는 시간의 궤적.
          </p>
        </div>

        {/* Semester Selector Tabs (No pill buttons, clean monospace editorial tabs) */}
        <div className="flex items-center gap-6 border-b border-current/20 pb-2 mb-8 text-xs font-mono">
          {ACADEMIC_SCHEDULE.map((s, idx) => (
            <button
              key={s.semester}
              type="button"
              onClick={() => setSelectedSemester(idx)}
              className={`pb-2 relative tracking-wider transition-colors ${
                selectedSemester === idx
                  ? 'text-[#E85D75] font-bold border-b-2 border-[#E85D75] -mb-[2px]'
                  : 'opacity-50 hover:opacity-100'
              }`}
            >
              [{s.semester}]
            </button>
          ))}
        </div>

        {/* Schedule Ledger Rows */}
        <div className="border-t border-current/20 divide-y divide-current/15">
          {activeSemester.items.map((item, idx) => (
            <div
              key={item.date}
              className="py-6 sm:py-7 grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-2 sm:px-4 group hover:bg-current/3 transition-colors"
            >
              <div className="md:col-span-3 flex items-baseline gap-3">
                <span className="text-xs font-mono text-[#E85D75] font-bold">
                  {item.date}
                </span>
                <span className="text-[11px] font-mono opacity-50">
                  ({item.day})
                </span>
                <span className="text-[10px] font-mono opacity-30">
                  #{String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="md:col-span-4 font-bold text-sm tracking-tight font-mono">
                {item.title}
              </div>

              <div className="md:col-span-5 text-xs sm:text-sm opacity-80 leading-relaxed">
                {item.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Rule Instruction Note */}
        <div className="mt-8 pt-4 border-t border-current/10 flex flex-col sm:flex-row justify-between text-[11px] font-mono opacity-50">
          <span>* 일정은 해당 시점이 가까워질 때만 맥락 안에서 자연스럽게 언급됩니다 (선공개 금지 원칙).</span>
          <span>CAMPUS CALENDAR 2026</span>
        </div>
      </div>
    </section>
  );
};
