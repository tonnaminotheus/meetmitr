import "./InfoFormComponent.css"
import "../components/css_extensions/form_control.css"
import { useEffect, useState } from "react";

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import globalApi from "../globalApi";
import globalVar from "../cookie.js";
import { useNavigate } from "react-router-dom";
import Multiselect from 'multiselect-react-dropdown';
import Cookies from "universal-cookie";

//location.replace("/view/drawing.html");

var axios = require('axios').default;


const provinces = ['Chiang Mai', 'Chiang Rai', 'Lampang', 'Lamphun', 'Mae Hong Son', 'Nan', 'Pahayao', 'Phrae', 'Uttaradit', 'Amnat Charoen', 'Bueng Kan', 'Buriram', 'Chaiyaphum', 'Kalasin', 'Khon Kaen', 'Loei', 'Maha Sarakham', 'Mukdahan', 'Nakhon Phanom', 'Nakhon Ratchasima', 'Nong Bua Lamphu', 'Nong Khai', 'Roi EtSakon Nakhon', 'Sakon Nakhon', 'Sisaket', 'Surin', 'Ubon Ratchathani', 'Udon Thani', 'Yasothon', 'Kanchanaburi', 'Phetchaburi', 'Prachuap Khiri Khan', 'Ratchaburi', 'Tak', 'Ang Thong', 'ChaiNat', 'Kamphaeng Phet', 'Lopburi', 'Nakhon Nayok', 'Nakhon Pathom', 'Nakhon Sawan', 'Nonthaburi', 'Pathum Thani', 'Phetchabun', 'Phichit', 'Phitsanulok', 'Phra Nakhon Si Ayutthaya', 'Samut Prakan', 'Samut Sakhon', 'Samut Songkhram', 'Saraburi', 'Sing Buri', 'Sukhothai', 'Suphan Buri', 'Uthai Thani', 'Chachoengsao', 'Chanthaburi', 'Chonburi', 'Prachinburi /Rayong', 'Sa Kaeo', 'Trat', 'Chumphon', 'Krabi', 'Nakhon Si Thammarat', 'Narathiwat', 'Pattani', 'Phang Nga', 'Phatthalung', 'Phuket', 'Ranong', 'Satun', 'Songkhla', 'Surat Thani', 'Trang', 'Yala'].sort()
const defaultOption = "Bangkok";

