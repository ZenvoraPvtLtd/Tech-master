import CMSData from "./cms.model.js";
import uploadFile from "../../utils/uploadFile.js";

class CMSController {
  /**
   * Fetch all CMS configs merged
   */
  async getCMSData(req, res, next) {
    try {
      const records = await CMSData.find({});
      const db = {};
      records.forEach((record) => {
        db[record.key] = record.data;
      });
      return res.status(200).json({
        success: true,
        data: db
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update or upsert a specific CMS key
   */
  async updateCMSKey(req, res, next) {
    try {
      const { key, value } = req.body;
      if (!key) {
        throw new Error("Key parameter is required");
      }

      const updated = await CMSData.findOneAndUpdate(
        { key },
        { key, data: value },
        { new: true, upsert: true }
      );

      return res.status(200).json({
        success: true,
        message: `CMS key '${key}' saved successfully`,
        data: updated
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Upload media file to Cloudinary
   */
  async uploadMedia(req, res, next) {
    try {
      if (!req.file) {
        throw new Error("No file uploaded");
      }

      const result = await uploadFile(req.file.buffer, "cms-uploads", "auto");

      return res.status(200).json({
        success: true,
        message: "File uploaded successfully",
        url: result.url,
        publicId: result.publicId,
        format: result.format,
        size: result.size
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Public Enquiry Submission (Visitor)
   */
  async publicSubmitEnquiry(req, res, next) {
    try {
      const enquiry = req.body;
      if (!enquiry.name || !enquiry.email) {
        throw new Error("Name and Email are required fields");
      }

      // Add default metadata fields
      const newEnquiry = {
        id: `enq-${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: "Unread",
        ...enquiry
      };

      // Retrieve or init enquiries collection
      let doc = await CMSData.findOne({ key: "enquiries" });
      let list = doc ? doc.data : [];
      if (!Array.isArray(list)) list = [];

      list.unshift(newEnquiry);

      await CMSData.findOneAndUpdate(
        { key: "enquiries" },
        { key: "enquiries", data: list },
        { new: true, upsert: true }
      );

      return res.status(201).json({
        success: true,
        message: "Enquiry submitted successfully",
        data: newEnquiry
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Public Resume Application (Visitor)
   */
  async publicSubmitResume(req, res, next) {
    try {
      const { name, email, phone, jobId, jobTitle, experience, message } = req.body;
      if (!name || !email) {
        throw new Error("Name and Email are required fields");
      }

      let resumeUrl = "";
      if (req.file) {
        const uploadResult = await uploadFile(req.file.buffer, "resumes", "raw");
        resumeUrl = uploadResult.url;
      }

      const newResume = {
        id: `res-${Date.now()}`,
        name,
        email,
        phone: phone || "",
        jobId: jobId || "",
        jobTitle: jobTitle || "",
        experience: experience || "",
        message: message || "",
        resumeUrl,
        status: "New",
        createdAt: new Date().toISOString()
      };

      let doc = await CMSData.findOne({ key: "resumes" });
      let list = doc ? doc.data : [];
      if (!Array.isArray(list)) list = [];

      list.unshift(newResume);

      await CMSData.findOneAndUpdate(
        { key: "resumes" },
        { key: "resumes", data: list },
        { new: true, upsert: true }
      );

      return res.status(201).json({
        success: true,
        message: "Job application submitted successfully",
        data: newResume
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CMSController();
