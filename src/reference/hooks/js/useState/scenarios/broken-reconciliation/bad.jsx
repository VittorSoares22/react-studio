import { useState } from 'react';
import { Capture, capture } from '@/components/capture/Capture.jsx';
import UiButton from '@/components/ui/UiButton.jsx';
import UiInput from '@/components/ui/UiInput.jsx';

export default function Example() {
  capture("logic");
  const [rows, setRows] = useState([{ text: 'A' }, { text: 'B' }]);
  capture("end logic");


  return (
    <div className="flex min-h-32 h-full flex-col gap-3">
        <div className="flex flex-1 flex-col gap-2 [&_p]:m-0 [&_p]:text-sm [&_p]:leading-snug">
          {rows.map((row, i) => (
            <Capture variant="ui">
            <UiInput
              key={i}
              value={row.text}
              onChange={(e) =>
                setRows((r) => r.map((x, j) => (j === i ? { ...x, text: e.target.value } : x)))
              }
              />
              </Capture>
          ))}
          <p className="text-sm text-[#c45]">
            key={'{i}'} reuses the first item's DOM node — text jumps to the neighbor
          </p>
        </div>
        <Capture variant="ui">
        <div className="mt-auto flex flex-wrap gap-1.5 border-t border-border pt-2.5">
          <UiButton onClick={() => setRows((r) => r.slice(1))}>Remove first</UiButton>
        </div>
        </Capture>
      </div>
  );
}
