import Link from 'next/link';

export default ({ pathname }: { pathname?: string }) => (
  <header>
    <Link href="/">
      <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
    </Link>
    <Link href="/about">
      <a className={pathname === '/about' ? 'is-active' : ''}>About</a>
    </Link>
    <Link href="/characters">
      <a className={pathname === '/characters' ? 'is-active' : ''}>キャラ</a>
    </Link>
  </header>
);
