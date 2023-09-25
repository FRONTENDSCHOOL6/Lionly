import lionHeadLogo from '@/assets/lionHeadLogo_common.svg';

function getPbImageURL(item, fileName = 'image') {
  if (item[fileName]) {
    return `https://lionly.pockethost.io/api/files/${item.collectionId}/${item.id}/${item[fileName]}`;
  } else {
    return lionHeadLogo;
  }
}
export default getPbImageURL;
