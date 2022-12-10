import { openDB } from 'idb';

const initdb = async () =>
  // Creation of a new database named 'jate' and uses version 1 of the database
  openDB('jate', 1, {
    // Adds the database schema if it has not already been initialised
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // Creates a new object store for the data 
      // Gives it a key name of 'id' which increments automatically
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Exports a function used to PUT content to the database:
export const putDb = async (content) => {
  console.log('PUT to the database');

  // Creates a connection to the database
  // Selects what version to use
  const jateDb = await openDB('jate', 1);

  // Creates a new transaction and 
  // Specifies the database and data privileges
  const tx = jateDb.transaction('jate', 'readwrite');

  // Opens up the desired object store
  const store = tx.objectStore('jate');

  // Use the .add() method on the store and pass in the content.
  const request = store.add({ id: 1, value: content });

  // Get confirmation of the request.
  const result = await request;
  console.log('🚀 - content saved to the database', result);
};

// Exports a function used to GET all the content from the database:
export const getDb = async () => {
  console.log('GET from the database');

  // Creates a connection to the database
  // Selects what version to use
  const jateDb = await openDB('jate', 1);

  // Creates a new transaction and 
  // Specifies the database and data privileges
  const tx = jateDb.transaction('jate', 'readonly');

  // Opens up the desired object store
  const store = tx.objectStore('jate');

  // Uses the .getAll() method to get all data in the database
  const request = store.getAll();

  // Get confirmation of the request
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
