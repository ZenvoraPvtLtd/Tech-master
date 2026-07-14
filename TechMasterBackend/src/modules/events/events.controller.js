import eventsService from "./events.service.js";
import activityLogService from "../activityLog/activityLog.service.js";
import { EVENTS_MESSAGES } from "../../constants/message.js";


/* ==========================================================
   EVENTS CONTROLLER
========================================================== */

class EventsController {


  // ==========================
  // Master Events
  // ==========================

  async getAllEvents(req,res,next){
    try{

      const data = await eventsService.getAllEvents(req.query);

      return res.status(200).json({
        success:true,
        message:EVENTS_MESSAGES.EVENT_FETCHED,
        data,
      });

    }catch(error){
      next(error);
    }
  }



  async getEventById(req,res,next){
    try{

      const data = await eventsService.getEventById(req.params.id);

      return res.status(200).json({
        success:true,
        message:EVENTS_MESSAGES.EVENT_FETCHED,
        data,
      });

    }catch(error){
      next(error);
    }
  }



  async createEvent(req,res,next){
    try{

      const data = await eventsService.createEvent(req.body, req.file, req.admin);

      await activityLogService.logAction(
        req.admin.id,
        "Create Event",
        data._id,
        "Event created successfully",
        "Events"
      );

      return res.status(201).json({
        success:true,
        message:EVENTS_MESSAGES.EVENT_CREATED,
        data,
      });

    }catch(error){
      next(error);
    }
  }



  async updateEvent(req,res,next){
    try{

      const data = await eventsService.updateEvent(
        req.params.id,
        req.body,
        req.file,
        req.admin
      );

      await activityLogService.logAction(
        req.admin.id,
        "Update Event",
        data._id,
        "Event updated successfully",
        "Events"
      );

      return res.status(200).json({
        success:true,
        message:EVENTS_MESSAGES.EVENT_UPDATED,
        data,
      });

    }catch(error){
      next(error);
    }
  }



  async deleteEvent(req,res,next){
    try{

      await eventsService.deleteEvent(req.params.id, req.admin);

      await activityLogService.logAction(
        req.admin.id,
        "Delete Event",
        req.params.id,
        "Event deleted successfully",
        "Events"
      );

      return res.status(200).json({
        success:true,
        message:EVENTS_MESSAGES.EVENT_DELETED,
      });

    }catch(error){
      next(error);
    }
  }



  // ==========================
  // Workshops
  // ==========================


  async getAllWorkshops(req,res,next){
    try{

      const data = await eventsService.getWorkshops(req.query);

      return res.status(200).json({
        success:true,
        message:EVENTS_MESSAGES.WORKSHOP_FETCHED,
        data,
      });

    }catch(error){
      next(error);
    }
  }



  async getWorkshopById(req,res,next){
    try{

      const data = await eventsService.getWorkshopById(
        req.params.id
      );

      return res.status(200).json({
        success:true,
        message:EVENTS_MESSAGES.WORKSHOP_FETCHED,
        data,
      });

    }catch(error){
      next(error);
    }
  }



  async createWorkshop(req,res,next){
    try{

      const data = await eventsService.createWorkshop(
        req.body,
        req.admin
      );

      await activityLogService.logAction(
        req.admin.id,
        "Create Workshop",
        data._id,
        "Workshop created successfully",
        "Events"
      );

      return res.status(201).json({
        success:true,
        message:EVENTS_MESSAGES.WORKSHOP_CREATED,
        data,
      });

    }catch(error){
      next(error);
    }
  }



  async updateWorkshop(req,res,next){
    try{

      const data = await eventsService.updateWorkshop(
        req.params.id,
        req.body,
        req.admin
      );

      await activityLogService.logAction(
        req.admin.id,
        "Update Workshop",
        data._id,
        "Workshop updated successfully",
        "Events"
      );

      return res.status(200).json({
        success:true,
        message:EVENTS_MESSAGES.WORKSHOP_UPDATED,
        data,
      });

    }catch(error){
      next(error);
    }
  }



  async deleteWorkshop(req,res,next){
    try{

      await eventsService.deleteWorkshop(
        req.params.id,
        req.admin
      );

      await activityLogService.logAction(
        req.admin.id,
        "Delete Workshop",
        req.params.id,
        "Workshop deleted successfully",
        "Events"
      );

      return res.status(200).json({
        success:true,
        message:EVENTS_MESSAGES.WORKSHOP_DELETED,
      });

    }catch(error){
      next(error);
    }
  }




