// @ts-nocheck

let template = {
    name: "",
    surname: "",
    logged: false,
    tasks: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,]
}

export const setUser = function (user) {
    Object.assign(template, user);
    localStorage.setItem("user", JSON.stringify(template));

    return true; 
}

export const getUser = function () {
    let user = JSON.parse(localStorage.getItem("user"));
    user =  Object.assign(template, user)

    if (user.name.length > 0) {
        user.logged = true;
    }

    return user
}