'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import SupportChat from './SupportChat';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  const isProfilePage = pathname === '/account/profile';

  return (
    <>
      {children}
      {!isProfilePage && <SupportChat />}
    </>
  );
} 