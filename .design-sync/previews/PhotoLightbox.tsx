import { PhotoLightbox } from 'portfolio';

const IMAGES = [
  '/projects/mr-brown/web/1 Large.jpeg',
  '/projects/mr-brown/web/2 Large.jpeg',
  '/projects/mr-brown/web/3 Large.jpeg',
];

const noop = () => {};

export const Default = () => (
  <PhotoLightbox images={IMAGES} index={0} onClose={noop} onPrev={noop} onNext={noop} />
);
