import { Request, Response } from "express";
import Ticket from "../models/ticketModel";
import { checkFields, checkUserById } from "../middleware/errorMiddleware";
// Create a new ticket
async function createTicket(req: Request, res: Response) {
  try {
    const ticketFields = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      assignedTo: req.body.assignedTo,
    };
    try {
      await checkFields(req, res, ticketFields);
    } catch (err: any) {
      return res.status(400).json({
        errorCode: "MISSING_FIELDS",
        msg: "Missing required fields: title, description, status : [open, closed, in progress], assignedTo",
      });
    }
    await checkUserById(req, res, ticketFields.assignedTo);
    const newTicket = new Ticket({
      title: ticketFields.title,
      description: ticketFields.description,
      status: ticketFields.status.toLowerCase(), // convert to lowercase to match enum
      assignedTo: ticketFields.assignedTo,
    });
    const ticket = await newTicket.save();
    return res
      .status(201)
      .json({ msg: "Ticket created successfully.", ticket });
  } catch (err: any) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        errorCode: "USER_NOT_FOUND",
        msg: "User not found. Please enter valid ID",
      });
    }
    return res.status(500).json({ msg: err.message });
  }
}

//get all tickets
async function getAllTickets(req: Request, res: Response) {
  try {
    const tickets = await Ticket.find();
    if (tickets.length === 0) {
      return res
        .status(200)
        .json({ msg: "No tickets exist. Please create one" });
    }
    return res.status(200).json(tickets);
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
}

async function getTicketById(req: Request, res: Response) {
  try {
    const ticket = await Ticket.findById(req.params.id);
    return res.status(200).json(ticket);
  } catch (err: any) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        errorCode: "TICKET_NOT_FOUND",
        msg: "Ticket not found. Please enter valid ID",
      });
    }
    return res.status(500).json({ msg: err.message });
  }
}
async function updateTicket(req: Request, res: Response) {
  try {
    const ticket: any = await Ticket.findById(req.params.id);

    const { title, description, status, assignedTo } = req.body;
    // await checkUserById(req, res, assignedTo);
    try {
      await checkFields(req, res, { title, description, status, assignedTo });
    } catch (err: any) {
      return res.status(400).json({
        errorCode: "MISSING_FIELDS",
        msg: "Missing required fields: title, description, status : [open, closed, in progress], assignedTo",
      });
    }
    ticket.title = title;
    ticket.description = description;
    ticket.status = status.toLowerCase();
    ticket.assignedTo = assignedTo;
    const updatedTicket = await ticket.save();
    return res
      .status(200)
      .json({ msg: "Ticket updated successfully.", updatedTicket });
  } catch (err: any) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        errorCode: "TICKET_NOT_FOUND",
        msg: "Ticket not found. Please enter valid ID",
      });
    }
    return res.status(500).json({ msg: err.message });
  }
}

async function deleteTicket(req: Request, res: Response) {
  try {
    const ticket: any = await Ticket.findById(req.params.id);

    await ticket.deleteOne();
    return res.status(200).json({ msg: "Ticket deleted successfully." });
  } catch (err: any) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        errorCode: "TICKET_NOT_FOUND",
        msg: "Ticket not found. Please enter valid ID",
      });
    }
    return res.status(500).json({ msg: err.message });
  }
}
export {
  createTicket,
  getAllTickets,
  getTicketById,
  deleteTicket,
  updateTicket,
};
