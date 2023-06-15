import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Marketplace Administrator'];
  const roles = ['End Customer', 'Marketplace Administrator', 'Seller Owner'];
  const applicationName = `Climio - DIY Marketplace`;
  const tenantName = `Organization`;
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `1. As a Marketplace Administrator, I want to be able to create and manage Organizations so that I can onboard new sellers/vendors to our marketplace.

2. As a Marketplace Administrator, I want to be able to define provisions per seller, product category, and price range so that I can manage the revenue share for each seller/vendor.

3. As a Seller Owner, I want to be able to connect my shop system (Shopify, Shopware 5, Shopware 6, Plentymarkets, Prestashop, JTL Shop, Magneto 2, or Woo Commerce) to the marketplace via APIs so that I can sync my product listings with the marketplace.

4. As a Seller Owner, I want to be able to sync my product inventories and prices with the marketplace regularly so that my product information is always up-to-date.

5. As a Seller Owner, I want to be able to sync orders from the marketplace with my shop system so that I can manage and fulfill orders efficiently.

6. As a Seller Owner, I want to be able to sync fulfillment details with the marketplace so that end customers can track their orders.

7. As a Seller Owner, I want to be able to manage payment and payout details on the platform so that I can receive payments for my sales.

8. As an End Customer, I want to be able to browse and search for products from various sellers/vendors on the marketplace so that I can find the products I need for my DIY/home improvement projects.

9. As an End Customer, I want to be able to place orders for products on the marketplace so that I can purchase the items I need.

10. As an End Customer, I want to be able to track my order fulfillment details so that I can stay informed about the status of my order.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="30px" bottom="20px" zIndex={3}>
      <Popover placement="top-end">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent w="50vw" h="70vh">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
