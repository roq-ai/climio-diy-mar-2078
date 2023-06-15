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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getProvisionById, updateProvisionById } from 'apiSdk/provisions';
import { Error } from 'components/error';
import { provisionValidationSchema } from 'validationSchema/provisions';
import { ProvisionInterface } from 'interfaces/provision';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function ProvisionEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ProvisionInterface>(
    () => (id ? `/provisions/${id}` : null),
    () => getProvisionById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ProvisionInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateProvisionById(id, values);
      mutate(updated);
      resetForm();
      router.push('/provisions');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<ProvisionInterface>({
    initialValues: data,
    validationSchema: provisionValidationSchema,
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
            Edit Provision
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="category" mb="4" isInvalid={!!formik.errors?.category}>
              <FormLabel>Category</FormLabel>
              <Input type="text" name="category" value={formik.values?.category} onChange={formik.handleChange} />
              {formik.errors.category && <FormErrorMessage>{formik.errors?.category}</FormErrorMessage>}
            </FormControl>
            <FormControl id="price_range" mb="4" isInvalid={!!formik.errors?.price_range}>
              <FormLabel>Price Range</FormLabel>
              <Input type="text" name="price_range" value={formik.values?.price_range} onChange={formik.handleChange} />
              {formik.errors.price_range && <FormErrorMessage>{formik.errors?.price_range}</FormErrorMessage>}
            </FormControl>
            <FormControl id="percentage" mb="4" isInvalid={!!formik.errors?.percentage}>
              <FormLabel>Percentage</FormLabel>
              <NumberInput
                name="percentage"
                value={formik.values?.percentage}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('percentage', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.percentage && <FormErrorMessage>{formik.errors?.percentage}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'seller_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'provision',
  operation: AccessOperationEnum.UPDATE,
})(ProvisionEditPage);
