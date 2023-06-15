import * as yup from 'yup';

export const provisionValidationSchema = yup.object().shape({
  category: yup.string().required(),
  price_range: yup.string().required(),
  percentage: yup.number().integer().required(),
  seller_id: yup.string().nullable().required(),
});
