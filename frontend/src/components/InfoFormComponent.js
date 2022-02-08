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
            <form style={{margin: "5px"}} id="create-event-info-form" method="POST" action="/loction">
                {/* Eventname */}
               

                {/* max_atten */}
                <div>
                    <label htmlFor="max-atten">Max Attendance :</label>
                    <input type="number" min={1} id={"max-atten"}/><span>People</span>
                </div>

                {/* date start - end */}
                <div>
                    <label htmlFor="date-start">Date Start :</label>
                    <input type={"date"} id={"date-start"} min={getTodayDate()}></input>

                    <label htmlFor="date-end">Date End :</label>
                    <input type={"date"} id={"date-end"} min={getTodayDate()}></input>
                </div>

                {/* time start end*/}
                <div>
                    <label htmlFor="time-start">Time Start :</label>
                    <input type={"time"} id={"time-start"}/>
                    <label htmlFor="time-end">Time End :</label>
                    <input type={"time"} id={"time-end"}/>
                </div>

                {/* category : api*/}

                {/* <div>

                </div> */}

                {/* location */}
                <div>
                    <label htmlFor="location-input" style={{display: "block"}}>Location :</label>
                    <textarea id="location-input" className="location-input" rows={5} placeholder="Please Enter Location of this Event" htmlFor="create-event-info-form"></textarea>
                </div>


                {/* about */}
                <div>
                    <label htmlFor="about-input" style={{display: "block"}}>About :</label>
                    <textarea id="about-input" className="about-input" rows={5} placeholder="Please Enter More Info about this Event" form="create-event-info-form"></textarea>
                </div>

                {/* btn */}

                <div>
                    <button type="submit" style={{padding: "5px", margin: "10px", float: "right"}}>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default InfoFormComponent;