  // ==========================
  // Conferences
  // ==========================


  async getAllConferences(req,res,next){
    try{

      const data = await eventsService.getConferences(req.query);

      return res.status(200).json({
        success:true,
        message:EVENTS_MESSAGES.CONFERENCE_FETCHED,
        data,
      });

    }catch(error){
      next(error);
    }
  }



  async createConference(req,res,next){
    try{

      const data = await eventsService.createConference(
        req.body,
        req.admin
      );

      await activityLogService.logAction(
        req.admin.id,
        "Create Conference",
        data._id,
        "Conference created successfully",
        "Events"
      );

      return res.status(201).json({
        success:true,
        message:EVENTS_MESSAGES.CONFERENCE_CREATED,
        data,
      });

    }catch(error){
      next(error);
    }
  }



  async updateConference(req,res,next){
    try{

      const data = await eventsService.updateConference(
        req.params.id,
        req.body,
        req.admin
      );

      await activityLogService.logAction(
        req.admin.id,
        "Update Conference",
        data._id,
        "Conference updated successfully",
        "Events"
      );

      return res.status(200).json({
        success:true,
        message:EVENTS_MESSAGES.CONFERENCE_UPDATED,
        data,
      });

    }catch(error){
      next(error);
    }
  }



  async deleteConference(req,res,next){
    try{

      await eventsService.deleteConference(
        req.params.id,
        req.admin
      );

      await activityLogService.logAction(
        req.admin.id,
        "Delete Conference",
        req.params.id,
        "Conference deleted successfully",
        "Events"
      );

      return res.status(200).json({
        success:true,
        message:EVENTS_MESSAGES.CONFERENCE_DELETED,
      });

    }catch(error){
      next(error);
    }
  }




  // ==========================
  // Booking Requests
  // ==========================


  async getAllBookingRequests(req,res,next){
    try{

      const data =
      await eventsService.getBookingRequests(req.query);

      return res.status(200).json({
        success:true,
        message:EVENTS_MESSAGES.BOOKING_REQUEST_FETCHED,
        data,
      });

    }catch(error){
      next(error);
    }
  }



  async createBookingRequest(req,res,next){
    try{

      const data =
      await eventsService.createBookingRequest(req.body, req.admin);

      await activityLogService.logAction(
        req.admin.id,
        "Create Booking Request",
        data._id,
        "Booking request created successfully",
        "Events"
      );

      return res.status(201).json({
        success:true,
        message:EVENTS_MESSAGES.BOOKING_REQUEST_CREATED,
        data,
      });

    }catch(error){
      next(error);
    }
  }
  async updateBookingRequest(req,res,next){
    try{

      const data =
      await eventsService.updateBookingRequest(
        req.params.id,
        req.body,
        req.admin
      );

      await activityLogService.logAction(
        req.admin.id,
        "Update Booking Request",
        data._id,
        "Booking request updated successfully",
        "Events"
      );

      return res.status(200).json({
        success:true,
        message:EVENTS_MESSAGES.BOOKING_REQUEST_UPDATED,
        data,
      });

    }catch(error){
      next(error);
    }
  }



  async deleteBookingRequest(req,res,next){
    try{

      await eventsService.deleteBookingRequest(
        req.params.id,
        req.admin
      );

      await activityLogService.logAction(
        req.admin.id,
        "Delete Booking Request",
        req.params.id,
        "Booking request deleted successfully",
        "Events"
      );

      return res.status(200).json({
        success:true,
        message:EVENTS_MESSAGES.BOOKING_REQUEST_DELETED,
      });

    }catch(error){
      next(error);
    }
  }




  // ==========================
  // Page Builder
  // ==========================


  async getPageSettings(req,res,next){
    try{

      const data =
      await eventsService.getPageSettings();

      return res.status(200).json({
        success:true,
        message:EVENTS_MESSAGES.EVENTS_PAGE_FETCHED,
        data,
      });

    }catch(error){
      next(error);
    }
  }



