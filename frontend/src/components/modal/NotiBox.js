import "./NotiBox.css"

const NotiBox=(props)=>{

    let arrow = String.fromCodePoint(0x21e8);

    return (
        <div className="noti-container">
            <div>
                <p style={{"font-weight": "bold"}}>{props.noti.notiContent}</p>
                <p>{"link "+arrow} <a className="link" href={props.noti.url} style={{"text-decoration":"none"}}>{props.noti.url}</a></p>
                <p style={{"textAlign": "right"}}>{"@"+props.noti.dateTime}</p>
            </div>
            
        </div>
    );
}

export default NotiBox;