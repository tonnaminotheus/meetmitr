import "./InfoFormComponent.css"

const InfoFormComponent=(props)=>{
    
    const getTodayDate=()=>{
        let today = new Date();
        let dd = today.getDate();
        if (dd < 10) dd = "0"+dd;

        let mm = today.getMonth()+1; //jan is 0
        if (mm < 10) mm = "0"+mm;

        let yyyy = today.getFullYear();

        return yyyy+'-'+mm+'-'+dd;
    }

    return (
        <div className="info-form-box">

            {/* wait for api */}
            <form style={{margin: "5px"}} id="create-event-info-form" method="POST" action="    ">
                
                {/* Eventname */}
                <div>
                    <label htmlFor="event-name-form">Event Name :</label>
                    <input type={"text"} id="event-name-form"/>

                </div>

                {/* max_atten */}
                <div className="info-form-box">
                    <label htmlFor="max-atten">Max Attendance :</label>
                    <input type="number" min={1} id={"max-atten"}/><span>participants</span>
                </div>
                
                <div className="info-form-box" id="radio-eventtype-container">
                    <label htmlFor="radio-eventtype-container">Event Type : </label>
                    <label htmlFor="Online-radio">Online</label>
                    {/* name is used to let the radio know it is the same category */}
                    <input type={"radio"} id="Online-radio" name="event-type" className="radio-eventtype"/>
                    <label htmlFor="On-site-radio">On-site</label>
                    <input type={"radio"} id="On-site-radio" name="event-type" className="radio-eventtype"/>
                </div>

                {/* date start - end */}
                <div className="info-form-box">
                    <label htmlFor="date-start">Date Start :</label>
                    <input type={"date"} id={"date-start"} min={getTodayDate()}></input>

                    <label htmlFor="date-end">Date End :</label>
                    <input type={"date"} id={"date-end"} min={getTodayDate()}></input>
                </div>

                {/* time start end*/}
                <div className="info-form-box">
                    <label htmlFor="time-start">Time Start :</label>
                    <input type={"time"} id={"time-start"}/>
                    <label htmlFor="time-end">Time End :</label>
                    <input type={"time"} id={"time-end"}/>
                </div>

                {/* category : api*/}

                {/* <div>

                </div> */}

                {/* location */}
                <div className="info-form-box">
                    <label htmlFor="location-input" style={{display: "block"}}>Location :</label>
                    <textarea id="location-input" className="location-input" rows={5} placeholder="Please Enter Location of this Event" htmlFor="create-event-info-form" onChange={(event)=>{
                        console.log(event.target.value)
                    }}></textarea>
                </div>


                {/* about */}
                <div className="info-form-box">
                    <label htmlFor="about-input" style={{display: "block"}}>About :</label>
                    <textarea id="about-input" className="about-input" rows={5} placeholder="Please Enter More Info about this Event" form="create-event-info-form"></textarea>
                </div>

                {/* btn */}

                <div className="info-form-box">
                    <button type="submit" className="btn" style={{padding: "5px", margin: "10px", float: "right"}}>
                        <span>Create Event</span>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default InfoFormComponent;