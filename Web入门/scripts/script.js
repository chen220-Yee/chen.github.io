
document.addEventListener("DOMContentLoaded", function() {
    let myimage = document.querySelector("img");
    myimage.onclick = function () {
        let mysrc=myimage.getAttribute("src");
        if(mysrc === "images/img.jpg") {
            myimage.setAttribute("src","images/background.jpg")
    }
        else{
        myimage.setAttribute("src","images/img.jpg")
    }
}
});

document.addEventListener("DOMContentLoaded", function() {
    let mybutton = document.querySelector("button");
    mybutton.onclick = function() {
        let mytext = prompt("请输入您的留言：");
        let myarea = document.querySelector("textarea");
        myarea.textContent = mytext;
    };
});
