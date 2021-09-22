var list = [];

function toggleClass(id, classe) {

    if(!list.isEmpty) {
        for(i = 0; i < list.length; i++) {
            list[i].classList.remove(classe);
        }
    }

    var element = document.getElementById(id);
    element.classList.toggle(classe);
    list.push(element)

}


//  document.getElementById("toggle").addEventListener('click', function() {
//      Array.prototype.forEach.call(document.getElementsByClassName('select'), function(elementos) {
//      	elementos.classList[elementos.className.indexOf('active') === -1 ? 'add' : 'remove']('active')
//     }
// )});

    // var elemento = document.getElementById(id);
    // var classes = elemento.className.split(' ');
    // var getIndex = classes.indexOf(classe);

    // if (getIndex === -1) {
    //     classes.push(classe);
    // } else if (getIndex > -1) {
    //     classes.splice(getIndex, 1);
    // }

    // elemento.className = classes.join(' ');