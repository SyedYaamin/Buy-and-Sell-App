import { signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const logoutBtn = document.querySelector("#logout-btn");
logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location = 'index.html';
    }).catch((error) => {
        console.log(error);
    });
});

const renderBlogs = document.querySelector("#render-blogs");
let blogArr = [];

const readDataFromFirestore = async () => {
    blogArr = [];
    const querySnapshot = await getDocs(collection(db, "blogPosts"));
    querySnapshot.forEach((doc) => {
        blogArr.push(doc.data());
    });
    renderFunction();
};

const renderFunction = () => {
    renderBlogs.innerHTML = '';
    blogArr.map((item) => {
        renderBlogs.innerHTML += `
                <div class="card bg-base-100 max-w-2xl shadow-xl">
                        <figure>
                            <img class="max-w-md max-h-96" src="${item.imageURL}"
                                alt="Shoes" />
                        </figure>
                        <div class="card-body px-[50px]">
                            <h2 class="card-title text-2xl font-bold">${item.Title}</h2>
                            <p>${item.Description}</p>
                            <div class="card-actions flex justify-between align-center my-[10px]">
                                <h2 class="text-32 font-medium">Owner: ${item.Name}</h2>
                                <h2 class="text-32 font-medium">Number: ${item.Number}</h2>
                            </div>
                            <div class="card-actions flex justify-between align-center my-[30px]">
                                <h1 class=" text-3xl font-bold">Rs ${item.Price}</h1>
                                <button class="btn btn-primary">MORE INFO</button>
                            </div>
                        </div>
                    </div>
            `;
    });
};
readDataFromFirestore();
