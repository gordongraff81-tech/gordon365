import { Plus_Jakarta_Sans, DM_Sans, Exo_2 } from 'next/font/google';

export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
});

export const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
});

export const exo2 = Exo_2({
  subsets: ['latin'],
  variable: '--font-wordmark',
  display: 'swap',
  weight: ['700', '800'],
});
