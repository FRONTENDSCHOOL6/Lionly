import PocketBase from 'pocketbase';



const pb = new PocketBase('https://lionly.pockethost.io/');
  
  
async function recordPending(collectionName, id) {
    try {
      const result = await pb.collection(collectionName).getOne(id, { requestKey: null });
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  

  export default recordPending;