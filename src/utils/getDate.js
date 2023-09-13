function getDate(createdDate) {
  const date = new Date(createdDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());

  const hours = String(
    date.getHours() > 12
      ? '오후 ' + String(date.getHours() - 12)
      : '오전 ' + String(date.getHours() === 0 ? 12 : date.getHours())
  );
  const minutes = String(date.getMinutes());
  // const seconds = String(date.getSeconds());

  return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
}

export default getDate;
