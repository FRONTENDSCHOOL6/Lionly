import PocketBase from 'pocketbase';

const pb = new PocketBase('https://lionly.pockethost.io/');
pb.autoCancellation(false);

export default pb;
