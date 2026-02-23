// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqEpeXMmTgY22AhR8yjTy9jxy27ERYYl0",
  authDomain: "fotografiranje-a6769.firebaseapp.com",
  projectId: "fotografiranje-a6769",
  storageBucket: "fotografiranje-a6769.firebasestorage.app",
  messagingSenderId: "670011656004",
  appId: "1:670011656004:web:08bea9f605b2515c98f911"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("bookingForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        await addDoc(collection(db, "rezervacije"), {
            name: form.name.value,
            email: form.email.value,
            date: form.date.value,
            offer: form.offer.value
        });

        msg.textContent = "Booking submitted successfully!";
        msg.style.color = "green";
        form.reset();

    } catch (error) {
        msg.textContent = "Error! Unable to submit.";
        msg.style.color = "red";
        console.error(error);
    }
});