import "./InfoFormComponent.css"
import { useEffect, useState } from "react";

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

//location.replace("/view/drawing.html");

var axios = require('axios').default;


const provinces = ['Chiang Mai', 'Chiang Rai', 'Lampang', 'Lamphun', 'Mae Hong Son', 'Nan', 'Pahayao', 'Phrae', 'Uttaradit', 'Amnat Charoen', 'Bueng Kan', 'Buriram', 'Chaiyaphum', 'Kalasin', 'Khon Kaen', 'Loei', 'Maha Sarakham', 'Mukdahan', 'Nakhon Phanom', 'Nakhon Ratchasima', 'Nong Bua Lamphu', 'Nong Khai', 'Roi EtSakon Nakhon', 'Sakon Nakhon', 'Sisaket', 'Surin', 'Ubon Ratchathani', 'Udon Thani', 'Yasothon', 'Kanchanaburi', 'Phetchaburi', 'Prachuap Khiri Khan', 'Ratchaburi', 'Tak', 'Ang Thong', 'ChaiNat', 'Kamphaeng Phet', 'Lopburi', 'Nakhon Nayok', 'Nakhon Pathom', 'Nakhon Sawan', 'Nonthaburi', 'Pathum Thani', 'Phetchabun', 'Phichit', 'Phitsanulok', 'Phra Nakhon Si Ayutthaya', 'Samut Prakan', 'Samut Sakhon', 'Samut Songkhram', 'Saraburi', 'Sing Buri', 'Sukhothai', 'Suphan Buri', 'Uthai Thani', 'Chachoengsao', 'Chanthaburi', 'Chonburi', 'Prachinburi /Rayong', 'Sa Kaeo', 'Trat', 'Chumphon', 'Krabi', 'Nakhon Si Thammarat', 'Narathiwat', 'Pattani', 'Phang Nga', 'Phatthalung', 'Phuket', 'Ranong', 'Satun', 'Songkhla', 'Surat Thani', 'Trang', 'Yala'].sort()
const defaultOption = "Bangkok";

