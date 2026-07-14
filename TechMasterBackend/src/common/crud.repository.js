export const create = async (Model, payload) => {
  return await Model.create(payload);
};

export const getAll = async (
  Model,
  filter = {},
  sort = { createdAt: -1 }
) => {
  return await Model.find(filter).sort(sort);
};

export const getById = async (Model, id) => {
  return await Model.findById(id);
};

export const update = async (
  Model,
  id,
  payload
) => {
  return await Model.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
      runValidators: true,
    }
  );
};

export const remove = async (
  Model,
  id
) => {
  return await Model.findByIdAndDelete(id);
};

export const findOne = async (
  Model,
  filter = {}
) => {
  return await Model.findOne(filter);
};

export const find = async (
  Model,
  filter = {}
) => {
  return await Model.find(filter);
};

export const count = async (
  Model,
  filter = {}
) => {
  return await Model.countDocuments(filter);
};