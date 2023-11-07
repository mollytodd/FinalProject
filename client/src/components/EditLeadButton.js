import React from "react";
import { Button, Icon } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

function EditLeadButton({ onClick }) {
  return (
    <Button
      colorScheme="twitter" // Change the color scheme to your preference
      leftIcon={<Icon as={EditIcon} />}
      onClick={onClick} // Call the onClick prop directly
    >
      Edit
    </Button>
  );
}

export default EditLeadButton;
