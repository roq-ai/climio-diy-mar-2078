import * as yup from 'yup';

export const orderItemValidationSchema = yup.object().shape({
  quantity: yup.number().integer().required(),
  product_id: yup.string().nullable().required(),
  order_id: yup.string().nullable().required(),
});
