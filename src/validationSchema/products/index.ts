import * as yup from 'yup';

export const productValidationSchema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().integer().required(),
  inventory: yup.number().integer().required(),
  category: yup.string().required(),
  shop_system_id: yup.string().nullable().required(),
});
