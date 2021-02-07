// Disable or enable the Modal
const buttonSearch = document.querySelector("#page-home main a");
const modal = document.querySelector("#modal");
const close = document.querySelector("#modal .header a");
const search = document.querySelector('#modal .content form a');

buttonSearch.onclick = function() {
    modal.classList.remove("hd");
};

close.onclick = function() {
    modal.classList.add("hd")
};

search.onclick = function() {
    document.querySelector('#modal .content form').submit();
};