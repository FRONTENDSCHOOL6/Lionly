const handleKeyboardArrowControl = (e) => {
  if (e.key === 'ArrowRight') {
    e.target.parentNode.nextSibling?.firstChild.focus();
  } else if (e.key === 'ArrowLeft') {
    e.target.parentNode.previousSibling?.firstChild.focus();
  }
};

export default handleKeyboardArrowControl;
