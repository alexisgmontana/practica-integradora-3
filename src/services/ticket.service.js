import TicketModel from '../dao/mongo/models/ticket.model.js';

class TicketService {
  async createTicket(ticketData) {
    const newTicket = await TicketModel.create(ticketData);
    return newTicket;
  }
}

export const ticketService = new TicketService();
