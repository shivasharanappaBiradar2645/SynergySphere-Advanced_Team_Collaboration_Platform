import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder()

      const sendNotification = (message: string) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ message })}\n\n`))
      }

      // Send a notification every 5 seconds
      const intervalId = setInterval(() => {
        sendNotification('This is a test notification.')
      }, 5000)

      // Clean up the interval when the client disconnects
      request.signal.addEventListener('abort', () => {
        clearInterval(intervalId)
        controller.close()
      })
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
