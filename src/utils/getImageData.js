function renderImg(collection,id, value ){
  return `${import.meta.env.VITE_PB_API}/files/${collection}/${id}/${value}`
}

export default renderImg;