import * as CrudRepository from "./crud.repository.js";

// ==============================
// Create
// ==============================

export const create = async (
  Model,
  payload
) => {
  return await CrudRepository.create(
    Model,
    payload
  );
};

// ==============================
// Get All
// ==============================

export const getAll = async (
  Model,
  filter = {},
  sort = { createdAt: -1 }
) => {
  return await CrudRepository.getAll(
    Model,
    filter,
    sort
  );
};

// ==============================
// Get By ID
// ==============================

export const getById = async (
  Model,
  id
) => {
  return await CrudRepository.getById(
    Model,
    id
  );
};

// ==============================
// Update
// ==============================

export const update = async (
  Model,
  id,
  payload
) => {
  return await CrudRepository.update(
    Model,
    id,
    payload
  );
};

// ==============================
// Delete
// ==============================

export const remove = async (
  Model,
  id
) => {
  return await CrudRepository.remove(
    Model,
    id
  );
};

// ==============================
// Find One
// ==============================

export const findOne = async (
  Model,
  filter
) => {
  return await CrudRepository.findOne(
    Model,
    filter
  );
};


// Find


export const find = async (
  Model,
  filter = {}
) => {
  return await CrudRepository.find(
    Model,
    filter
  );
};


// Count


export const count = async (
  Model,
  filter = {}
) => {
  return await CrudRepository.count(
    Model,
    filter
  );
};