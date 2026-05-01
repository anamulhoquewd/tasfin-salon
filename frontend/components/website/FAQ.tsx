'use client';

import { useState } from 'react';
import SalonIcon from './SalonIcon';
import type { FaqItem } from '@/lib/types';

export default function FAQ({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="lm-faq">
      {items.map((f, i) => (
        <div key={f._id} className="lm-faq-item">
          <div className="lm-faq-q" onClick={() => setOpen(open === i ? null : i)}>
            {f.question}
            <span style={{ transform: open === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 200ms', display: 'inline-flex' }}>
              <SalonIcon name="chevronDown" size={20} stroke={1.5}/>
            </span>
          </div>
          {open === i && <div className="lm-faq-a">{f.answer}</div>}
        </div>
      ))}
    </div>
  );
}
