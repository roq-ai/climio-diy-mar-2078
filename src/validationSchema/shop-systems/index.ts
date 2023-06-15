import * as yup from 'yup';

export const shopSystemValidationSchema = yup.object().shape({
  name: yup.string().required(),
  api_key: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
