export class ErrorWithCodeAndTypedMessage<MessageT extends string = string> extends Error {
  constructor(
    readonly code: number,
    override readonly message: MessageT,
    options?: ErrorOptions
  ) {
    super(message, options);
  }
}