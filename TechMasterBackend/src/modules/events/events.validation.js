import Joi from "joi";


/* ==========================================================
   MASTER EVENT VALIDATION
========================================================== */


export const createEventValidation = Joi.object({

title:Joi.string()
.min(3)
.max(150)
.required(),

type:Joi.string()
.required(),

slug:Joi.string()
.required(),

date:Joi.string()
.required(),

time:Joi.string()
.required(),

venue:Joi.string()
.required(),

location:Joi.string()
.required(),

googleMapLink:Joi.string()
.required(),

attendance:Joi.number()
.min(1)
.required(),

organizer:Joi.string()
.required(),

coordinator:Joi.string()
.required(),

budget:Joi.number()
.min(0)
.required(),

status:Joi.string()
.valid(
"Upcoming",
"Completed",
"Cancelled",
"Draft"
)
.default("Draft"),

accentColor:Joi.string(),

media:Joi.string()
.required(),

pressKitPdf:Joi.string(),

description:Joi.string()
.min(20)
.required(),

isFeatured:Joi.boolean(),

visibility:Joi.string()
.valid(
"Public",
"Private"
)

});




export const updateEventValidation =
createEventValidation.fork(
Object.keys(createEventValidation.describe().keys),
field=>field.optional()
);





/* ==========================================================
   WORKSHOP VALIDATION
========================================================== */


export const createWorkshopValidation = Joi.object({

title:Joi.string()
.required(),

instructor:Joi.string()
.required(),

date:Joi.string()
.required(),

venue:Joi.string()
.required(),

seats:Joi.number()
.min(1)
.required(),

price:Joi.number()
.min(0)
.required(),

media:Joi.string(),

description:Joi.string(),

status:Joi.string()
.valid(
"Upcoming",
"Completed",
"Cancelled",
"Active",
"Inactive"
)

});





export const updateWorkshopValidation =
createWorkshopValidation.fork(
Object.keys(createWorkshopValidation.describe().keys),
field=>field.optional()
);





/* ==========================================================
   CONFERENCE VALIDATION
========================================================== */


export const createConferenceValidation = Joi.object({

title:Joi.string()
.required(),

date:Joi.string()
.required(),

location:Joi.string()
.required(),

guests:Joi.number()
.min(1)
.required(),

media:Joi.string(),

description:Joi.string(),

status:Joi.string()
.valid(
"Upcoming",
"Completed",
"Cancelled",
"Active",
"Inactive"
)

});





export const updateConferenceValidation =
createConferenceValidation.fork(
Object.keys(createConferenceValidation.describe().keys),
field=>field.optional()
);





/* ==========================================================
   BOOKING REQUEST VALIDATION
========================================================== */


export const createBookingRequestValidation = Joi.object({

name:Joi.string()
.required(),

email:Joi.string()
.email()
.required(),

organization:Joi.string()
.required(),

eventName:Joi.string()
.required(),

date:Joi.string()
.required(),

budget:Joi.number()
.required(),

status:Joi.string()
.valid(
"New",
"Contacted",
"Approved",
"Archived"
),

message:Joi.string()
.required()

});





export const updateBookingRequestValidation =
createBookingRequestValidation.fork(
Object.keys(createBookingRequestValidation.describe().keys),
field=>field.optional()
);





/* ==========================================================
   PAGE BUILDER VALIDATION
========================================================== */


export const updateEventsPageValidation = Joi.object({

heroSettings:Joi.object({

smallBadge:Joi.string(),

highlightWord:Joi.string(),

headline:Joi.string(),

description:Joi.string()

}),


engagementTypes:Joi.array(),

mediaArchive:Joi.array(),

videoHighlights:Joi.object({

recapBadge:Joi.string(),

title:Joi.string(),

videoUrl:Joi.string(),

thumbnail:Joi.string()

}),


bookingCTA:Joi.object({

smallBadge:Joi.string(),

highlightWord:Joi.string(),

headline:Joi.string(),

description:Joi.string(),

awardText:Joi.string()

})
});




/* ==========================================================
   HERO SETTINGS VALIDATION
========================================================== */


export const updateHeroSettingsValidation = Joi.object({

smallBadge:Joi.string(),

highlightWord:Joi.string(),

headline:Joi.string(),

description:Joi.string()

});




/* ==========================================================
   ENGAGEMENT TYPES VALIDATION
========================================================== */


export const createEngagementTypeValidation = Joi.object({

title:Joi.string()
.required(),

status:Joi.string()
.valid("Active","Hidden")
.default("Active")

});


export const updateEngagementTypeValidation =
createEngagementTypeValidation.fork(
Object.keys(createEngagementTypeValidation.describe().keys),
field=>field.optional()
);




/* ==========================================================
   MEDIA ARCHIVE VALIDATION
========================================================== */


export const createMediaArchiveValidation = Joi.object({

title:Joi.string()
.required(),

category:Joi.string()
.required(),

url:Joi.string()

});


export const updateMediaArchiveValidation =
createMediaArchiveValidation.fork(
Object.keys(createMediaArchiveValidation.describe().keys),
field=>field.optional()
);




/* ==========================================================
   VIDEO HIGHLIGHTS VALIDATION
========================================================== */


export const updateVideoHighlightsValidation = Joi.object({

recapBadge:Joi.string(),

title:Joi.string(),

videoUrl:Joi.string(),

thumbnail:Joi.string()

});




/* ==========================================================
   BOOKING CTA VALIDATION
========================================================== */


export const updateBookingCTAValidation = Joi.object({

smallBadge:Joi.string(),

highlightWord:Joi.string(),

headline:Joi.string(),

description:Joi.string(),

awardText:Joi.string()

});