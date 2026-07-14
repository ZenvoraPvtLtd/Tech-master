import Joi from "joi";


class AboutValidation {


  /**
   * Introduction Validation
   */
  updateIntroduction = {
    body: Joi.object({

      title: Joi.string()
        .trim()
        .max(100)
        .required(),

      subtitle: Joi.string()
        .trim()
        .max(150)
        .allow(""),

      description: Joi.string()
        .trim()
        .allow(""),

      buttonText: Joi.string()
        .trim()
        .allow(""),

      buttonLink: Joi.string()
        .trim()
        .allow(""),

    }),
  };



  /**
   * Story Validation
   */
  updateStory = {
    body: Joi.object({

      heading: Joi.string()
        .trim()
        .required(),

      storyContent: Joi.string()
        .allow(""),

    }),
  };



  /**
   * Vision Validation
   */
  updateVision = {
    body: Joi.object({

      visionTitle: Joi.string()
        .trim()
        .required(),

      visionDescription: Joi.string()
        .allow(""),

    }),
  };



  /**
   * Highlights Validation
   */
  updateHighlights = {
    body: Joi.object({

      highlights: Joi.array()
        .items(

          Joi.object({

            value: Joi.string()
              .required(),

            label: Joi.string()
              .required(),

            order: Joi.number()
              .optional(),

            isActive: Joi.boolean()
              .optional(),

          })

        )
        .required(),

    }),
  };



  /**
   * Achievement Validation
   */
  achievement = {
    body: Joi.object({

      title: Joi.string()
        .required(),

      description: Joi.string()
        .allow(""),

      year: Joi.string()
        .allow(""),

      order: Joi.number()
        .optional(),

    }),
  };



  /**
   * Award Validation
   */
  award = {
    body: Joi.object({

      title: Joi.string()
        .required(),

      organization: Joi.string()
        .allow(""),

      year: Joi.string()
        .allow(""),

      description: Joi.string()
        .allow(""),

      order: Joi.number()
        .optional(),

      isActive: Joi.boolean()
        .optional(),

    }),
  };



  /**
   * Experience Validation
   */
  experience = {
    body: Joi.object({

      company: Joi.string()
        .required(),

      position: Joi.string()
        .required(),

      duration: Joi.string()
        .allow(""),

      description: Joi.string()
        .allow(""),

      order: Joi.number()
        .optional(),

    }),
  };



  /**
   * SEO Validation
   */
  seo = {
    body: Joi.object({

      metaTitle: Joi.string()
        .allow(""),

      metaDescription: Joi.string()
        .allow(""),

      keywords: Joi.array()
        .items(
          Joi.string()
        ),

      canonicalUrl: Joi.string()
        .allow(""),

    }),
  };



  /**
   * Publish Status
   */
  publish = {
    body: Joi.object({

      status: Joi.string()
        .valid(
          "Draft",
          "Published"
        )
        .required(),

    }),
  };



  /**
   * Section Update
   */
  section = {
    body: Joi.object({

      enabled: Joi.boolean()
        .required(),

    }),
  };


}


export default new AboutValidation();