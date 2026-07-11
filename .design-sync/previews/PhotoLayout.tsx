import { PhotoLayout } from 'portfolio';

const MR_BROWN_IMAGES = [
  '/projects/mr-brown/web/1 Large.jpeg',
  '/projects/mr-brown/web/2 Large.jpeg',
  '/projects/mr-brown/web/3 Large.jpeg',
  '/projects/mr-brown/web/5 Large.jpeg',
  '/projects/mr-brown/web/DSC02528 Large.jpeg',
  '/projects/mr-brown/web/DSC02645 Large.jpeg',
];

const LANDSCAPE_IMAGES = [
  '/projects/landscape/DSC09720.jpg',
  '/projects/landscape/DSC05091.JPG',
  '/projects/landscape/DSC06773.jpg',
  '/projects/landscape/DSC09680.jpg',
  '/projects/landscape/DSC06993.jpg',
  '/projects/landscape/DSC08772.JPG',
];

export const Essay = () => (
  <PhotoLayout layout="essay" images={MR_BROWN_IMAGES} title="Mr. Brown" />
);

export const Wide = () => (
  <PhotoLayout layout="wide" images={LANDSCAPE_IMAGES} title="Landscape" />
);

export const Editorial = () => (
  <PhotoLayout layout="editorial" images={LANDSCAPE_IMAGES} title="Landscape" />
);
