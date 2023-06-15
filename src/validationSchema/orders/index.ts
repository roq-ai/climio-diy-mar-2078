import * as yup from 'yup';

export const orderValidationSchema = yup.object().shape({
  status: yup.string().required(),
  end_customer_id: yup.string().nullable().required(),
});
