import React from 'react';
import ProviderStore from './store';
import ThemeProvider from './theme';

function ProviderApp({ children }: React.PropsWithChildren) {

  return (
    <ProviderStore>
        <ThemeProvider>
          {children}
        </ThemeProvider>
    </ProviderStore>
  );
}
export default ProviderApp
