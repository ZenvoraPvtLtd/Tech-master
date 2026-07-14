const MESSAGES = {
  // ===========================
  // Auth
  // ===========================
  LOGIN_SUCCESS: "Login successful",
  LOGOUT_SUCCESS: "Logout successful",
  INVALID_CREDENTIALS: "Invalid email or password",
  UNAUTHORIZED: "Unauthorized access",
  TOKEN_REQUIRED: "Authentication token is required",
  INVALID_TOKEN: "Invalid or expired token",

  // ===========================
  // Common CRUD
  // ===========================
  CREATED: "Data created successfully",
  UPDATED: "Data updated successfully",
  DELETED: "Data deleted successfully",
  FETCHED: "Data fetched successfully",

  // ===========================
  // Errors
  // ===========================
  NOT_FOUND: "Data not found",
  VALIDATION_ERROR: "Validation failed",
  INTERNAL_SERVER_ERROR: "Internal server error",

  // ===========================
  // Admin
  // ===========================
  ADMIN_CREATED: "Admin created successfully",
  ADMIN_UPDATED: "Admin updated successfully",

  // ===========================
  // Homepage
  // ===========================
  HOMEPAGE_UPDATED: "Homepage updated successfully",
  HOMEPAGE_PUBLISHED: "Homepage published successfully",
  HOMEPAGE_MEDIA_UPLOADED: "Homepage hero media uploaded successfully",
  HOMEPAGE_SECTION_REORDERED: "Homepage section reordered successfully",
  HOMEPAGE_SECTION_CREATED: "Homepage section added successfully",
  HOMEPAGE_SECTION_DELETED: "Homepage section deleted successfully",
  HOMEPAGE_SECTION_TOGGLED: "Homepage section visibility updated successfully",
  HOMEPAGE_PREVIEW_FETCHED: "Homepage preview fetched successfully",
  HOMEPAGE_RESET: "Homepage restored to default state successfully",
  HOMEPAGE_LOGS_FETCHED: "Homepage activity logs fetched successfully",
  HOMEPAGE_PUBLIC_FETCHED: "Homepage public data fetched successfully",

  // ===========================
  // About
  // ===========================
  ABOUT_UPDATED: "About section updated successfully",

  // ===========================
  // Blog
  // ===========================
  BLOG_CREATED: "Blog created successfully",
  BLOG_UPDATED: "Blog updated successfully",
  BLOG_DELETED: "Blog deleted successfully",

  // ===========================
  // Services
  // ===========================
  SERVICE_CREATED: "Service created successfully",
  SERVICE_UPDATED: "Service updated successfully",
  SERVICE_DELETED: "Service deleted successfully",

  // ===========================
  // Video Slider
  // ===========================
  VIDEO_SLIDER_FETCHED: "Video sliders fetched successfully",
  VIDEO_SLIDER_CREATED: "Video slider created successfully",
  VIDEO_SLIDER_UPDATED: "Video slider updated successfully",
  VIDEO_SLIDER_DELETED: "Video slider deleted successfully",
  VIDEO_SLIDER_TOGGLED: "Video slider visibility updated successfully",
  VIDEO_SLIDERS_REORDERED: "Video sliders reordered successfully",
  VIDEO_SLIDER_MEDIA_UPLOADED: "Video slider media uploaded successfully",
  VIDEO_SLIDER_NOT_FOUND: "Video slider not found",

  // ===========================
  // Reels
  // ===========================
  REELS_FETCHED: "Reels fetched successfully",
  REEL_FETCHED: "Reel fetched successfully",
  REEL_CREATED: "Reel created successfully",
  REEL_UPDATED: "Reel updated successfully",
  REEL_DELETED: "Reel deleted successfully",
  REEL_TOGGLED: "Reel visibility updated successfully",
  REELS_REORDERED: "Reels reordered successfully",
  REEL_MEDIA_UPLOADED: "Reel media uploaded successfully",

  // ===========================
  // Shorts
  // ===========================
  SHORTS_FETCHED: "Shorts fetched successfully",
  SHORT_FETCHED: "Short fetched successfully",
  SHORT_CREATED: "Short created successfully",
  SHORT_UPDATED: "Short updated successfully",
  SHORT_DELETED: "Short deleted successfully",
  SHORT_TOGGLED: "Short visibility updated successfully",
  SHORTS_REORDERED: "Shorts reordered successfully",
  SHORT_MEDIA_UPLOADED: "Short media uploaded successfully",
  SHORT_NOT_FOUND: "Short not found",

  // ===========================
  // Long Videos
  // ===========================
  LONG_VIDEOS_FETCHED: "Long videos fetched successfully",
  LONG_VIDEO_FETCHED: "Long video fetched successfully",
  LONG_VIDEO_CREATED: "Long video created successfully",
  LONG_VIDEO_UPDATED: "Long video updated successfully",
  LONG_VIDEO_DELETED: "Long video deleted successfully",
  LONG_VIDEO_TOGGLED: "Long video visibility updated successfully",
  LONG_VIDEOS_REORDERED: "Long videos reordered successfully",
  LONG_VIDEO_MEDIA_UPLOADED: "Long video media uploaded successfully",
  LONG_VIDEO_NOT_FOUND: "Long video not found",

  // ===========================
  // Hero Slider
  // ===========================
  HERO_SLIDERS_FETCHED: "Hero sliders fetched successfully",
  HERO_SLIDER_FETCHED: "Hero slider fetched successfully",
  HERO_SLIDER_CREATED: "Hero slider created successfully",
  HERO_SLIDER_UPDATED: "Hero slider updated successfully",
  HERO_SLIDER_DELETED: "Hero slider deleted successfully",
  HERO_SLIDER_TOGGLED: "Hero slider visibility updated successfully",
  HERO_SLIDERS_REORDERED: "Hero sliders reordered successfully",
  HERO_SLIDER_MEDIA_UPLOADED: "Hero slider media uploaded successfully",
  HERO_SLIDER_NOT_FOUND: "Hero slider not found",
};

