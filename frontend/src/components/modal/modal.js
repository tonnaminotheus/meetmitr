import "./modal.css"

const JoinEventFilterModal=()=>{
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
    <div className="modal">
        <form type="POST">
            <div className="info-form-box">
                <h3>Date</h3>
                <label htmlFor="date-start">Date Start :</label>
                <input type={"date"} id={"filter-date-start"} min={getTodayDate()}></input>

                <label htmlFor="date-end">Date End :</label>
                <input type={"date"} id={"filter-date-end"} min={getTodayDate()}></input>
            </div>

            <div className="info-form-box">
                <h3>Time</h3>
                <label htmlFor="filter-time-start">Time Start :</label>
                <input type={"time"} id={"filter-time-start"}/>
                <label htmlFor="filter-time-end">Time End :</label>
                <input type={"time"} id={"filter-time-end"}/>
            </div>

            {/* category : wait for api */}
            <div >
                <h3>Category</h3>
            </div>
            <div className="info-form-box" id="checkbox-eventtype-container">
                <label htmlFor="checkbox-eventtype-container">Event Type : </label>
                <label htmlFor="Online-checkbox">Online</label>
                <input type={"checkbox"} id="Online-checkbox" name="event-type" className="checkbox-eventtype"/>
                <label htmlFor="On-site-checkbox">On-site</label>
                <input type={"checkbox"} id="On-site-checkbox" name="event-type" className="checkbox-eventtype"/>
            </div>
            <div className="info-form-box">
                <button type="submit" className="btn">
                    <span>Create Event</span>
                </button>
            </div>
        </form>
    </div>
    );    
}


export default JoinEventFilterModal;