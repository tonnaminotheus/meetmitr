const url = "http://44.201.142.28:8080";
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
  chatPartner: `${url}/api/v1/chat/partners`,
  chatHistory: `${url}/api/v1/chat/history/dm/`, // /DMId
  chatSocket: `ws://${url.slice(6)}/api/v1/chat/room/`, //+ chatType/ + userId
  postQuiz: `${url}/api/v1/quiz`,
  getAllNoti: `${url}/api/v1/noti/getAll`,
  getFilteredEvent: `${url}/api/v1/home/avt/`, //+ numPage
};

export default globalApi;
