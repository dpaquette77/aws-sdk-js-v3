import { ChimeClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ChimeClient";
import { BatchUpdatePhoneNumberRequest, BatchUpdatePhoneNumberResponse } from "../models/models_0";
import {
  deserializeAws_restJson1BatchUpdatePhoneNumberCommand,
  serializeAws_restJson1BatchUpdatePhoneNumberCommand,
} from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { HttpRequest as __HttpRequest, HttpResponse as __HttpResponse } from "@aws-sdk/protocol-http";
import { Command as $Command } from "@aws-sdk/smithy-client";
import {
  FinalizeHandlerArguments,
  Handler,
  HandlerExecutionContext,
  MiddlewareStack,
  HttpHandlerOptions as __HttpHandlerOptions,
  MetadataBearer as __MetadataBearer,
  SerdeContext as __SerdeContext,
} from "@aws-sdk/types";

export type BatchUpdatePhoneNumberCommandInput = BatchUpdatePhoneNumberRequest;
export type BatchUpdatePhoneNumberCommandOutput = BatchUpdatePhoneNumberResponse & __MetadataBearer;

export class BatchUpdatePhoneNumberCommand extends $Command<
  BatchUpdatePhoneNumberCommandInput,
  BatchUpdatePhoneNumberCommandOutput,
  ChimeClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: BatchUpdatePhoneNumberCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: ChimeClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<BatchUpdatePhoneNumberCommandInput, BatchUpdatePhoneNumberCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "ChimeClient";
    const commandName = "BatchUpdatePhoneNumberCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: BatchUpdatePhoneNumberRequest.filterSensitiveLog,
      outputFilterSensitiveLog: BatchUpdatePhoneNumberResponse.filterSensitiveLog,
    };

    if (typeof logger.info === "function") {
      logger.info({
        clientName,
        commandName,
      });
    }

    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: BatchUpdatePhoneNumberCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_restJson1BatchUpdatePhoneNumberCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<BatchUpdatePhoneNumberCommandOutput> {
    return deserializeAws_restJson1BatchUpdatePhoneNumberCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
