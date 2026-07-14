import eventsRepository from "./events.repository.js";
import uploadFile from "../../utils/uploadFile.js";


class EventsService {


/* ===========================
   MASTER EVENTS
=========================== */


async createEvent(data, file){

  if(file){
    const uploaded = await uploadFile(file.buffer, "events/master");
    data.media = uploaded.url;
  }

  return await eventsRepository.createEvent(data);
}


async getAllEvents(filter){
return await eventsRepository.getAllEvents(filter);
}


async getEventById(id){

const event = await eventsRepository.getEventById(id);

if(!event){
throw new Error("Event not found");
}

return event;
}


async updateEvent(id, data, file){

const event = await eventsRepository.getEventById(id);

if(!event){
throw new Error("Event not found");
}

if(file){
  const uploaded = await uploadFile(file.buffer, "events/master");
  data.media = uploaded.url;
}

return await eventsRepository.updateEvent(id,data);
}


async deleteEvent(id){

const event = await eventsRepository.getEventById(id);

if(!event){
throw new Error("Event not found");
}

return await eventsRepository.deleteEvent(id);
}




/* ===========================
   WORKSHOPS
=========================== */


async createWorkshop(data){
return await eventsRepository.createWorkshop(data);
}


async getWorkshops(filter){
return await eventsRepository.getWorkshops(filter);
}


async getWorkshopById(id){

const workshop =
await eventsRepository.getWorkshopById(id);

if(!workshop){
throw new Error("Workshop not found");
}

return workshop;
}


async updateWorkshop(id,data){

const workshop =
await eventsRepository.getWorkshopById(id);

if(!workshop){
throw new Error("Workshop not found");
}

return await eventsRepository.updateWorkshop(id,data);
}


async deleteWorkshop(id){

const workshop =
await eventsRepository.getWorkshopById(id);

if(!workshop){
throw new Error("Workshop not found");
}

return await eventsRepository.deleteWorkshop(id);
}




/* ===========================
   CONFERENCES
=========================== */


async createConference(data){
return await eventsRepository.createConference(data);
}


async getConferences(filter){
return await eventsRepository.getConferences(filter);
}


async getConferenceById(id){

const conference =
await eventsRepository.getConferenceById(id);

if(!conference){
throw new Error("Conference not found");
}

return conference;
}


async updateConference(id,data){

const conference =
await eventsRepository.getConferenceById(id);

if(!conference){
throw new Error("Conference not found");
}

return await eventsRepository.updateConference(id,data);
}


async deleteConference(id){

const conference =
await eventsRepository.getConferenceById(id);

if(!conference){
throw new Error("Conference not found");
}

return await eventsRepository.deleteConference(id);
}




/* ===========================
   BOOKING REQUESTS
=========================== */


async createBookingRequest(data){
return await eventsRepository.createBookingRequest(data);
}


async getBookingRequests(filter){
return await eventsRepository.getBookingRequests(filter);
}


async getBookingRequestById(id){

const request =
await eventsRepository.getBookingRequestById(id);

if(!request){
throw new Error("Booking request not found");
}

return request;
}


async updateBookingRequest(id,data){

const request =
await eventsRepository.getBookingRequestById(id);

if(!request){
throw new Error("Booking request not found");
}

return await eventsRepository.updateBookingRequest(id,data);
}


async deleteBookingRequest(id){

const request =
await eventsRepository.getBookingRequestById(id);

if(!request){
throw new Error("Booking request not found");
}

return await eventsRepository.deleteBookingRequest(id);
}




/* ===========================
   EVENTS PAGE BUILDER
=========================== */


async getPageSettings(){

let page =
await eventsRepository.getPageSettings();


if(!page){

page =
await eventsRepository.updatePageSettings({});

}

return page;
}



async updatePageSettings(data, file){

if(file){
  const uploaded = await uploadFile(file.buffer, "events/page");
  // Map uploaded file into correct nested field
  // The page builder has videoHighlights.thumbnail and mediaArchive item url
  // For a single file upload on /page-settings, map to heroImage by convention
  // Since the route uses upload.single("heroImage"), map accordingly
  if(!data.heroSettings){
    data.heroSettings = {};
  }
  data.heroSettings.heroImage = uploaded.url;
}

return await eventsRepository.updatePageSettings(data);

}

// Hero Settings
async updateHeroSettings(data) {
  return await eventsRepository.updateHeroSettings(data);
}

// Engagement Types
async addEngagementType(data) {
  return await eventsRepository.addEngagementType(data);
}

async updateEngagementType(id, data) {
  const item = await eventsRepository.updateEngagementType(id, data);
  if (!item) throw new Error("Engagement Type not found");
  return item;
}

async deleteEngagementType(id) {
  const page = await eventsRepository.deleteEngagementType(id);
  if (!page) throw new Error("Engagement Type not found");
  return page;
}

// Media Archive
async addMediaArchive(data, file) {
  if (file) {
    const uploaded = await uploadFile(file.buffer, "events/media-archive");
    data.url = uploaded.url;
  }
  return await eventsRepository.addMediaArchive(data);
}

async updateMediaArchive(id, data, file) {
  if (file) {
    const uploaded = await uploadFile(file.buffer, "events/media-archive");
    data.url = uploaded.url;
  }
  const item = await eventsRepository.updateMediaArchive(id, data);
  if (!item) throw new Error("Media Archive item not found");
  return item;
}

async deleteMediaArchive(id) {
  const page = await eventsRepository.deleteMediaArchive(id);
  if (!page) throw new Error("Media Archive item not found");
  return page;
}

// Video Highlights
async updateVideoHighlights(data, file) {
  if (file) {
    const uploaded = await uploadFile(file.buffer, "events/video-highlights");
    data.thumbnail = uploaded.url;
  }
  return await eventsRepository.updateVideoHighlights(data);
}

// Booking CTA
async updateBookingCTA(data) {
  return await eventsRepository.updateBookingCTA(data);
}

}


export default new EventsService();