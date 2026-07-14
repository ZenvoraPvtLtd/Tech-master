import uploadFile from "../utils/uploadFile.js";
import * as CrudService from "./crud.service.js";
import { successResponse } from "../utils/response.js";

const uploadFiles = async (
  req,
  payload = {},
  uploadFields = {}
) => {
  for (const field in uploadFields) {
    const config = uploadFields[field];

    if (!config) continue;

    // ==========================
    // Single File
    // ==========================
    if (
      !config.multiple &&
      req.files?.[field]?.length
    ) {
      const file = req.files[field][0];

      payload[field] = await uploadFile(
        file.path,
        config.folder
      );
    }


    // ==========================
    // Multiple Files
    // ==========================
    if (
      config.multiple &&
      req.files?.[field]?.length
    ) {
      payload[field] = [];

      for (const file of req.files[field]) {
        const url = await uploadFile(
          file.path,
          config.folder
        );

        payload[field].push(url);
      }
    }
  }

  return payload;
};


// ==========================
// CREATE
// ==========================
export const create = async (
  req,
  res,
  next,
  Model,
  uploadFields = {},
  message = "Created successfully"
) => {
  try {

    console.log("========== CREATE DEBUG ==========");
    console.log("BODY =>", req.body);
    console.log("FILES =>", req.files);
    console.log("UPLOAD FIELDS =>", uploadFields);


    let payload = {
      ...(req.body || {}),
    };
    
    // Remove immutable fields that could cause MongoError if sent by frontend
    delete payload._id;
    delete payload.id;
    delete payload.__v;
    delete payload.createdAt;
    delete payload.updatedAt;

    payload = await uploadFiles(
      req,
      payload,
      uploadFields
    );


    console.log("FINAL PAYLOAD =>", payload);


    const data = await CrudService.create(
      Model,
      payload
    );


    return successResponse(
      res,
      message,
      data,
      201
    );


  } catch (error) {
    next(error);
  }
};



// ==========================
// GET ALL
// ==========================
export const getAll = async (
  req,
  res,
  next,
  Model,
  filter = {},
  sort = { createdAt: -1 },
  message = "Fetched successfully"
) => {
  try {

    const data = await CrudService.getAll(
      Model,
      filter,
      sort
    );


    return successResponse(
      res,
      message,
      data
    );


  } catch (error) {
    next(error);
  }
};



// ==========================
// GET BY ID
// ==========================
export const getById = async (
  req,
  res,
  next,
  Model,
  message = "Fetched successfully"
) => {
  try {

    const data = await CrudService.getById(
      Model,
      req.params.id
    );


    return successResponse(
      res,
      message,
      data
    );


  } catch (error) {
    next(error);
  }
};



// ==========================
// UPDATE
// ==========================
export const update = async (
  req,
  res,
  next,
  Model,
  uploadFields = {},
  message = "Updated successfully"
) => {
  try {


    let payload = {
      ...(req.body || {}),
    };
    
    // Remove immutable fields that could cause MongoError if sent by frontend
    delete payload._id;
    delete payload.id;
    delete payload.__v;
    delete payload.createdAt;
    delete payload.updatedAt;

    payload = await uploadFiles(
      req,
      payload,
      uploadFields
    );


    const data = await CrudService.update(
      Model,
      req.params.id,
      payload
    );


    return successResponse(
      res,
      message,
      data
    );


  } catch (error) {
    next(error);
  }
};



// ==========================
// DELETE
// ==========================
export const remove = async (
  req,
  res,
  next,
  Model,
  message = "Deleted successfully"
) => {
  try {

    await CrudService.remove(
      Model,
      req.params.id
    );


    return successResponse(
      res,
      message,
      null
    );


  } catch (error) {
    next(error);
  }
};



// ==========================
// FIND ONE
// ==========================
export const findOne = async (
  req,
  res,
  next,
  Model,
  filter = {},
  message = "Fetched successfully"
) => {
  try {

    const data = await CrudService.findOne(
      Model,
      filter
    );


    return successResponse(
      res,
      message,
      data
    );


  } catch (error) {
    next(error);
  }
};



// ==========================
// FIND
// ==========================
export const find = async (
  req,
  res,
  next,
  Model,
  filter = {},
  message = "Fetched successfully"
) => {
  try {

    const data = await CrudService.find(
      Model,
      filter
    );


    return successResponse(
      res,
      message,
      data
    );


  } catch (error) {
    next(error);
  }
};



// ==========================
// COUNT
// ==========================
export const count = async (
  req,
  res,
  next,
  Model,
  filter = {},
  message = "Count fetched successfully"
) => {
  try {

    const data = await CrudService.count(
      Model,
      filter
    );


    return successResponse(
      res,
      message,
      {
        total: data,
      }
    );


  } catch (error) {
    next(error);
  }
};