/**
 *
 * @param {*} node 찾을 요소
 * @returns {index} 부모 안에서 몇 번째 자식인지 index를 반환하고, 찾지 못하면 -1을 반환합니다.
 *
 */
function getNodeIndex(node) {
  return [].indexOf.call(node.parentNode.children, node);
}

export default getNodeIndex;
