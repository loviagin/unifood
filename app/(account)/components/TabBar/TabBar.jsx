'use client';
import styles from './TabBar.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TabBar = () => {
    const pathname = usePathname();

    return (
        <nav className={styles.tabBar}>
            <Link
                href="/account"
                className={styles.tabItem}
                aria-current={pathname === '/account' ? 'page' : undefined}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9.02 2.84004L3.63 7.04004C2.73 7.74004 2 9.23004 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.29004 21.19 7.74004 20.2 7.05004L14.02 2.72004C12.62 1.74004 10.37 1.79004 9.02 2.84004Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 17.99V14.99" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Главная</span>
            </Link>

            <Link
                href="/account/profile"
                className={styles.tabItem}
                aria-current={pathname === '/account/profile' ? 'page' : undefined}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Профиль</span>
            </Link>
        </nav>
    );
};

export default TabBar; 