// ===========================
// Collaboration Messages
// ===========================
const COLLABORATION_MESSAGES = {
  CREATED: "Collaboration page created successfully.",
  FETCHED: "Collaboration page fetched successfully.",
  UPDATED: "Collaboration page updated successfully.",
  DELETED: "Collaboration page deleted successfully.",

  HERO_UPDATED: "Hero section updated successfully.",
  HISTORY_UPDATED: "History section updated successfully.",
  SEO_UPDATED: "SEO section updated successfully.",

  BRAND_CAROUSEL_CREATED: "Brand added successfully.",
  BRAND_CAROUSEL_UPDATED: "Brand updated successfully.",
  BRAND_CAROUSEL_DELETED: "Brand deleted successfully.",

  PARTNERS_CREATED: "Partner added successfully.",
  PARTNERS_UPDATED: "Partner updated successfully.",
  PARTNERS_DELETED: "Partner deleted successfully.",

  METRICS_CREATED: "Metric added successfully.",
  METRICS_UPDATED: "Metric updated successfully.",
  METRICS_DELETED: "Metric deleted successfully.",

  CAMPAIGNS_CREATED: "Campaign added successfully.",
  CAMPAIGNS_UPDATED: "Campaign updated successfully.",
  CAMPAIGNS_DELETED: "Campaign deleted successfully.",

  PROCESSES_CREATED: "Process added successfully.",
  PROCESS_UPDATED: "Process updated successfully.",
  PROCESS_DELETED: "Process deleted successfully.",

  TESTIMONIALS_CREATED: "Testimonial added successfully.",
  TESTIMONIALS_UPDATED: "Testimonial updated successfully.",
  TESTIMONIALS_DELETED: "Testimonial deleted successfully.",

  SECTION_SETTINGS_UPDATED: "Section settings updated successfully.",

  NESTED_ITEM_DELETED: "Item deleted successfully.",

  NOT_FOUND: "Collaboration page not found.",
  INVALID_ID: "Invalid collaboration id.",
  SOMETHING_WENT_WRONG: "Something went wrong."
};
//campaigns