  async updatePageSettings(req,res,next){
    try{

      const data =
      await eventsService.updatePageSettings(
        req.body,
        req.file,
        req.admin
      );

      await activityLogService.logAction(
        req.admin.id,
        "Update Events Page",
        null,
        "Events page settings updated successfully",
        "Events"
      );

      return res.status(200).json({
        success:true,
        message:EVENTS_MESSAGES.EVENTS_PAGE_UPDATED,
        data,
      });

    }catch(error){
      next(error);
    }
  }

  // Hero Settings
  async updateHeroSettings(req, res, next) {
    try {
      const data = await eventsService.updateHeroSettings(req.body);
      await activityLogService.logAction(
        req.admin.id,
        "Updated Hero Settings",
        null,
        "Hero settings updated successfully",
        "Events"
      );
      return res.status(200).json({
        success: true,
        message: EVENTS_MESSAGES.EVENT_HERO_UPDATED || "Hero settings updated successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // Engagement Types
  async addEngagementType(req, res, next) {
    try {
      const data = await eventsService.addEngagementType(req.body);
      await activityLogService.logAction(
        req.admin.id,
        "Created Engagement Type",
        data._id,
        "Engagement Type created successfully",
        "Events"
      );
      return res.status(201).json({
        success: true,
        message: "Engagement Type created successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateEngagementType(req, res, next) {
    try {
      const data = await eventsService.updateEngagementType(req.params.id, req.body);
      await activityLogService.logAction(
        req.admin.id,
        "Updated Engagement Type",
        data._id,
        "Engagement Type updated successfully",
        "Events"
      );
      return res.status(200).json({
        success: true,
        message: "Engagement Type updated successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteEngagementType(req, res, next) {
    try {
      await eventsService.deleteEngagementType(req.params.id);
      await activityLogService.logAction(
        req.admin.id,
        "Deleted Engagement Type",
        req.params.id,
        "Engagement Type deleted successfully",
        "Events"
      );
      return res.status(200).json({
        success: true,
        message: "Engagement Type deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  // Media Archive
  async addMediaArchive(req, res, next) {
    try {
      const data = await eventsService.addMediaArchive(req.body, req.file);
      await activityLogService.logAction(
        req.admin.id,
        "Added Media Archive Image",
        data._id,
        "Media archive image added successfully",
        "Events"
      );
      return res.status(201).json({
        success: true,
        message: EVENTS_MESSAGES.MEDIA_ARCHIVE_CREATED || "Media archive item created successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateMediaArchive(req, res, next) {
    try {
      const data = await eventsService.updateMediaArchive(req.params.id, req.body, req.file);
      await activityLogService.logAction(
        req.admin.id,
        "Updated Media Archive Image",
        data._id,
        "Media archive image updated successfully",
        "Events"
      );
      return res.status(200).json({
        success: true,
        message: EVENTS_MESSAGES.MEDIA_ARCHIVE_UPDATED || "Media archive item updated successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteMediaArchive(req, res, next) {
    try {
      await eventsService.deleteMediaArchive(req.params.id);
      await activityLogService.logAction(
        req.admin.id,
        "Deleted Media Archive Image",
        req.params.id,
        "Media archive image deleted successfully",
        "Events"
      );
      return res.status(200).json({
        success: true,
        message: EVENTS_MESSAGES.MEDIA_ARCHIVE_DELETED || "Media archive item deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  // Video Highlights
  async updateVideoHighlights(req, res, next) {
    try {
      const data = await eventsService.updateVideoHighlights(req.body, req.file);
      await activityLogService.logAction(
        req.admin.id,
        "Updated Video Highlights",
        null,
        "Video highlights updated successfully",
        "Events"
      );
      return res.status(200).json({
        success: true,
        message: EVENTS_MESSAGES.VIDEO_HIGHLIGHT_UPDATED || "Video highlights updated successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // Booking CTA
  async updateBookingCTA(req, res, next) {
    try {
      const data = await eventsService.updateBookingCTA(req.body);
      await activityLogService.logAction(
        req.admin.id,
        "Updated Booking CTA",
        null,
        "Booking CTA updated successfully",
        "Events"
      );
      return res.status(200).json({
        success: true,
        message: EVENTS_MESSAGES.BOOKING_CTA_UPDATED || "Booking CTA updated successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  }


}


export default new EventsController();