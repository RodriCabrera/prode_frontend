import { Text } from '../common.styles';
import {
  CheckBox,
  CheckBoxLabel,
  CheckBoxWrapper,
  ToggleContainer,
  ToggleWrapper,
} from './ToggleSwitch.styles';

function ToggleSwitch({ mode, setMode }) {
  const handleChange = () => {
    setMode(mode === 'results' ? 'edit' : 'results');
  };

  return (
    <ToggleContainer>
      <ToggleWrapper>
        <Text weight="700">RESULTADOS</Text>
        <CheckBoxWrapper>
          <CheckBox
            id="checkbox"
            type="checkbox"
            onChange={handleChange}
            value={mode}
            checked={mode === 'edit'}
          />
          <CheckBoxLabel htmlFor="checkbox" />
        </CheckBoxWrapper>
        <Text weight="700" color="tomato">
          PREDECIR
        </Text>
      </ToggleWrapper>
    </ToggleContainer>
  );
}

export default ToggleSwitch;