// ===========================
// Campaign & Launch Messages
// ===========================

const CAMPAIGN_MESSAGES = {
  // Campaign Hero
  CAMPAIGN_HERO_FETCHED: "Campaign hero fetched successfully.",
  CAMPAIGN_HERO_UPDATED: "Campaign hero updated successfully.",

  // Campaign
  CAMPAIGN_FETCHED: "Campaign fetched successfully.",
  CAMPAIGN_CREATED: "Campaign created successfully.",
  CAMPAIGN_UPDATED: "Campaign updated successfully.",
  CAMPAIGN_DELETED: "Campaign deleted successfully.",

  // Lifecycle
  LIFECYCLE_FETCHED: "Campaign lifecycle fetched successfully.",
  LIFECYCLE_CREATED: "Campaign lifecycle created successfully.",
  LIFECYCLE_UPDATED: "Campaign lifecycle updated successfully.",
  LIFECYCLE_DELETED: "Campaign lifecycle deleted successfully.",

  // Success Stories
  SUCCESS_STORY_FETCHED: "Success stories fetched successfully.",
  SUCCESS_STORY_CREATED: "Success story created successfully.",
  SUCCESS_STORY_UPDATED: "Success story updated successfully.",
  SUCCESS_STORY_DELETED: "Success story deleted successfully.",

  // Campaign SEO
  CAMPAIGN_SEO_FETCHED: "Campaign SEO fetched successfully.",
  CAMPAIGN_SEO_UPDATED: "Campaign SEO updated successfully.",

  // Launch Hero
  LAUNCH_HERO_FETCHED: "Launch hero fetched successfully.",
  LAUNCH_HERO_UPDATED: "Launch hero updated successfully.",

  // Products
  PRODUCT_FETCHED: "Products fetched successfully.",
  PRODUCT_CREATED: "Product created successfully.",
  PRODUCT_UPDATED: "Product updated successfully.",
  PRODUCT_DELETED: "Product deleted successfully.",

  // Feature Video
  FEATURE_VIDEO_FETCHED: "Feature video fetched successfully.",
  FEATURE_VIDEO_UPDATED: "Feature video updated successfully.",

  // Initiatives
  INITIATIVE_FETCHED: "Initiatives fetched successfully.",
  INITIATIVE_CREATED: "Initiative created successfully.",
  INITIATIVE_UPDATED: "Initiative updated successfully.",
  INITIATIVE_DELETED: "Initiative deleted successfully.",

  // Launch SEO
  LAUNCH_SEO_FETCHED: "Launch SEO fetched successfully.",
  LAUNCH_SEO_UPDATED: "Launch SEO updated successfully.",

  // Common
  NOT_FOUND: "Data not found.",
  INVALID_ID: "Invalid ID.",
  SOMETHING_WENT_WRONG: "Something went wrong."
};
// ===========================
// Events Messages
// ===========================

