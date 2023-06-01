const outgoingMessagesTypes = [
    "outgoingAPIMessageReceived",
    "outgoingMessageReceived",
  ];

export const checkIsOutgoing = (data: any) => {
    return outgoingMessagesTypes.includes(
        data?.body?.typeWebhook
      );
}