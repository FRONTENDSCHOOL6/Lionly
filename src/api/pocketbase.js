import PocketBase from 'pocketbase';

const pb = new PocketBase(import.meta.env.VITE_PB_URL);
// const pb = new PocketBase('https://lionly.pockethost.io/');
// pb.autoCancellation(false);

pb.autoCancellation(false);

export default pb;
