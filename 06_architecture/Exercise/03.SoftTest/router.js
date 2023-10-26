

export function initialize(links){
    const main = document.getElementById("mainView");
    document.querySelector("nav").addEventListener("click", onNavigate);
    
    const context = {
        showSection,
        goTo,
        updateNavigate
    }
    return context 

    function showSection(section){
        main.replaceChildren(section)
    }

    function onNavigate(e){
        e.preventDefault();
        let target = e.target
        if (target.tagName == "IMG"){
            target = target.parentElement
        }
        if (target.tagName === "A") {
            const url = new URL(target.href);
            goTo(url.pathname)
        }
    }

    function goTo(name, ...params){
        const handler = links[name];
        if (typeof(handler) === "function") {
            handler(context, ...params);
        }
    }

    function updateNavigate(){
        const user = JSON.parse(sessionStorage.getItem("user"))
        if (user) {
            document.querySelectorAll(".user").forEach(e => e.style.display = "block")
            document.querySelectorAll(".guest").forEach(e => e.style.display = "none")
        } else {
            document.querySelectorAll(".user").forEach(e => e.style.display = "none")
            document.querySelectorAll(".guest").forEach(e => e.style.display = "block")
        }
    }
}