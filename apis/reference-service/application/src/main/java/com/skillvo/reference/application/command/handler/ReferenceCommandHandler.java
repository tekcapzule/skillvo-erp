package com.skillvo.reference.application.command.handler;

import com.skillvo.reference.application.command.CreateReferenceCommand;
import com.skillvo.reference.application.command.UpdateReferenceCommand;
import com.skillvo.reference.application.dto.ReferenceDTO;

public interface ReferenceCommandHandler {
    ReferenceDTO handle(CreateReferenceCommand command);
    ReferenceDTO handle(UpdateReferenceCommand command);
    void handleDelete(String tenantId, String referenceId);
} 