
import { Box } from '@chakra-ui/react';
import { Head } from '@inertiajs/react';
import React from 'react'

interface RootLayoutProps {
  children: React.ReactNode;
  title?: string;
}

function RootLayout({ children, title = 'Lokal Pikol' }: RootLayoutProps) {
  return (
    <>
      <Head title={title}>
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
      </Head>

            <Box minH="100vh" bg="gray.50">
      {children}
      </Box>
    </>
  )
}

export default RootLayout