import "../styles/dragDropUpload.scss";
// import "../scripts/dragDropUpload";

let file;

function DragDropUpload(props) {


    const dragAndDrop = (dragAreaId) => {
        // window.addEventListener('load', (event) => {
        //selecting all required elements
        const dropArea = document.querySelector(`#${dragAreaId}`),
            dragText = dropArea.querySelector("header"),
            button = dropArea.querySelector("button"),
            input = dropArea.querySelector("input");
        //this is a global variable and we'll use it inside multiple functions
        let dropArea1 = document.querySelector("#dragId-1");
        let dropArea2 = document.querySelector("#dragId-2");
        let dropArea3 = document.querySelector("#dragId-3");

        let img1 = dropArea1.querySelector("img");
        let img2 = dropArea2.querySelector("img");
        let img3 = dropArea3.querySelector("img");


        if (button == undefined) {

            if (img1) {
                img1.onclick = () => {
                    input.click();
                }
            }

            if (img2) {

                img2.onclick = () => {
                    input.click();
                }
            }


            if (img3) {

                img3.onclick = () => {
                    input.click();
                }
            }

        }


        console.log(dropArea);


        if (button) {

            button.onclick = () => {
                input.click(); //if user click on the button then the input also clicked
            }

        }

        input.addEventListener("change", function () {

            //getting user select file and [0] this means if user select multiple files then we'll select only the first one
            file = this.files[0];
            props.setImage(input);


            dropArea.classList.add("active");
            showFile(); //calling function
        });
        //If user Drag File Over DropArea
        dropArea.addEventListener("dragover", (event) => {
            event.preventDefault(); //preventing from default behaviour
            dropArea.classList.add("active");
            dragText.textContent = "Solte para upar uma foto";
        });
        //If user leave dragged File from DropArea
        dropArea.addEventListener("dragleave", () => {
            dropArea.classList.remove("active");
            dragText.textContent = "Arraste e solte para upar uma foto";
        });
        //If user drop File on DropArea
        dropArea.addEventListener("drop", (event) => {
            event.preventDefault(); //preventing from default behaviour
            //getting user select file and [0] this means if user select multiple files then we'll select only the first one
            file = event.dataTransfer.files[0];
            props.setImage(file);
            showFile(); //calling function
        });
        function showFile() {
            let fileType = file.type; //getting selected file type
            let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
            if (validExtensions.includes(fileType)) { //if user selected file is an image file
                let fileReader = new FileReader(); //creating new FileReader object
                fileReader.onload = () => {
                    let fileURL = fileReader.result; //passing user file source in fileURL variable
                    let imgTag = `<img src="${fileURL}" alt="image"><input class="input-dd" type="file" hidden="">`; //creating an img tag and passing user selected file source inside src attribute
                    dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
                }
                fileReader.readAsDataURL(file);
            } else {
                alert("This is not an Image File!");
                dropArea.classList.remove("active");
                dragText.textContent = "Drag & Drop to Upload File";
            }
        }
        // })
    }

    return (
        <>
            <div class="drag-area" id={props.dragId} onClick={() => dragAndDrop(props.dragId)}>
                <div className="icon"><i class="fas fa-cloud-upload-alt"></i></div>
                <header className="header-dd">Arraste e solte para upar uma foto</header>
                <span class="span-dd">ou</span>
                <button class="button-dd">Busque arquivo</button>
                <input class="input-dd" type="file" hidden />
            </div>
        </>
    );
}


export { DragDropUpload }