const InfoFormComponent=(props)=>{

    const [tags, setTags] = useState([])
    
    const getEventId=()=>{
        if (props.eventID == undefined) {
            return ""
        }
        else return props.eventID
    }
    let accessToken = globalVar.accessToken
    console.log("accessToken "+globalVar.accessToken)
    console.log(globalVar)

    //test cookie
    const cookies = new Cookies();
    console.log("in feed")
    console.log(cookies.get("cookie"))
    let user

    let title = "Edit Event"
    if (props.eventID == undefined) title = "Create Event"

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
        "price" : 0,
        "tags" : []
    });

    const getTagsIdx=()=>{
        let res = {}
        for (let i=0;i<tags.length;i++) {
            res[tags[i]] = i+1
        }
        return res
    }
    
    const mapTagsToIDs=(arr)=>{
        let res = []
        let idMap = getTagsIdx()
        console.log(idMap)
        for (let i=0; i<arr.length;i++) {
            res.push(idMap[arr[i]])
        }
        console.log(res)
        return res.sort(function(a, b){
            //lower
            return a-b
        })
    }

    const getRadio=()=>{
        let x = document.getElementById("Online-radio");
        let y = document.getElementById("On-site-radio");
        if (x.checked && !y.checked) {
            console.log("onsite!!")
            return true
        }
        else return false;
    }

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

    const onBtnClicked=(event)=>{
        if (props.eventID == undefined) {
            requestCreateEvent(event)
        }
        else {
            requestUpdateEvent(event) 
        }
    }

    let navigate = useNavigate();
    const toFeed = () => {
        navigate("/feed");
    };

    const requestCreateEvent=(event)=>{

        //****might error if some fields is missing

        event.preventDefault()
        
        const new_data = {
            "name": document.getElementById("event-name-form").value,
            "description" : document.getElementById("about-input").value,
            "address" : document.getElementById("address-input").value,
            "province" : data.province,
            "startTime" : document.getElementById("event-date-start").value +" "+ document.getElementById("event-time-start").value,
            "endTime" : document.getElementById("event-date-end").value + " "+ document.getElementById("event-time-end").value,
            // "onSite" : document.getElementById("event-date-end").value  document.getElementById("event-time-end").value,
            "onSite" : getRadio(),
            "maxParticipant" : parseInt(document.getElementById("max-atten").value),
            "price" : parseInt(document.getElementById("event-price").value),

            //tags to tagsID
            "tags" : mapTagsToIDs(data["tags"])

        }

        axios({
            method: 'post',
            url: globalApi.createEvent,
            headers: {
                "Authorization" : "Bearer "+accessToken,
            }, 
            data: new_data
        })
        .then(function (response) {
            console.log(response);
            //redirect
            toFeed()
            
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
        
        const new_data = {
            "name": document.getElementById("event-name-form").value,
            "description" : document.getElementById("about-input").value,
            "address" : document.getElementById("address-input").value,
            "province" : data.province,
            "startTime" : document.getElementById("event-date-start").value +" "+ document.getElementById("event-time-start").value,
            "endTime" : document.getElementById("event-date-end").value + " "+ document.getElementById("event-time-end").value,
            // "onSite" : document.getElementById("event-date-end").value  document.getElementById("event-time-end").value,
            "onSite" : getRadio(),
            "maxParticipant" : parseInt(document.getElementById("max-atten").value),
            "price" : parseInt(document.getElementById("event-price").value),
            //tags to tagsID
            "tags" : mapTagsToIDs(data["tags"])
        }
        console.log(new_data)
        axios({
            method: 'PUT',
            url: globalApi.updateEvent+getEventId(),
            headers: {
                "Authorization" : "Bearer "+globalVar.accessToken,
            }, 
            data: new_data
        })
        .then(function (response) {
            console.log(response);
            //redirect
            toFeed()
            
        })
        .catch(function (error) {
            console.log("error!!")
            console.log(error.response);

        })
        .then(function () {
            // always executed
            
        });
    }

    useEffect(()=>{
        axios({
            method: 'get',
            url: globalApi.eventDescription + getEventId(),
            headers: {
                "Authorization" : "Bearer "+accessToken,
            },
            timeout: 8000
        })
        .then((res)=>{
            if (res.status == 200) {
                res.data["startDate"] = res.data["startTime"].split(" ")[0]
                res.data["endDate"] = res.data["startTime"].split(" ")[0]
                res.data["startTime"] = res.data["startTime"].split(" ")[1].slice(0,5)
                res.data["endTime"] = res.data["endTime"].split(" ")[1].slice(0,5)
                setData(res.data)
                console.log(res.data)
            }
        })
        .catch(error => {
            console.log("error!!")
            console.log(error)
        })
        
    },[]);

    useEffect(()=>{
        //get all tag must be outside
        axios({
            method: 'get',
            url: globalApi.tagsEvent,
            headers: {
                "Authorization" : "Bearer "+accessToken,
            },
            timeout: 8000
        })
        .then((tag_res)=>{
            if (tag_res.status == 200) {
                setTags(tag_res.data["tagList"])
                console.log(tag_res.data["tagList"])
            }
        })
        .catch(error2 => {
            console.log("error2!!")
            console.log(error2)
        })
    },[]);


    const setParticularField=(value, field_name)=>{
        let new_data = {...data} //beware copying onj
        new_data[field_name] = value
        console.log(new_data)
        setData(new_data)
    }
    // console.log(props.eventID)
    return (
        <div className="info-form-box">
            <div className="info-form-box">
                <h1>{title} {data.name}</h1>
            </div>
            {/* wait for api */}
            <form style={{margin: "5px"}} id="create-event-info-form">
                
                {/* Eventname */}
                <div className="info-form-box">
                    <label htmlFor="event-name-form">Event Name :</label>
                    <input type={"text"} className={"edit-event-input"} id="event-name-form" value={data.name} required onChange={(event)=>{
                        console.log(event.target.value)
                        setParticularField(event.target.value, "name")
                    }}/>
                </div>

                {/* max_atten */}
                <div className="info-form-box">
                    <label htmlFor="max-atten">Max Attendance :</label>
                    <input type="number" className={"edit-event-input"} min={1} id={"max-atten"} value={data.maxParticipant} required onChange={(event)=>{
                        console.log(event.target.value)
                        setParticularField(event.target.value, "maxParticipant")
                    }}/><span>participants</span>
                </div>

                {/* price */}
                <div className="info-form-box">
                    <label htmlFor="event-price">Price :</label>
                    <input type="number" className={"edit-event-input"} min={0} id={"event-price"} value={data.price} required onChange={(event)=>{
                        console.log(event.target.value)
                        setParticularField(event.target.value, "price")
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
                    <label htmlFor="event-date-start">Date Start : </label>
                    <input type={"date"} id={"event-date-start"} className={"date-time-editevent-input"} min={getTodayDate()} value={data.startDate} onChange={(event)=>{
                        console.log(event.target.value)
                        setParticularField(event.target.value, "startDate")
                    }}></input>

                    <label htmlFor="event-date-end">Date End :</label>
                    <input type={"date"} id={"event-date-end"} className={"date-time-editevent-input"} min={getTodayDate()} value={data.endDate} onChange={(event)=>{
                        console.log(event.target.value)
                        setParticularField(event.target.value, "endDate")
                        
                    }}></input>
                </div>

                {/* time start end*/}
                <div className="info-form-box">
                    <label htmlFor="event-time-start">Time Start :</label>
                    <input type={"time"} id={"event-time-start"} className={"date-time-editevent-input"} value={data.startTime} onChange={(event)=>{
                        console.log(event.target.value)
                        setParticularField(event.target.value, "startTime")
                    }}/>
                    <label htmlFor="event-time-end">Time End :</label>
                    <input type={"time"} id={"event-time-end"} className={"date-time-editevent-input"} value={data.endTime} onChange={(event)=>{
                        console.log(event.target.value)
                        setParticularField(event.target.value, "endTime")
                    }}/>
                </div>

                {/* category : api*/}

                {/* <div>

                </div> */}

                {/* address */}
                <div className="info-form-box">
                    <label htmlFor="address-input" style={{display: "block"}}>Address :</label>
                    <textarea id="address-input" className="text-area" rows={2} placeholder="Please Enter Address of this Event" htmlFor="create-event-info-form" value={data.address} onChange={(event)=>{
                        console.log(event.target.value)
                        setParticularField(event.target.value, "address")
                    }}></textarea>
                </div>

                {/* province */}
                <div className="info-form-box">
                    <label htmlFor="event-province">Province :</label>
                    {/* <input type={"text"} id="event-province"value={data.province}onChange={(event)=>{
                        console.log(event.target.value)
                        setData({province: event.target.value})
                    }}/> */}
                    <Dropdown className="edit-event-dropdown" id="event-province" options={provinces} value={data.province} placeholder="Select an option" onChange={(event)=>{
                        console.log(event)
                        // console.log(provinces)
                        // setData({province: event.value})
                        setParticularField(event.value, "province")
                    }}/>
                </div>

                {/* tags */}
                <div className="info-form-box">
                    <label htmlFor="event-tag">Tag :</label>
                    {/* <Dropdown className="edit-event-dropdown" id="event-tag" options={tags} value={data.tags} placeholder="Select an option" onChange={(event)=>{
                        console.log(event.data)
                        // console.log(provinces)
                        // setData({province: event.value})
                        setParticularField(event.value, "tags")
                    }}/> */}
                    {/* <Multiselect
                        options={tags}
                        value={data.tags}
                        placeholder="Select an option"
                    /> */}
                    <Multiselect id="tags-slct"
                        options={tags} // Options to display in the dropdown
                        isObject={false}
                        showArrow={true}
                        showCheckbox={true}
                        placeholder={"Select event's categories"}
                        closeOnSelect={false}
                        selectedValues={data.tags}
                        onSelect={(selectedList, selectedItem)=>{
                            console.log(selectedList)
                            console.log(selectedItem)
                            console.log(document.getElementById("tags-slct"))
                            setParticularField(selectedList, "tags")
                            console.log(mapTagsToIDs(data["tags"]))

                        }} // Function will trigger on select event
                        onRemove={(selectedList, selectedItem)=>{
                            console.log(selectedList)
                            console.log(selectedItem)
                            console.log(document.getElementById("tags-slct"))
                            setParticularField(selectedList, "tags")
                            console.log(mapTagsToIDs(data["tags"]))
                        }} // Function will trigger on remove event
                        displayValue="name" // Property name to display in the dropdown options
                    />
                </div>
                


                {/* about */}
                <div className="info-form-box">
                    <label htmlFor="about-input" style={{display: "block"}}>About :</label>
                    <textarea id="about-input" className="text-area" rows={2} placeholder="Please Enter More Info about this Event" value={data.description} form="create-event-info-form" onChange={(event)=>{
                        console.log(event.target.value)
                        // setData({description: event.target.value})
                        setParticularField(event.target.value, "description")
                    }}></textarea>
                </div>

                {/* btn */}
                <div className="info-form-box">
                    <button className="custom-button create-event-btn btn btn-success" style={{padding: "5px", margin: "10px", float: "right"}} onClick={onBtnClicked} >
                        <span>{title}</span>
                    </button>
                </div>

            </form>
        </div>
    );
}

export default InfoFormComponent;