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
    timeDifferenceH > 24
      ? Math.round(timeDifferenceDay)
      : timeDifferenceH < 1
      ? Math.round(timeDifferenceM)
      : Math.round(timeDifferenceH);

  return result;
}

export default getTimeDifference;
