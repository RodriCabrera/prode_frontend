import styled from '@emotion/styled';

export const CardTitle = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
  max-width: 100%;
`;

export const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 2rem;
  flex-wrap: wrap;
`;

export const CardWrapper = styled.div`
  border: ${({ border }) => border || '1px solid #bdbdbd'};
  border-radius: 8px;
  min-width: 200px;
  width: 80%;
  max-width: ${({ fullWidth }) => (fullWidth ? '100%' : '350px')};
  display: flex;
  padding: 1rem;
  gap: 1rem;
  flex-direction: column;
  justify-content: ${({ justify }) => justify || 'intial'};
  align-items: ${({ align }) => align || 'initial'};
`;

export const Button = styled.button`
  background-color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width || 'auto'};
  cursor: pointer;
  border: none;

  background-image: linear-gradient(
    ${({ tertiary, grayscale }) => {
      if (tertiary) {
        return '45deg, #FA8072 0%, #FF7261 51%, #FA8072 100%';
      }
      if (grayscale) {
        return '45deg, #818181 0%, #a4a4a4 51%, #818181 100%';
      }
      return '45deg, darkorange 0%, tomato 51%, darkorange 100%';
    }}
  );
  background-color: ${({ tertiary }) => tertiary && 'salmon'};
  padding: ${({ padding }) => padding || '15px 30px'};
  text-align: center;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  letter-spacing: 1px;
  border-radius: 10px;
  border: 0px;
  color: white;
  font-weight: ${({ weight }) => weight || '600'};
  box-shadow: 0px 0px 14px -7px #fff;
  :hover {
    background-position: right center;
    color: #fff;
    text-decoration: none;
  }
  :active {
    transform: scale(0.95);
  }
  :disabled {
    background-image: none;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Input = styled.input`
  text-transform: ${({ showUppercase }) => showUppercase && 'uppercase'};
  width: ${({ width }) => width};
  padding: 10px;
  border-radius: 10px;
  background-color: #e5e5e5;
  :disabled {
    background-color: darkgray;
  }
  text-align: ${({ align }) => align || 'initial'};
`;

export const TextareaInput = styled.textarea`
  text-transform: ${({ showUppercase }) => showUppercase && 'uppercase'};
  width: ${({ width }) => width};
  padding: 10px;
  border-radius: 10px;
  background-color: #e5e5e5;
  :disabled {
    background-color: darkgray;
  }
  resize: none;
`;

export function ScoreInput() {
  return <Input type="number" width="30px" />;
}

export const Select = styled.select`
  padding: 10px;
  background-color: #e5e5e5;
  border-radius: 10px;
`;

export const Text = styled.p`
  text-align: ${({ align }) => align || 'left'};
  color: ${({ color }) => color || 'inherit'};
  font-size: ${({ size }) => size};
  font-weight: ${({ weight }) => weight};
  margin: ${({ margin }) => margin || '0'};
  transition: all ease 0.5s;
  &:after {
    ${({ withBottomBorder }) =>
      withBottomBorder &&
      `content: "";
        display: block;
        width: 100%;
        height: 1px;
        background: white;
    `}
  }
`;
