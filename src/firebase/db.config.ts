import { collection, getDocs, getFirestore } from "firebase/firestore"
import { app } from "./app.config"

export const db = getFirestore(app);

const tasksCollection = collection(db, "tasks");
const listsCollection = collection(db, "lists");

export const getAllTasks = async () => await getDocs(tasksCollection);

export {tasksCollection, listsCollection};

