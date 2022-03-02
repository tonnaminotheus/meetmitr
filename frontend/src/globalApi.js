const url = "http://18.233.226.58:8080";
const globalApi = {
  register: `${url}/api/v1/register`,
  login: `${url}/api/v1/login`,
  activate: `${url}/api/v1/activate/`, //+:activStr
  joinEvent: `${url}/api/v1/event/join/`, //+:eventId v2022.01 (Auth)
  unJoinEvent: `${url}/api/v1/event/unjoin/`, //+:eventId v2022.01 (Auth)
  tagsEvent: `${url}/api/v1/event/tags/`,
  updateEvent: `${url}/api/v1/event/update/`, //+:eventId v2022.01 (Auth)
  eventDescription: `${url}/api/v1/event/descriptions/`, //+:eventId v2022.01
  createEvent: `${url}/api/v1/event/create`, //v2022.01
  userData: `${url}/api/v1/user/`, //+:userId
  upload: `${url}/api/v1/upload`,
  rate: `${url}/api/v1/rate/`,
  recommendFeed: `${url}/api/v1/home/`, //+:numPage v2022.01
  postQuiz: `${url}/api/v1/quiz`,
  chatPartner: `${url}/api/v1/chat/partners/`,
  getAllNoti: `${url}/api/v1/noti/getAll`
};

export default globalApi;
