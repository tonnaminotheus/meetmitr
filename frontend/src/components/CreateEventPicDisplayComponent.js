import "./CreateEventPicDisplayComponent.css"

var img_path = "https://preview.redd.it/xkb7pye6wtv41.jpg?auto=webp&s=bae096296652344a7c6aa2abeeac328964d5ea06"

const CreateEventPicDisplayComponent=(props)=>{
    // img_path = props.img_path
    // var img_path = "C:\\\\Users\\phet6\\Downloads\\COOP_Program_1.jpg"
    var img_path = "https://preview.redd.it/xkb7pye6wtv41.jpg?auto=webp&s=bae096296652344a7c6aa2abeeac328964d5ea06"

    return (
        <div id="display_img" style={{ backgroundImage: `url(${img_path})`}}>
            {/* <h3>Display {img_path} sadsda</h3> */}
        </div>
    );
}

// img_path.addEventListener("change", function(){
//     const reader = new FileReader();
//     reader.addEventListener("load", ()=>{
//         document.querySelector("#display_img").style.backgroundImage = `url(${img_path})`
//     })
//     reader.readAsDataURL(this.file[0])
// })

export default CreateEventPicDisplayComponent;