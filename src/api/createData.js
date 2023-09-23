import pb from './pocketbase';

function createData(collection, data) {
  return pb.collection(collection).create(data);
}
export default createData;
