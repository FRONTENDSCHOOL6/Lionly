import pb from './pocketbase';

async function getChannelList() {
  const channelsField = await pb.collection('feeds').getFullList();
  const channelList = [];

  channelList.push('전체 게시글');
  channelsField.map((item) => {
    if (!channelList.includes(item.channels)) {
      channelList.push(item.channels);
    }
  });

  return channelList;
}

export default getChannelList;
