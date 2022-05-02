import "./NotiBox.css"

const NotiBox=(props)=>{

    let arrow = String.fromCodePoint(0x21e8);

    return (
        <div className="noti-container">
            <div>
                <p style={{"font-weight": "bold"}}>{props.noti.notiContent}</p>
                {props.noti.url && <div><p>{"link "+arrow} <a className="link" href={props.noti.url} style={{"textDecoration":"none"}}>{props.noti.url}</a></p></div>}
                {props.noti.dateTime && <div><p style={{"textAlign": "right"}}>{"@"+props.noti.dateTime}</p></div>}
            </div>
            
        </div>
    );
}

export default NotiBox;