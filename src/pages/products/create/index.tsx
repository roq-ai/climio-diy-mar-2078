import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createProduct } from 'apiSdk/products';
import { Error } from 'components/error';
import { productValidationSchema } from 'validationSchema/products';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { ShopSystemInterface } from 'interfaces/shop-system';
import { getShopSystems } from 'apiSdk/shop-systems';
import { ProductInterface } from 'interfaces/product';

function ProductCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ProductInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createProduct(values);
      resetForm();
      router.push('/products');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ProductInterface>({
    initialValues: {
      name: '',
      price: 0,
      inventory: 0,
      category: '',
      shop_system_id: (router.query.shop_system_id as string) ?? null,
    },
    validationSchema: productValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Product
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="price" mb="4" isInvalid={!!formik.errors?.price}>
            <FormLabel>Price</FormLabel>
            <NumberInput
              name="price"
              value={formik.values?.price}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('price', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.price && <FormErrorMessage>{formik.errors?.price}</FormErrorMessage>}
          </FormControl>
          <FormControl id="inventory" mb="4" isInvalid={!!formik.errors?.inventory}>
            <FormLabel>Inventory</FormLabel>
            <NumberInput
              name="inventory"
              value={formik.values?.inventory}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('inventory', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.inventory && <FormErrorMessage>{formik.errors?.inventory}</FormErrorMessage>}
          </FormControl>
          <FormControl id="category" mb="4" isInvalid={!!formik.errors?.category}>
            <FormLabel>Category</FormLabel>
            <Input type="text" name="category" value={formik.values?.category} onChange={formik.handleChange} />
            {formik.errors.category && <FormErrorMessage>{formik.errors?.category}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<ShopSystemInterface>
            formik={formik}
            name={'shop_system_id'}
            label={'Select Shop System'}
            placeholder={'Select Shop System'}
            fetcher={getShopSystems}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'product',
  operation: AccessOperationEnum.CREATE,
})(ProductCreatePage);
