export const checkIsIncoming = (data: any) => {
    return data?.body?.typeWebhook === "incomingMessageReceived" &&
    data?.body?.messageData?.typeMessage === "textMessage";
}