const EVENTS_MESSAGES = {

  // ===========================
  // Master Events
  // ===========================

  EVENT_FETCHED: "Events fetched successfully.",
  EVENT_CREATED: "Event created successfully.",
  EVENT_UPDATED: "Event updated successfully.",
  EVENT_DELETED: "Event deleted successfully.",


  // ===========================
  // Workshops
  // ===========================

  WORKSHOP_FETCHED: "Workshops fetched successfully.",
  WORKSHOP_CREATED: "Workshop created successfully.",
  WORKSHOP_UPDATED: "Workshop updated successfully.",
  WORKSHOP_DELETED: "Workshop deleted successfully.",


  // ===========================
  // Conferences
  // ===========================

  CONFERENCE_FETCHED: "Conferences fetched successfully.",
  CONFERENCE_CREATED: "Conference created successfully.",
  CONFERENCE_UPDATED: "Conference updated successfully.",
  CONFERENCE_DELETED: "Conference deleted successfully.",


  // ===========================
  // Booking Requests
  // ===========================

  BOOKING_REQUEST_FETCHED: "Booking requests fetched successfully.",
  BOOKING_REQUEST_CREATED: "Booking request created successfully.",
  BOOKING_REQUEST_UPDATED: "Booking request updated successfully.",
  BOOKING_REQUEST_DELETED: "Booking request deleted successfully.",


  // ===========================
  // Events Page Builder
  // ===========================

  EVENTS_PAGE_FETCHED: "Events page settings fetched successfully.",
  EVENTS_PAGE_UPDATED: "Events page settings updated successfully.",


  // ===========================
  // Hero Settings
  // ===========================

  EVENT_HERO_FETCHED: "Event hero fetched successfully.",
  EVENT_HERO_UPDATED: "Event hero updated successfully.",


  // ===========================
  // Media Archive
  // ===========================

  MEDIA_ARCHIVE_FETCHED: "Media archive fetched successfully.",
  MEDIA_ARCHIVE_CREATED: "Media archive created successfully.",
  MEDIA_ARCHIVE_UPDATED: "Media archive updated successfully.",
  MEDIA_ARCHIVE_DELETED: "Media archive deleted successfully.",


  // ===========================
  // Video Highlights
  // ===========================

  VIDEO_HIGHLIGHT_FETCHED: "Video highlights fetched successfully.",
  VIDEO_HIGHLIGHT_UPDATED: "Video highlights updated successfully.",


  // ===========================
  // Booking CTA
  // ===========================

  BOOKING_CTA_UPDATED: "Booking CTA updated successfully.",


  // ===========================
  // Common Events Errors
  // ===========================

  EVENT_NOT_FOUND: "Event not found.",
  WORKSHOP_NOT_FOUND: "Workshop not found.",
  CONFERENCE_NOT_FOUND: "Conference not found.",
  BOOKING_REQUEST_NOT_FOUND: "Booking request not found.",
  INVALID_ID: "Invalid event ID.",
  SOMETHING_WENT_WRONG: "Something went wrong."
};

// ===========================
// What We Do Messages
// ===========================
const WHAT_WE_DO_MESSAGES = {
  CREATED: "What We Do page created successfully.",
  FETCHED: "What We Do page fetched successfully.",
  UPDATED: "What We Do page updated successfully.",
  HERO_UPDATED: "Hero settings updated successfully.",
  OPERATIONS_FETCHED: "Operations grid fetched successfully.",
  OPERATION_CREATED: "Operation created successfully.",
  OPERATION_UPDATED: "Operation updated successfully.",
  OPERATION_DELETED: "Operation deleted successfully.",
  SERVICES_FETCHED: "Services list fetched successfully.",
  SERVICE_CREATED: "Service created successfully.",
  SERVICE_UPDATED: "Service updated successfully.",
  SERVICE_DELETED: "Service deleted successfully.",
  QUOTE_UPDATED: "Quote banner updated successfully.",
  SEO_UPDATED: "SEO settings updated successfully.",
  SETTINGS_UPDATED: "Section settings updated successfully.",
  DRAFT_SAVED: "Draft saved successfully.",
  PUBLISHED: "What We Do page published successfully.",
  QUOTE_FETCHED: "Quote banner fetched successfully.",
  SEO_FETCHED: "SEO settings fetched successfully.",
  SETTINGS_FETCHED: "Section settings fetched successfully.",
  NOT_FOUND: "What We Do page not found.",
  INVALID_ID: "Invalid ID."
};

export default MESSAGES;
export { COLLABORATION_MESSAGES, CAMPAIGN_MESSAGES, EVENTS_MESSAGES, WHAT_WE_DO_MESSAGES };