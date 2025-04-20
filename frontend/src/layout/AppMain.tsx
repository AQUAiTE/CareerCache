import { ReactNode } from 'react';

import { Box } from '@mantine/core';

type AppMainProps = {
  children: ReactNode;
}

const AppMain = ({ children }: AppMainProps) => {
  return (
    <Box py="lg" px="md">
      {children}
    </Box>
  );
};

export default AppMain