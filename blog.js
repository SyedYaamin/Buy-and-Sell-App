import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { auth, storage, db } from "./config.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";


// Checking User Status

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid);
    } else {
        window.location = 'index.html';
    }
});

// Logging Out the User

const logoutBtn = document.querySelector("#logout-btn");
logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location = 'index.html';
    }).catch((error) => {
        console.log(error);
    });
});


const form = document.querySelector("#form");
const productTitle = document.querySelector("#product-title");
const productDescription = document.querySelector("#product-description");
const productPrice = document.querySelector("#product-price");
const personName = document.querySelector("#person-name");
const personNumber = document.querySelector("#person-number");
const imageInput = document.querySelector("#image-input");



// Adding Image to the Storage and getting it

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (imageInput.files.length > 0) {
        const file = imageInput.files[0];
        const uniqueFileName = `${Date.now()}_${file.name}`;
        const blogAssets = ref(storage, `assets/${uniqueFileName}`);

        uploadBytes(blogAssets, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            getDownloadURL(blogAssets)
                .then((url) => {
                    console.log(url);
                    async function addingDataToFirestore() {
                        const docRef = await addDoc(collection(db, "blogPosts"), {
                            Title: productTitle.value,
                            Description: productDescription.value,
                            Price: productPrice.value,
                            Name: personName.value,
                            Number: personNumber.value,
                            imageURL: url
                        });
                        console.log("Document written with ID: ", docRef.id);
                    }
                    addingDataToFirestore();
                    window.location = 'home.html';
                }).catch((error) => {
                    console.log(error);
                })
                .catch((error) => {
                    console.log('Upload failed:', error);
                });
        })
    }
});

