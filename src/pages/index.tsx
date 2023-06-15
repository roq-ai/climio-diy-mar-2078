import { Button, Flex, Heading, Image, Text, Stack, useBreakpointValue, Box, Link } from '@chakra-ui/react';

import { signIn, signUp, requireNextAuth } from '@roq/nextjs';

import Head from 'next/head';
import { HelpBox } from 'components/help-box';

function HomePage() {
  return (
    <>
      <Head>
        <title>{`Climio - DIY Marketplace`}</title>

        <meta
          name="description"
          content="Empower your business with Climio - DIY Marketplace, the ultimate platform for seamless integration with Shopify, Shopware, Plentymarkets, Prestashop, JTL Shop, Magneto 2, and Woo Commerce. Effortlessly sync product listings, inventory, pricing, and order fulfilment while managing payments and payouts with customizable provisions."
        />
      </Head>

      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack position="relative" spacing={6} w={'full'} maxW={'lg'}>
            <HelpBox />
            <Image src="/roq.svg" alt="Logo" w="150px" mb="8" />
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              <Text as={'span'}>Explore</Text>{' '}
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: useBreakpointValue({ base: '20%', md: '30%' }),
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'cyan.400',
                  zIndex: -1,
                }}
              >
                {`Climio - DIY Marketplace`}
              </Text>
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
              {`Empower your business with Climio - DIY Marketplace, the ultimate platform for seamless integration with Shopify, Shopware, Plentymarkets, Prestashop, JTL Shop, Magneto 2, and Woo Commerce. Effortlessly sync product listings, inventory, pricing, and order fulfilment while managing payments and payouts with customizable provisions.`}
            </Text>

            <Text>Organization</Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <Button
                rounded={'full'}
                bg={'cyan.500'}
                color={'white'}
                _hover={{
                  bg: 'cyan.700',
                }}
                onClick={() => signUp('marketplace-administrator')}
              >
                Create Account
              </Button>
              <Button rounded={'full'} onClick={() => signIn('marketplace-administrator')}>
                Login
              </Button>
            </Stack>

            <Text>End Customer</Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <Button
                rounded={'full'}
                bg={'cyan.500'}
                color={'white'}
                _hover={{
                  bg: 'cyan.700',
                }}
                onClick={() => signUp('end-customer')}
              >
                Register
              </Button>
              <Button rounded={'full'} onClick={() => signIn('end-customer')}>
                Login
              </Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex position="relative" flex={1}>
          <Image
            src={
              'https://images.unsplash.com/photo-1534960680480-ca9853707e10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTc4OTJ8MHwxfHNlYXJjaHwxfHxtYXJrZXRwbGFjZSUyQ2Vjb21tZXJjZXxlbnwwfHx8fDE2ODY4MzM1NDR8MA&ixlib=rb-4.0.3&q=80&w=1080'
            }
            alt={'Login Image'}
            objectFit={'cover'}
          />
          <Box position="absolute" top="0" backgroundColor="rgba(0,0,0,0.6)" width="100%" py="2">
            <Text align="center" fontSize="sm" color="white">
              Photo by{' '}
              <Link
                href="https://unsplash.com/@georgecoletrain?utm_source=roq-generator&utm_medium=referral"
                isExternal
                color="teal.200"
              >{`George Coletrain`}</Link>{' '}
              on{' '}
              <Link
                href="https://unsplash.com/?utm_source=roq-generator&utm_medium=referral"
                isExternal
                color="teal.200"
              >
                Unsplash
              </Link>
            </Text>
          </Box>
        </Flex>
      </Stack>
    </>
  );
}

export default requireNextAuth({
  redirectIfAuthenticated: true,
  redirectTo: '/users',
})(HomePage);
