const handleKeyboardArrowControl = (e, parentNode) => {
  if (parentNode) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.target.parentNode.nextSibling?.firstChild.focus();
      return;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.target.parentNode.previousSibling?.firstChild.focus();
      return;
    }
  } else {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.target.nextSibling?.focus();
      return;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.target.previousSibling?.focus();
      return;
    }
  }
};

export default handleKeyboardArrowControl;
