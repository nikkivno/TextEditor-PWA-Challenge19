import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const db = await openDB("jate", 1);
    const tx = db.transaction("jate", "readwrite");
    const store = tx.objectStore("jate");

    const result = await store.put({ value: content, id: 1 });

    console.log("Data added to the database", result);
  } catch (error) {
    console.error("Error adding data to the database", error);
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const db = await openDB("jate", 1);
    const tx = db.transaction("jate", "readonly");
    const store = tx.objectStore("jate");

    const result = await store.get(1);

    console.log("All data from the database:", result);
    return result?.value;
  } catch (error) {
    console.error("Error getting data from the database:", error);
    return;
  }
};

initdb();
