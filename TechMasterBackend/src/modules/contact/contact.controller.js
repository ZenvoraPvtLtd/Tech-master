import { Contact } from "./contact.model.js";

export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({});
        res.status(200).json({ success: true, data: contacts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createContact = async (req, res) => {
    try {
        const newContact = await Contact.create(req.body);
        res.status(201).json({ success: true, data: newContact });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ success: false, message: "Contact not found" });
        res.status(200).json({ success: true, data: contact });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!contact) return res.status(404).json({ success: false, message: "Contact not found" });
        res.status(200).json({ success: true, data: contact });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) return res.status(404).json({ success: false, message: "Contact not found" });
        res.status(200).json({ success: true, message: "Contact deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
