const url = "http://localhost:8080";
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
  deleteEvent: `${url}/api/v1/event/`, //:eventId,
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
