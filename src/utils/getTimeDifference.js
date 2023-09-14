function getTimeDifference(time) {
  const beforeDate = new Date(time);
  const currentDate = new Date();

  const beforeTime = beforeDate.getTime();
  const currentTime = currentDate.getTime();

  const timeDifferenceMs = currentTime - beforeTime;
  const timeDifferenceDay = timeDifferenceMs / (24 * 60 * 60 * 1000);
  const timeDifferenceH = timeDifferenceMs / (60 * 60 * 1000);
  const timeDifferenceM = timeDifferenceMs / (60 * 1000);

  const result =
    timeDifferenceM > 24
      ? `${Math.round(timeDifferenceDay)}일 전`
      : timeDifferenceH < 1
      ? `${Math.round(timeDifferenceM)}분 전`
      : `${Math.round(timeDifferenceH)}시간 전`;

  return result;
}

export default getTimeDifference;
