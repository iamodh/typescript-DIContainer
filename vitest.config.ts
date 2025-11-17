import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // ...
    globals: true,
    exclude: [
      ...configDefaults.exclude, // Vitest의 기본 제외 목록 (node_modules 등)
      'built/**', // 'built' 폴더와 그 하위 모든 파일을 제외
    ],
  },
});
