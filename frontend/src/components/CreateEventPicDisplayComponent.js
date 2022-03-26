import "./CreateEventPicDisplayComponent.css"

// var img_path = "https://preview.redd.it/xkb7pye6wtv41.jpg?auto=webp&s=bae096296652344a7c6aa2abeeac328964d5ea06"

const CreateEventPicDisplayComponent=(props)=>{

    return (
        <div id="display_img" style={{ backgroundImage: `url(${props.img_path[props.img_ptr]})`}}>
            {/* <h3>Display {img_path} sadsda</h3> */}
        </div>
    );
}

export default CreateEventPicDisplayComponent;