import { useFormik } from 'formik';
import { isEmpty } from 'lodash';
import {
  Button,
  CardTitle,
  CardWrapper,
  Input,
  Label,
  Form,
} from '../../common/common.styles';
import { toast } from 'react-toastify';
import { forgotPassword } from '../../api/auth';
import { authSchema } from '../../validationSchemas/auth';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '../../hooks/useIsMobile';

function ForgotPassword() {
  const { values, errors, handleChange } = useFormik({
    initialValues: {},
    validationSchema: authSchema.forgotPassword,
    validateOnMount: true,
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.promise(forgotPassword({...values, email: values.email.toLowerCase()}), {
      pending: 'Buscando usuario',
      success: `Mail enviado a ${values.email}`,
      error: {
        render({ data }) {
          return data?.response.data?.error;
        },
      },
    });
  };
  const isMobile = useIsMobile();

  return (
    <CardWrapper
      isMobile={isMobile}
      border={isMobile ? 'null' : ''}
      id="change-password-card-wrapper"
    >
      <>
        <CardTitle>Recuperar Contraseña</CardTitle>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="email">
            Email:
            <Input
              type="email"
              placeholder="User Email"
              name="email"
              required
              value={values.email}
              onChange={handleChange}
            />
          </Label>
          <Button disabled={!isEmpty(errors)}>Recuperar contraseña</Button>
          <Button grayscale padding="8px" onClick={() => navigate('/auth')}>
            Volver al login
          </Button>
        </Form>
      </>
    </CardWrapper>
  );
}

export default ForgotPassword;
