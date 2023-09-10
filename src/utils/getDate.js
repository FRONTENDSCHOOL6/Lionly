const { default: recordPending } = require("@/api/useFeedHeader");


async function getDate(collection, id) {
  const fetchedData = await recordPending(collection, id);
  const date = new Date(fetchedData.created);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());

  const hours = String(date.getHours());
  const minutes = String(date.getMinutes());
  const seconds = String(date.getSeconds());

  console.log(
    `${year}년${month}월${day}일 ${hours}시${minutes}분${seconds}초`
  );

  return `${year}년${month}월${day}일 ${hours}시${minutes}분${seconds}초`;
}