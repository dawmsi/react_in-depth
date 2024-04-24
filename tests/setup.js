import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

import "../jest.polyfills";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
