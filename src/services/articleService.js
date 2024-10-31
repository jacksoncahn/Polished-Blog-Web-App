
import { db } from "../firebaseConfig"
import {
  collection,
  query,
  getDocs,
  addDoc,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore"

export async function createArticle({ title, body }) {
  const data = { title, body, date: Timestamp.now() }
  data.date = data.date.toDate()
  const docRef = await addDoc(collection(db, "articles"), data)
  return { id: docRef.id, ...data }
}
// NOT FINISHED: This only gets the first 20 articles. In a real app,
// you would implement pagination.
export async function fetchArticles() {
  const snapshot = await getDocs(
    //we defined db in our firebaseConfig file
    //give me the 20 most recent articles from db ordering them in reverse order by their date  
    query(collection(db, "articles"), orderBy("date", "desc"), limit(20))
  )
  //data.date = date.toDate()
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    date: doc.data().date.toDate(),
  }))
}


