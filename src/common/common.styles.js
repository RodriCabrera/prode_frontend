import styled from '@emotion/styled';

export const CardTitle = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 2rem;
  flex-wrap: wrap;
`;

export const CardWrapper = styled.div`
  border: 1px solid #bdbdbd;
  border-radius: 8px;
  min-width: 200px;
  width: 80%;
  max-width: ${({ fullWidth }) => (fullWidth ? '100%' : '350px')};
  display: flex;
  padding: 1rem;
  gap: 1rem;
  flex-direction: column;
`;

export const Button = styled.button`
  background-color: inherit;
  display: flex;
  cursor: pointer;
  border: none;
  background-image: linear-gradient(
    ${({ grayscale }) =>
      grayscale
        ? '45deg, #818181 0%, #a4a4a4 51%, #818181 100%'
        : '45deg, darkorange 0%, tomato 51%, darkorange 100%'}
  );
  padding: ${({ padding }) => padding || '15px 30px'};
  text-align: center;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  letter-spacing: 1px;
  border-radius: 10px;
  display: block;
  border: 0px;
  color: white;
  font-weight: 600;
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
  padding: 10px;
  border-radius: 10px;
  background-color: #e5e5e5;
`;
export const Select = styled.select`
  padding: 10px;
  background-color: #e5e5e5;
  border-radius: 10px;
`;
export const Text = styled.p`
  text-align: ${({ align }) => align || 'left'};
  color: ${({ color }) => color || 'inherit'};
  font-size: ${(props) => props.size};
  font-weight: ${({ weight }) => weight};
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