const InfoFormComponent=(props)=>{

    const [data, setData] = useState({
        "name": "",
        "description" : "",
        "address" : "",
        "province" : "Bangkok",
        "startDate" : "2000-01-01",
        "endDate" : "2000-01-01",
        "startTime" : "00.00",
        "endTime" : "23.59",
        "onSite" : true,
        "maxParticipant" : 1,
        "price" : 0
    });

    const getTodayDate=()=>{
        let today = new Date();
        let dd = today.getDate();
        if (dd < 10) dd = "0"+dd;

        let mm = today.getMonth()+1; //jan is 0
        if (mm < 10) mm = "0"+mm;

        let yyyy = today.getFullYear();

        return yyyy+'-'+mm+'-'+dd;
    }

    const onEditField=(event)=>{
        console.log("id "+event.target.id)
        console.log("event "+event.target.value)
        document.getElementById(event.target.id).value = event.target.value
        console.log(document.getElementById(event.target.id).value)
    }

    const requestCreateEvent=(event)=>{

        //****might error if some fields is missing

        event.preventDefault()
        
        const data = {
            "name": document.getElementById("event-name-form").value,
            "description" : document.getElementById("about-input").value,
            "address" : document.getElementById("address-input").value,
            "province" : document.getElementById("event-province").value,
            "startTime" : document.getElementById("event-date-start").value + document.getElementById("event-time-start").value,
            "endTime" : document.getElementById("event-date-end").value + document.getElementById("event-time-end").value,
            // "onSite" : document.getElementById("event-date-end").value  document.getElementById("event-time-end").value,
            "onSite" : ()=>{
                let x = document.getElementById("Online-radio");
                let y = document.getElementById("On-site-radio");
                if (x.checked && !y.checked) {
                    console.log("onsite!!")
                    return true
                }
                else return false;
            },
            "maxParticipant" : document.getElementById("max-atten").value,
            "price" : document.getElementById("event-price")
        }

        axios({
            method: 'post',
            url: 'http://3.86.116.219:8080/api/v1/event/create',
            data: data
        })
        .then(function (response) {
            console.log(response);
            //redirect
            
        })
        .catch(function (error) {
            console.log("error!!")
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    }

    const requestUpdateEvent=(event)=>{

        //****might error if some fields is missing

        event.preventDefault()
        
        const data = {
            "name": document.getElementById("event-name-form").value,
            "description" : document.getElementById("about-input").value,
            "address" : document.getElementById("address-input").value,
            "province" : document.getElementById("event-province").value,
            "startTime" : document.getElementById("event-date-start").value + document.getElementById("event-time-start").value,
            "endTime" : document.getElementById("event-date-end").value + document.getElementById("event-time-end").value,
            // "onSite" : document.getElementById("event-date-end").value  document.getElementById("event-time-end").value,
            "onSite" : ()=>{
                let x = document.getElementById("Online-radio");
                let y = document.getElementById("On-site-radio");
                if (x.checked && !y.checked) {
                    console.log("onsite!!")
                    return true
                }
                else return false;
            },
            "maxParticipant" : document.getElementById("max-atten").value,
            "price" : document.getElementById("event-price")
        }

        axios({
            method: 'PUT',
            url: 'http://3.86.116.219:8080/api/v1/event/update/',
            data: data
        })
        .then(function (response) {
            console.log(response);
            //redirect
            
        })
        .catch(function (error) {
            console.log("error!!")
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    }

    useEffect(()=>{
        axios({
            method: 'get',
            url: `http://3.86.116.219:8080/api/v1/event/descriptions/${props.eventID}`,
            timeout: 8000
        })
        .then((res)=>{
            if (res.status == 200) {
                console.log(res.data)
                res.data["startDate"] = res.data["startTime"].split(" ")[0]
                res.data["endDate"] = res.data["startTime"].split(" ")[0]
                res.data["startTime"] = res.data["startTime"].split(" ")[1].slice(0,5)
                res.data["endTime"] = res.data["endTime"].split(" ")[1].slice(0,5)
                console.log(res.data)
                setData(res.data)
            }
        })
        .catch(error => {
            console.log("error!!")
            console.log(error)
            }
        )
    },[]);
    
    console.log(props.eventID)
    return (
        <div className="info-form-box">
            <div className="info-form-box">
                <h1>Edit Event {data.name}</h1>
            </div>
            {/* wait for api */}
            <form style={{margin: "5px"}} id="create-event-info-form">
                
                {/* Eventname */}
                <div className="info-form-box">
                    <label htmlFor="event-name-form">Event Name :</label>
                    <input type={"text"} id="event-name-form" value={data.name} required onChange={(event)=>{
                        console.log(event.target.value)
                        setData({name: event.target.value})
                    }}/>
                </div>

                {/* max_atten */}
                <div className="info-form-box">
                    <label htmlFor="max-atten">Max Attendance :</label>
                    <input type="number" min={1} id={"max-atten"} value={data.maxParticipant} required onChange={(event)=>{
                        console.log(event.target.value)
                        setData({maxParticipant: event.target.value})
                    }}/><span>participants</span>
                </div>

                {/* price */}
                <div className="info-form-box">
                    <label htmlFor="event-price">Price :</label>
                    <input type="number" min={0} id={"event-price"} value={data.price} required onChange={(event)=>{
                        console.log(event.target.value)
                        setData({price: event.target.value})
                    }}/><span>coins</span>
                </div>
                
                <div className="info-form-box" id="radio-eventtype-container">
                    <label htmlFor="radio-eventtype-container">Event Type : </label>
                    <label htmlFor="Online-radio">Online</label>
                    {/* name is used to let the radio know it is the same category */}
                    <input type={"radio"} id="Online-radio" name="event-type" className="radio-eventtype" required/>
                    <label htmlFor="On-site-radio">On-site</label>
                    <input type={"radio"} id="On-site-radio" name="event-type" className="radio-eventtype"/>
                </div>

                {/* date start - end */}
                <div className="info-form-box">
                    <label htmlFor="event-date-start">Date Start :</label>
                    <input type={"date"} id={"event-date-start"} min={getTodayDate()} value={data.startDate} onChange={(event)=>{
                        console.log(event.target.value)
                        setData({dateStart: event.target.value})
                    }}></input>

                    <label htmlFor="event-date-end">Date End :</label>
                    <input type={"date"} id={"event-date-end"} min={getTodayDate()} value={data.endDate} onChange={(event)=>{
                        console.log(event.target.value)
                        setData({dateEnd: event.target.value})
                    }}></input>
                </div>

                {/* time start end*/}
                <div className="info-form-box">
                    <label htmlFor="event-time-start">Time Start :</label>
                    <input type={"time"} id={"event-time-start"} value={data.startTime} onChange={(event)=>{
                        console.log(event.target.value)
                        setData({timeEnd: event.target.value.split(" ")[1]})
                    }}/>
                    <label htmlFor="event-time-end">Time End :</label>
                    <input type={"time"} id={"event-time-end"} value={data.endTime} onChange={(event)=>{
                        console.log(event.target.value)
                        setData({timeEnd: event.target.value.split(" ")[1]})
                    }}/>
                </div>

                {/* category : api*/}

                {/* <div>

                </div> */}

                {/* address */}
                <div className="info-form-box">
                    <label htmlFor="address-input" style={{display: "block"}}>Address :</label>
                    <textarea id="address-input" className="address-input text-area" rows={5} placeholder="Please Enter Address of this Event" htmlFor="create-event-info-form" value={data.address} onChange={(event)=>{
                        console.log(event.target.value)
                        setData({address: event.target.value})
                    }}></textarea>
                </div>

                {/* province */}
                <div className="info-form-box">
                    <label htmlFor="event-province">Province :</label>
                    {/* <input type={"text"} id="event-province"value={data.province}onChange={(event)=>{
                        console.log(event.target.value)
                        setData({province: event.target.value})
                    }}/> */}
                    <Dropdown className="province-dropdown" id="event-province" options={provinces} onChange={(event)=>{
                        console.log(event)
                        // console.log(provinces)
                        // setData({province: event.target})  
                    }} value={data.province} placeholder="Select an option"/>
                </div>
                


                {/* about */}
                <div className="info-form-box">
                    <label htmlFor="about-input" style={{display: "block"}}>About :</label>
                    <textarea id="about-input" className="text-area" rows={5} placeholder="Please Enter More Info about this Event" value={data.description} form="create-event-info-form" onChange={(event)=>{
                        console.log(event.target.value)
                        setData({description: event.target.value})
                    }}></textarea>
                </div>

                {/* btn */}
                <div className="info-form-box">
                    <button className="btn create-event-btn" style={{padding: "5px", margin: "10px", float: "right"}} onClick={requestCreateEvent} >
                        <span>Create Event</span>
                    </button>
                </div>

            </form>
        </div>
    );
}

export default InfoFormComponent;