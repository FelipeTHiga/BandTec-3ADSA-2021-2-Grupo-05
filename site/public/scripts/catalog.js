function toggleClass(id, classe) {
    var elemento = document.getElementById(id);
    var classes = elemento.className.split(' ');
    var getIndex = classes.indexOf(classe);

    if (getIndex === -1) {
        classes.push(classe);
        elemento.className = classes.join(' ');
    } else if (getIndex > -1) {
        classes.splice(getIndex, 1);
    }

    elemento.className = classes.join(' ');
}


//  document.getElementById("toggle").addEventListener('click', function() {
//      Array.prototype.forEach.call(document.getElementsByClassName('select'), function(elementos) {
//      	elementos.classList[elementos.className.indexOf('active') === -1 ? 'add' : 'remove']('active')
//     }
// )});