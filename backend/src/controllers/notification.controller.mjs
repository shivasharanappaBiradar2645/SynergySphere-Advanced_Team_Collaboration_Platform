import { db } from "../db/db.mjs";
import { notifications } from "../db/schema.mjs";
import { eq, and } from "drizzle-orm";

let clients = [];

// SSE connection
export const notificationStream = (req, res) => {
  const userId = req.user.id;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const clientId = Date.now();
  clients.push({ id: clientId, res, userId });

  req.on("close", () => {
    clients = clients.filter(c => c.id !== clientId);
  });
};

export const sendNotification = (userId, message) => {
    const userClients = clients.filter(c => c.userId === userId);
    userClients.forEach(c => c.res.write(`data: ${JSON.stringify(message)}

`));
}

// Poll DB for unread notifications
export const pollNotifications = async () => {
  for (const client of clients) {
    const unread = await db
      .select()
      .from(notifications)
      .where(and(eq(notifications.userId, client.userId), eq(notifications.isRead, 0)));

    if (unread.length > 0) {
      client.res.write(`data: ${JSON.stringify(unread)}

`);
    }
  }
};
setInterval(pollNotifications, 5000);

// REST API — get unread
export const getUnread = async (req, res) => {
    try{
        const userId = req.user.id;
        const result = await db
            .select()
            .from(notifications)
            .where(and(eq(notifications.userId, userId), eq(notifications.isRead, 0)));
        res.json({success: true, data: result});
    } catch (err) {
        res.status(500).json({success: false, error: err.message});
    }
};

// REST API — mark as read
export const markAsRead = async (req, res) => {
    try{
        const userId = req.user.id;
        const { id } = req.params;

        await db.update(notifications)
            .set({ isRead: 1 })
            .where(and(eq(notifications.id, +id), eq(notifications.userId, userId)));

        res.json({ success: true, message: "Notification marked as read" });
    } catch (err) {
        res.status(500).json({success: false, error: err.message});
    }
};
