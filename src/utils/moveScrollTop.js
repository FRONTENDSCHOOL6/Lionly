function moveScrollTop() {
  return (window.onload = () => {
    setTimeout(() => {
      scrollTo(0, 0);
    }, 100);
  });
}

export default moveScrollTop;
