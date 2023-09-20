const handlePreventTabControl = (e, shift) => {
  if (shift) {
    if (e.key === 'Tab' && e.shiftKey === true) {
      e.preventDefault();
    }
  } else {
    if (e.key === 'Tab' && e.shiftKey !== true) {
      e.preventDefault();
    }
  }
  return;
};

export default handlePreventTabControl;
