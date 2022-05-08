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
`;

export const CardWrapper = styled.div`
  border: 1px solid #bdbdbd;
  border-radius: 8px;
  min-width: 200px;
  width: 80%;
  max-width: 350px;
  display: flex;
  padding: 1rem;
  gap: 1rem;
  flex-direction: column;
`;

export const Button = styled.button`
  background-color: inherit;
  display: flex;
  color: white;
  cursor: pointer;
  border: none;
  background-image: linear-gradient(
    ${(props) =>
      props.grayscale
        ? '45deg, #818181 0%, #a4a4a4 51%, #818181 100%'
        : '45deg, #ff512f 0%, #f09819 51%, #ff512f 100%'}
  );
  padding: ${(props) => (props.padding ? props.padding : '15px 30px')};
  text-align: center;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  letter-spacing: 1px;
  border-radius: 10px;
  display: block;
  border: 0px;
  font-weight: 600;
  box-shadow: 0px 0px 14px -7px #f09819;
  :hover {
    background-position: right center;
    /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
  }
  :active {
    transform: scale(0.95);
  }
  :disabled {
    background-image: none;
    color: darkgray;
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
  padding: 10px;
`;

export const Text = styled.p`
  text-align: ${(props) => (props.align ? props.align : 'left')};
  color: ${(props) => (props.color ? props.color : 'inherit')};
`;
