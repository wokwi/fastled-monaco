/**
 * FastLED Auto Complete for Monaco Editor
 *
 * Copyright (C) 2021, Uri Shaked
 */

import { fastLEDMethods } from './fastled-keywords';

export const nonVoidFastLEDMethods = ['getFPS', 'getBrightness'];

export function fastledAutocomplete(monaco: MonacoGlobal, value: string): CompletionItem[] | null {
  if (/\W(FastLED|LEDS)\s*\.\s*$/.test(value)) {
    return [
      ...fastLEDMethods.map((method) => ({
        label: method,
        kind: monaco.languages.CompletionItemKind.Method,
        insertText: nonVoidFastLEDMethods.includes(method) ? `${method}($1)` : `${method}($1);`,
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range: null as any,
      })),
    ];
  }

  return null;
}
