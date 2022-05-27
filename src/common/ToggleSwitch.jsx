import React from 'react';
import { Label } from './common.styles';

function ToggleSwitch({ mode }) {
  const handleChange = () => {
    mode.setMode(mode.mode === 'results' ? 'edit' : 'results');
  };

  return (
    <div>
      <input
        id="checkbox"
        type="checkbox"
        onChange={handleChange}
        value={mode.mode}
        checked={mode.mode === 'edit'}
      />
      <Label htmlFor="checkbox" />
    </div>
  );
}

export default ToggleSwitch;
