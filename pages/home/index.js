function openModal(button, user, post) {

    button.addEventListener("click", function () {
        const modal = document.querySelector(".container-modal");
        modal.style.display = "flex";
        modal.innerHTML = "";
        modal.append(createModal(user, post));
    });
    return button;
}

function createUser(user, isRecommended) {

    const perfis = document.querySelector(".perfis");

    let perfil = document.createElement("div");
    perfil.classList.add("perfil");
    perfil.classList.add("flex")

    let perfilAside = null;

    if (isRecommended) {
        perfilAside = document.createElement("div");
        perfilAside.classList.add("perfil-info-aside");
    }

    let perfilInfo = document.createElement("div");
    perfilInfo.classList.add("perfil-info");

    let h1 = document.createElement("h1")
    h1.innerText = user.user;

    let h2 = document.createElement("h2")
    h2.innerText = user.stack;
    
    let imgP = document.createElement("img");
    imgP.src = user.img;

    perfilInfo.append(h1,h2);

    if (isRecommended) {
        let buttonFollowOrFollowing = document.createElement("button");
        buttonFollowOrFollowing.classList.add("normal", "btn");
        buttonFollowOrFollowing.innerText = "Seguir";
        perfilAside.append(perfilInfo, buttonFollowOrFollowing);
        perfil.append(imgP, perfilAside);
        perfis.append(perfil);
        return perfis;
    }
    else {
        perfil.append(imgP, perfilInfo);
    }

    return perfil;
}

function createPost(post, user) {
    let li = document.createElement("li");
    li.className = "post";

    let perfil = createUser(user, false);

    let content = document.createElement("div");
    content.classList.add("post-content");

    let h1Post = document.createElement("h1")
    h1Post.classList.add("title")
    h1Post.innerText = post.title;

    let h2Post = document.createElement("h2");
    h2Post.classList.add("subtitle")
    h2Post.innerText = post.text;

    let btns = document.createElement("div");
    btns.classList.add("btns", "flex");

    let btnM = document.createElement("button")
    btnM.classList.add("abrir-modal", "btn", "br-4", "fs-14")
    btnM.innerText = "Abrir Post"

    btnM = openModal(btnM, user, post);

    let btnLike = document.createElement("div")
    btnLike.classList.add("btn-like");
    btnLike.classList.add("flex");
    
    let icon = document.createElement("ion-icon");
    icon.name = 'heart'

    let p = document.createElement("p")
    p.innerText = countLikes();

    btnLike.append(icon,p);
    btns.append(btnM, btnLike);
    content.append(h1Post,h2Post);
    li.append(perfil, content, btns);

    return li;
}

function countLikes() {
    let sum = 25;
    return sum;
}

function createModal(user, post) {
    let section = document.createElement("section")
    section.classList.add("container","modal","modal-post");

    let userModal = createUser(user, false);

    let content = document.createElement("div")
    content.classList.add("post-content");

    let title = document.createElement("h1");
    title.classList.add("title-modal")
    title.innerText = post.title;

    let text = document.createElement("h2");
    text.classList.add("subtitle", "subtitle-modal")
    text.innerText = post.text;

    let btn = document.createElement("p");
    btn.innerText = "X";
    btn.className = "btn-modal"

    btn.addEventListener("click", () => {
        const modal = document.querySelector(".container-modal");
        modal.style.display = "none";
    })

    content.append(title,text);
    section.append(userModal, content, btn);

    return section;
}


function createPosts() {
    let ul = document.querySelector(".posts");
    
    posts.forEach(post => {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === post.user) {
                ul.append(createPost(post, users[i]));
                break;
            }
        }
    })
}

function createRecommendedFollowers() {
    let perfis = document.getElementsByTagName("aside");

    users.forEach(user => {
        sugestUsers.forEach(sugestUser => {
            if (sugestUser == user.id) {
                let userRecommended = createUser(user, true);
                perfis[0].append(userRecommended);
                return;
            }
        });
    });
}


createPosts();
createRecommendedFollowers();