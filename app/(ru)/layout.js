import '../globals.css';
import ClientLayout from './components/ClientLayout';

export const metadata = {
  title: 'UniFood',
  description: 'UniFood - Ваш университетский помощник в выборе еды',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
} 