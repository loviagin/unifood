import '../globals.css';
import ClientLayout from './en/components/ClientLayout';

export const metadata = {
  title: 'UniFood',
  description: 'UniFood - Your university assistant in choosing food',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
} 