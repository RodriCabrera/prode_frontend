import { Text } from "../common.styles";
import {
  CheckBox,
  CheckBoxLabel,
  CheckBoxWrapper,
  ToggleContainer,
  ToggleWrapper,
} from "./ToggleSwitch.styles";

function ToggleSwitch({ mode, setMode, modes }) {
  const handleChange = () => {
    setMode(mode === modes.right.name ? modes.left.name : modes.right.name);
  };

  return (
    <ToggleContainer>
      <ToggleWrapper>
        <Text
          weight="700"
          color={mode === modes.left.name ? modes.left.color : undefined}
        >
          {modes.left.display}
        </Text>
        <CheckBoxWrapper>
          <CheckBox
            id="checkbox"
            type="checkbox"
            onChange={handleChange}
            value={mode}
            checked={mode === modes.right.name}
          />
          <CheckBoxLabel
            htmlFor="checkbox"
            boxColor={
              mode === modes.right.name ? modes.right.color : modes.left.color
            }
          />
        </CheckBoxWrapper>
        <Text
          weight="700"
          color={mode === modes.right.name ? modes.right.color : undefined}
        >
          {modes.right.display}
        </Text>
      </ToggleWrapper>
    </ToggleContainer>
  );
}

export default ToggleSwitch;
