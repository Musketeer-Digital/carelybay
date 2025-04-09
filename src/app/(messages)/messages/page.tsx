import { Container } from "@mui/material";

export default function Messages() {
  return (
    <Container>
      Messages
      {/* (A conversation is started when a user applies for a job) */}
      {/* (A conversation is between a job poster and an applicant) */}
      {/* TODO... */}
      {/* Retrieve all messages from database where user_id = current_user_id */}
      {/* Group messages from other users */}
      {/* Display coversations with other users on left */}
      {/* Display current conversation messages on right */}
      {/* User messages aligned right side, recipient messages aligned left */}
      {/* BONUS: Retrieve only last message of each conversation for preview display */}
      {/* BONUS (cont): Retrieve rest of messages upon opening of each conversation */}
      {/* ??BONUS: Applicant should see empty conversation if no messages - Display "You've successfully applied for this job" */}
      {/* ??BONUS (cont): Job poster shouldn't see empty conversation */}
    </Container>
  );
}
