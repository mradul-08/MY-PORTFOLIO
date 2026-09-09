# Image Loading Performance Research

## Diagnosis

The home page previously rendered all content conditionally only after a ten-second countdown reached zero. Because the image components did not exist in the DOM during that countdown, the browser could not discover or request the hero image until after the loader finished. This created a visible blank/late-image phase.

The project also contains several large source images, including service assets above 10 MB. Loading every image eagerly would make the first visit slower and compete with the actual above-the-fold content.

## Recommended strategy

1. Mount the page immediately underneath the preloader so image requests can begin during the intro animation.
2. Keep the preloader short and fade the page in after it completes.
3. Preload only the hero image because it is the first important visual and likely LCP candidate.
4. Keep below-the-fold images on Next.js native lazy loading with blur placeholders.
5. Keep explicit `sizes` values on responsive images so Next.js can request an appropriately sized variant instead of an unnecessarily large asset.
6. Compress the largest original assets to WebP or AVIF in a follow-up asset pipeline; this is the biggest remaining bandwidth opportunity.

## Implemented in this pass

- The home page now mounts immediately beneath the loader.
- The loader was reduced from ten seconds to three seconds.
- The hero image is marked as high priority with responsive sizing and quality 80.
- The rest of the image tree remains lazy/optimized instead of flooding the first request.

## Why not eagerly load every image?

Next.js recommends preloading the LCP/above-the-fold image and using lazy loading for images outside the initial viewport. Browser-level lazy loading is supported across major browsers and prevents below-the-fold images from competing with first paint.

Sources:

- [Next.js Image Component documentation](https://nextjs.org/docs/app/api-reference/components/image)
- [Next.js Image Optimization guide](https://nextjs.org/docs/app/getting-started/images)
- [web.dev: Browser-level image lazy loading](https://web.dev/articles/browser-level-image-lazy-loading)
- [web.dev: Responsive images](https://web.dev/learn/design/responsive-images)
