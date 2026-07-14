import express from "express";
import whatWeDoController from "./whatWeDo.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import upload from "../../middleware/upload.middleware.js";
import {
  validateHero,
  validateOperationsCreate,
  validateOperationsUpdate,
  validateServicesCreate,
  validateServicesUpdate,
  validateQuote,
  validateSeo,
  validateSectionSettings,
  validateId,
} from "./whatWeDo.validation.js";

const router = express.Router();

const validate = (schema)=>(req,res,next)=>{
  const {error, value}=schema.validate(req.body,{abortEarly:false, stripUnknown:true});
  if(error){
    return res.status(400).json({
      success:false,
      message:"Validation Error",
      errors:error.details.map(err=>({
        field:err.path.join("."),
        message:err.message
      }))
    });
  }
  req.body = value;
  next();
};

const validateParams=(schema)=>(req,res,next)=>{
  const {error}=schema.validate(req.params);
  if(error){
    return res.status(400).json({
      success:false,
      message:"Validation Error"
    });
  }
  next();
};

const mapFileToBody=(fieldName)=>(req,res,next)=>{
  if(req.file){
    req.body[fieldName]=req.file.originalname || "uploaded";
  }
  next();
};

// Root
router.get("/",whatWeDoController.get);
router.post("/",whatWeDoController.create);

// Hero
router.get("/hero",whatWeDoController.get);
router.put("/hero",validate(validateHero),whatWeDoController.updateHero);

// Operations
router.get("/operations",whatWeDoController.getAllOperations);
router.get("/operations/:id",validateParams(validateId),whatWeDoController.getOperationById);

router.post("/operations",
  
  validate(validateOperationsCreate),
  whatWeDoController.createOperation
);

router.put("/operations/:id",
  
  validateParams(validateId),
  validate(validateOperationsUpdate),
  whatWeDoController.updateOperation
);

router.delete("/operations/:id",
  
  validateParams(validateId),
  whatWeDoController.deleteOperation
);

router.patch("/operations/:id/toggle",
  
  validateParams(validateId),
  whatWeDoController.toggleOperationStatus
);

router.patch("/operations/reorder",
  
  whatWeDoController.reorderOperations
);

// Services
router.get("/services",whatWeDoController.getAllServices);
router.get("/services/:id",validateParams(validateId),whatWeDoController.getServiceById);

router.post("/services",
  
  validate(validateServicesCreate),
  whatWeDoController.createService
);

router.put("/services/:id",
  
  validateParams(validateId),
  validate(validateServicesUpdate),
  whatWeDoController.updateService
);

router.delete("/services/:id",
  
  validateParams(validateId),
  whatWeDoController.deleteService
);

router.patch("/services/:id/toggle",
  
  validateParams(validateId),
  whatWeDoController.toggleServiceStatus
);

router.patch("/services/reorder",
  
  whatWeDoController.reorderServices
);

// Quote Banner
router.get("/quote-banner",whatWeDoController.getQuoteBanner);

router.put("/quote-banner",
  
  validate(validateQuote),
  whatWeDoController.updateQuoteBanner
);

// SEO
router.get("/seo",whatWeDoController.getSeo);

router.put("/seo",
  
  upload.single("ogImageUrl"),
  mapFileToBody("ogImageUrl"),
  validate(validateSeo),
  whatWeDoController.updateSeo
);

// Section Settings
router.get("/section-settings",whatWeDoController.getSectionSettings);

router.put("/section-settings",
  
  validate(validateSectionSettings),
  whatWeDoController.updateSectionSettings
);

// Draft & Publish
router.put("/publish",
  
  whatWeDoController.publish
);

router.put("/draft",
  
  whatWeDoController.saveDraft
);

export default router;
