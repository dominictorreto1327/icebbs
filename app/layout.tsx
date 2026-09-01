import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '冰点论坛 · ICEBBS',
  description: '冰点论坛是一个收录个人项目、开发记录、阅读写作与生活兴趣的静态个人网站。',
  icons: { icon: '/icebbs/favicon.svg' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN" id="top"><body>{children}</body></html>;
}
