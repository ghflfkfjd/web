import React, { useState } from 'react';
import { BELONGINGS, BeloningItem, NPCS } from '../utils/characterLogic';
import { LightboxImage } from './ImageLightboxModal';

interface BelongingsSectionProps {
  mode: 'angel' | 'realist';
  onOpenLightbox: (image: LightboxImage) => void;
}

export const BelongingsSection: React.FC<BelongingsSectionProps> = ({ mode, onOpenLightbox }) => {
  const [selectedItem, setSelectedItem] = useState<BeloningItem>(BELONGINGS[0]);

  return (
    <section id="belongings" className="py-24 sm:py-32 border-t border-current/15">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Section Heading */}
        <div className="mb-14 space-y-3 text-left">
          <div className="text-xs font-mono tracking-widest uppercase opacity-60">
            RECORD NO. 03 · INVENTORY & RELATION DOSSIER
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl tracking-tight ${
              mode === 'angel' ? 'font-serif-kr font-bold' : 'font-sans-kr font-bold'
            }`}
          >
            세아의 소지품과 주변 인물지
          </h2>
          <p className="text-xs sm:text-sm font-mono opacity-60 max-w-xl">
            가방 속 극현실적인 오브제와, 세아의 완벽주의 가면을 뒤흔드는 교내 인물들.
          </p>
        </div>

        {/* Part 1: Belongings Ledger Rows */}
        <div className="space-y-6">
          <span className="text-xs font-mono tracking-widest uppercase text-[#E85D75] font-bold block">
            PART 01 // SECRET BELONGINGS & HABITS
          </span>

          <div className="border-t border-current/20 divide-y divide-current/15">
            {BELONGINGS.map((item) => {
              const isSelected = selectedItem.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`py-6 sm:py-7 grid grid-cols-1 md:grid-cols-12 gap-4 items-center cursor-pointer transition-colors px-2 sm:px-4 ${
                    isSelected ? 'bg-current/5' : 'hover:bg-current/3'
                  }`}
                >
                  <div className="md:col-span-3 flex items-center gap-3">
                    <span className="text-xs font-mono text-[#E85D75] font-bold">
                      [{item.code}]
                    </span>
                    <h3 className="text-sm font-bold font-mono">
                      {item.name}
                    </h3>
                  </div>

                  <div className="md:col-span-5 text-xs sm:text-sm opacity-80">
                    {item.tagline}
                  </div>

                  <div className="md:col-span-4 text-xs font-mono italic opacity-60 text-right">
                    {isSelected ? '● CURRENTLY INSPECTING' : 'CLICK TO EXPAND'}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Item Dossier Detail Box */}
          <div className="relative pt-4 max-w-3xl">
            <div className="absolute top-0 left-8 w-24 h-4 tape-strip -rotate-1 z-10"></div>
            <div
              className={`p-6 sm:p-8 rounded-xs border text-left ${
                mode === 'angel'
                  ? 'bg-white/80 border-[#8A817A]/30 text-[#2A2624]'
                  : 'bg-[#1C1E27] border-[#7C7B85]/30 text-[#E7E2DA]'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono opacity-50 mb-3 border-b border-current/10 pb-2">
                <span>ITEM ARCHIVE // {selectedItem.code}</span>
                <span>CATALOGED</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
                <div className="sm:col-span-8 space-y-3">
                  <h4 className="text-base font-bold font-mono">
                    {selectedItem.name} — {selectedItem.tagline}
                  </h4>
                  <p className="text-xs sm:text-sm leading-relaxed opacity-85">
                    {selectedItem.detail}
                  </p>
                  <div className="pt-3 border-t border-current/10 text-xs font-mono">
                    <span className="text-[#E85D75] font-bold mr-2">세아의 독백:</span>
                    <span className="font-serif-kr italic opacity-90">{selectedItem.seahComment}</span>
                  </div>
                </div>

                {/* Associated Photographic Proof with Zoom Lightbox */}
                <div className="sm:col-span-4 flex flex-col items-center sm:items-end">
                  <div
                    onClick={() => {
                      const itemSrc =
                        selectedItem.code === 'NOTE_01'
                          ? '/assets/aistudio/1____43e18926.webp'
                          : selectedItem.code === 'ITEM_02'
                          ? '/assets/aistudio/1_____0d3f1358.webp'
                          : selectedItem.code === 'HAIR_03'
                          ? '/assets/aistudio/1____6fc86535.webp'
                          : selectedItem.code === 'NOTE_04'
                          ? '/assets/aistudio/1_____0b7c111a.webp'
                          : '/assets/aistudio/1____cd87b824.webp';

                      const itemTag =
                        selectedItem.code === 'NOTE_01'
                          ? '1_애교.webp'
                          : selectedItem.code === 'ITEM_02'
                          ? '1_신사탕.webp'
                          : selectedItem.code === 'HAIR_03'
                          ? '1_거울.webp'
                          : selectedItem.code === 'NOTE_04'
                          ? '1_피곤함.webp'
                          : '1_유혹.webp';

                      onOpenLightbox({
                        src: itemSrc,
                        title: `${selectedItem.name} — 사진 증거`,
                        subtitle: selectedItem.tagline,
                        quote: selectedItem.seahComment,
                        caption: selectedItem.detail,
                        fileTag: itemTag
                      });
                    }}
                    className="relative pt-2 cursor-zoom-in group select-none"
                    title="클릭하여 고화질 확대"
                  >
                    <div className="absolute top-0 right-4 w-12 h-3 tape-strip rotate-2 z-10"></div>
                    <div className="w-24 sm:w-28 aspect-3/4 border border-current/25 rounded-[1px] overflow-hidden bg-black/10 shadow-xs group-hover:border-[#E85D75] transition-colors relative">
                      <img
                        src={
                          selectedItem.code === 'NOTE_01'
                            ? '/assets/aistudio/1____43e18926.webp'
                            : selectedItem.code === 'ITEM_02'
                            ? '/assets/aistudio/1_____0d3f1358.webp'
                            : selectedItem.code === 'HAIR_03'
                            ? '/assets/aistudio/1____6fc86535.webp'
                            : selectedItem.code === 'NOTE_04'
                            ? '/assets/aistudio/1_____0b7c111a.webp'
                            : '/assets/aistudio/1____cd87b824.webp'
                        }
                        alt={selectedItem.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute bottom-1 right-1 text-[8px] font-mono bg-black/70 text-white px-1 rounded-xs">
                        확대 ⌕
                      </span>
                    </div>
                    <div className="text-[9px] font-mono opacity-60 text-center sm:text-right mt-1 group-hover:text-[#E85D75] transition-colors">
                      {selectedItem.code === 'NOTE_01'
                        ? '1_애교 (수첩 수호)'
                        : selectedItem.code === 'ITEM_02'
                        ? '1_신사탕 (공범 거래)'
                        : selectedItem.code === 'HAIR_03'
                        ? '1_거울 (귀 끝 붉어짐)'
                        : selectedItem.code === 'NOTE_04'
                        ? '1_피곤함 (방과 후 방전)'
                        : '1_유혹 (손익 계산서)'}{' '}
                      ⌕
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Part 2: NPC Relationship Dossier */}
        <div className="mt-20 space-y-6">
          <span className="text-xs font-mono tracking-widest uppercase text-[#E85D75] font-bold block">
            PART 02 // NPC STORY CATALYSTS (주변 인물 관계)
          </span>

          <div className="border-t border-current/20 divide-y divide-current/15">
            {NPCS.map((npc) => (
              <div
                key={npc.name}
                className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start px-2 sm:px-4"
              >
                <div className="md:col-span-3 space-y-0.5">
                  <span className="text-sm font-bold font-mono text-[#E85D75]">
                    Ⓝ {npc.name}
                  </span>
                  <div className="text-[11px] font-mono opacity-50">{npc.role}</div>
                </div>

                <div className="md:col-span-3 text-xs font-mono font-semibold opacity-75">
                  {npc.relation}
                </div>

                <div className="md:col-span-6 text-xs sm:text-sm opacity-80 leading-relaxed">
                  {npc.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
