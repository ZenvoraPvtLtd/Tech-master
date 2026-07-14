import {
MasterEvent,
Workshop,
Conference,
BookingRequest,
EventsPage
} from "./events.model.js";


class EventsRepository {


/* ===========================
   MASTER EVENTS
=========================== */


async createEvent(data){
return await MasterEvent.create(data);
}


async getAllEvents(filter={}){
return await MasterEvent.find({
isDeleted:false,
...filter
})
.sort({createdAt:-1});
}


async getEventById(id){
return await MasterEvent.findOne({
_id:id,
isDeleted:false
});
}


async updateEvent(id,data){
return await MasterEvent.findByIdAndUpdate(
id,
data,
{
new:true,
runValidators:true
}
);
}


async deleteEvent(id){
return await MasterEvent.findByIdAndUpdate(
id,
{
isDeleted:true
},
{
new:true
}
);
}



/* ===========================
   WORKSHOPS
=========================== */


async createWorkshop(data){
return await Workshop.create(data);
}


async getWorkshops(filter={}){
return await Workshop.find({
isDeleted:false,
...filter
})
.sort({createdAt:-1});
}


async getWorkshopById(id){
return await Workshop.findOne({
_id:id,
isDeleted:false
});
}


async updateWorkshop(id,data){
return await Workshop.findByIdAndUpdate(
id,
data,
{
new:true,
runValidators:true
}
);
}


async deleteWorkshop(id){
return await Workshop.findByIdAndUpdate(
id,
{
isDeleted:true
},
{
new:true
}
);
}



/* ===========================
   CONFERENCES
=========================== */


async createConference(data){
return await Conference.create(data);
}


async getConferences(filter={}){
return await Conference.find({
isDeleted:false,
...filter
})
.sort({createdAt:-1});
}


async getConferenceById(id){
return await Conference.findOne({
_id:id,
isDeleted:false
});
}


async updateConference(id,data){
return await Conference.findByIdAndUpdate(
id,
data,
{
new:true,
runValidators:true
}
);
}


async deleteConference(id){
return await Conference.findByIdAndUpdate(
id,
{
isDeleted:true
},
{
new:true
}
);
}



/* ===========================
   BOOKING REQUESTS
=========================== */


async createBookingRequest(data){
return await BookingRequest.create(data);
}


async getBookingRequests(filter={}){
return await BookingRequest.find({
isDeleted:false,
...filter
})
.sort({createdAt:-1});
}


async getBookingRequestById(id){
return await BookingRequest.findOne({
_id:id,
isDeleted:false
});
}


async updateBookingRequest(id,data){
return await BookingRequest.findByIdAndUpdate(
id,
data,
{
new:true,
runValidators:true
}
);
}


async deleteBookingRequest(id){
return await BookingRequest.findByIdAndUpdate(
id,
{
isDeleted:true
},
{
new:true
}
);
}



/* ===========================
   PAGE BUILDER
=========================== */


async getPageSettings(){
return await EventsPage.findOne({});
}


async updatePageSettings(data){
return await EventsPage.findOneAndUpdate(
{},
data,
{
new:true,
upsert:true,
runValidators:true
}
);
}

// Hero Settings
async updateHeroSettings(data) {
  return await EventsPage.findOneAndUpdate(
    {},
    { $set: { heroSettings: data } },
    { new: true, upsert: true, runValidators: true }
  );
}

// Engagement Types
async addEngagementType(data) {
  let page = await EventsPage.findOne({});
  if (!page) {
    page = await EventsPage.create({ engagementTypes: [data] });
  } else {
    page.engagementTypes.push(data);
    await page.save();
  }
  return page.engagementTypes[page.engagementTypes.length - 1];
}

async updateEngagementType(id, data) {
  const page = await EventsPage.findOne({});
  if (!page) return null;
  const item = page.engagementTypes.id(id);
  if (!item) return null;
  Object.assign(item, data);
  await page.save();
  return item;
}

async deleteEngagementType(id) {
  const page = await EventsPage.findOne({});
  if (!page) return null;
  page.engagementTypes = page.engagementTypes.filter(
    item => item._id.toString() !== id
  );
  await page.save();
  return page;
}

// Media Archive
async addMediaArchive(data) {
  let page = await EventsPage.findOne({});
  if (!page) {
    page = await EventsPage.create({ mediaArchive: [data] });
  } else {
    page.mediaArchive.push(data);
    await page.save();
  }
  return page.mediaArchive[page.mediaArchive.length - 1];
}

async updateMediaArchive(id, data) {
  const page = await EventsPage.findOne({});
  if (!page) return null;
  const item = page.mediaArchive.id(id);
  if (!item) return null;
  Object.assign(item, data);
  await page.save();
  return item;
}

async deleteMediaArchive(id) {
  const page = await EventsPage.findOne({});
  if (!page) return null;
  page.mediaArchive = page.mediaArchive.filter(
    item => item._id.toString() !== id
  );
  await page.save();
  return page;
}

// Video Highlights
async updateVideoHighlights(data) {
  return await EventsPage.findOneAndUpdate(
    {},
    { $set: { videoHighlights: data } },
    { new: true, upsert: true, runValidators: true }
  );
}

// Booking CTA
async updateBookingCTA(data) {
  return await EventsPage.findOneAndUpdate(
    {},
    { $set: { bookingCTA: data } },
    { new: true, upsert: true, runValidators: true }
  );
}

}
export default new EventsRepository();