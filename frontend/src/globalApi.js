<<<<<<< HEAD
const url = "http://3.86.12.64:8080";
=======
const url = "http://44.204.176.139:8080";

>>>>>>> bba96516ae36597de7395850ad08cf7d1663a89a
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
  editProfile: `${url}/api/v1/user`, //PUT
  upload: `${url}/api/v1/upload`,
  rate: `${url}/api/v1/rate/`,
  recommendFeed: `${url}/api/v1/home/`, //+:numPage v2022.01
  chatPartner: `${url}/api/v1/chat/partners`,
  chatHistory: `${url}/api/v1/chat/history/dm/`, // /DMId
  chatSocket: `ws://${url.slice(7)}/api/v1/chat/room/`, //+ token
  postQuiz: `${url}/api/v1/quiz`,
  getAllNoti: `${url}/api/v1/noti/getAll`,
  getFilteredEvent: `${url}/api/v1/home/avt/`, //+ numPage
  getNotiCount: `${url}/api/v1/noti/getCount`,
  chatToken: `${url}/api/v1/chat/token/`, //+ chatType + userId
  chatPartner: `${url}/api/v1/chat/partners/`,
  getAllNoti: `${url}/api/v1/noti/getAll`,
  isAdmin: `${url}/api/v1/isAdmin`,
  veriRequest: `${url}/api/v1/user/veriRequest`,
  getRequests: `${url}/api/v1/veriRequests`,
  verifyUser: `${url}/api/v1/verify`
};

export default globalApi;
