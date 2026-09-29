import type { Locale } from '@/config/languages';
import en from '../messages/en.json';
import zh from '../messages/zh.json';
import hi from '../messages/hi.json';
import es from '../messages/es.json';
import fr from '../messages/fr.json';
import ar from '../messages/ar.json';
import bn from '../messages/bn.json';
import pt from '../messages/pt.json';
import ru from '../messages/ru.json';
import ur from '../messages/ur.json';
import sw from '../messages/sw.json';
import ha from '../messages/ha.json';
import mi from '../messages/mi.json';

export type Messages = typeof en;

/** UI strings for every supported locale. English is the source of truth. */
export const MESSAGES: Record<Locale, Messages> = { en, zh, hi, es, fr, ar, bn, pt, ru, ur, sw, ha, mi };

export function getMessages(locale: string): Messages {
  return MESSAGES[locale as Locale] ?? en;
}
