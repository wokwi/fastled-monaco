/**
 * fastled-monaco Demo Project
 *
 * Copyright (C) 2021 Uri Shaked
 */

import { MonacoGlobal, registerFastLEDContributions } from '@wokwi/fastled-monaco';

const BLINK_CODE = `
#include <FastLED.h>

#define NUM_LEDS 1
#define DATA_PIN 3
#define CLOCK_PIN 13

CRGB leds[NUM_LEDS];

void setup() {
  FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS);  // GRB ordering is assumed
}

void loop() {
  leds[0] = CRGB::Red;
  FastLED.show();
  delay(500);

  leds[0] = CRGB::Black;
  FastLED.show();
  delay(500);
}
`.trim();

// Load Editor
const monacoRequire = (window as any).require;
monacoRequire.config({
  paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.22.3/min/vs' },
});
monacoRequire(['vs/editor/editor.main'], (monaco: MonacoGlobal) => {
  registerFastLEDContributions(monaco, 'cpp');
  const editor = monaco.editor.create(document.querySelector('.code-editor'), {
    value: BLINK_CODE,
    language: 'cpp',
    minimap: { enabled: false },
  });
});
