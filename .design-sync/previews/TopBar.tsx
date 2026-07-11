import { TopBar } from 'portfolio';

const noop = () => {};

export const Films = () => <TopBar section="films" setSection={noop} />;
export const Travel = () => <TopBar section="travel" setSection={noop} />;
export const Photography = () => <TopBar section="photography" setSection={noop} />;
export const About = () => <TopBar section="about" setSection={noop} />;
