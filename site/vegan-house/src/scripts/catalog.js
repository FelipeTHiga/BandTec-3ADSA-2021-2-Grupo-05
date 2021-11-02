var list = [];

function toggleClass(id, classe) {

if(!list.isEmpty) {
    for(var i = 0; i < list.length; i++) {
        list[i].classList.remove(classe);
    }
}

var element = document.getElementById(id);
element.classList.toggle(classe);
list.push(element);

}
