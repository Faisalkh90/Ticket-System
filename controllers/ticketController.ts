import { Request, Response } from "express";
import Ticket from "../models/ticketModel";

// Create a new ticket
async function createTicket(req: Request, res: Response) {
  try {
    const { title, description, status, assignedTo } = req.body;
    if (!title || !description || !status || !assignedTo) {
      return res.status(400).json({
        errorCode: "MISSING_FIELDS",
        msg: "Missing required fields: title, description, status : [OPEN, IN_PROGRESS, DONE], assignedTo",
      });
    }
    const newTicket = new Ticket({
      title,
      description,
      status,
      assignedTo,
    });
    const ticket = await newTicket.save();
    return res
      .status(201)
      .json({ msg: "Ticket created successfully.", ticket });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
}

//get all tickets
async function getAllTickets(req: Request, res: Response) {
  try {
    const tickets = await Ticket.find();
    return res.status(200).json(tickets);
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
}

async function getTicketById(req: Request, res: Response) {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res
        .status(404)
        .json({ errorCode: "TICKET_NOT_FOUND", msg: "Ticket not found" });
    }
    return res.status(200).json(ticket);
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
}
async function updateTicket(req: Request, res: Response) {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res
        .status(404)
        .json({ errorCode: "TICKET_NOT_FOUND", msg: "Ticket not found" });
    }
    const { title, description, status, assignedTo } = req.body;
    if (!title || !description || !status || !assignedTo) {
      return res.status(400).json({
        errorCode: "MISSING_FIELDS",
        msg: "Missing required fields: title, description, status : [OPEN, IN_PROGRESS, DONE], assignedTo",
      });
    }
    ticket.title = title;
    ticket.description = description;
    ticket.status = status;
    ticket.assignedTo = assignedTo;
    const updatedTicket = await ticket.save();
    return res
      .status(200)
      .json({ msg: "Ticket updated successfully.", updatedTicket });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
}

async function deleteTicket(req: Request, res: Response) {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res
        .status(404)
        .json({ errorCode: "TICKET_NOT_FOUND", msg: "Ticket not found" });
    }
    await ticket.deleteOne();
    return res.status(200).json({ msg: "Ticket deleted successfully." });
  } catch (err: any) {
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
