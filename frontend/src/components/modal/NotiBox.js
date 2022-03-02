import "./NotiBox.css"

const NotiBox=(props)=>{

    return (
        <div className="noti-container">
            <p>{props.noti.notiContent} @{props.noti.dateTime}</p>
            <div>{"link =>"} <a href={props.noti.url}>{props.noti.url}</a></div>
        </div>
    );
}

export default NotiBox;