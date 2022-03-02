import "./NotiBox.css"

const NotiBox=(props)=>{

    let arrow = String.fromCodePoint(0x21e8);
    return (
        <div className="noti-container">
            <p style={{"font-weight": "bold"}}>{props.noti.notiContent} @{props.noti.dateTime}</p>
            <div>{"link "+arrow} <a href={props.noti.url}>{props.noti.url}</a></div>
        </div>
    );
}

export default NotiBox;