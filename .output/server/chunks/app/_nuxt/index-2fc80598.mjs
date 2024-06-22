import { r as resolveUnrefHeadInput, d as useHead } from '../server.mjs';
import { ref, watchEffect } from 'vue';
import { composableNames, unpackMeta } from '@unhead/shared';

const coreComposableNames = [
  "injectHead"
];
({
  "@unhead/vue": [...coreComposableNames, ...composableNames]
});
function useSeoMeta(input, options) {
  const headInput = ref({});
  watchEffect(() => {
    const resolvedMeta = resolveUnrefHeadInput(input);
    const { title, titleTemplate, ...meta } = resolvedMeta;
    headInput.value = {
      title,
      titleTemplate,
      meta: unpackMeta(meta)
    };
  });
  return useHead(headInput, options);
}

export { useSeoMeta as u };
//# sourceMappingURL=index-2fc80598.mjs.map
