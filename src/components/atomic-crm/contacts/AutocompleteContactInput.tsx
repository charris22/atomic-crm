import { useCreate, useGetIdentity, useNotify } from "ra-core";
import { AutocompleteInput } from "@/components/admin/autocomplete-input";
import type { InputProps } from "ra-core";
import { useIsMobile } from "@/hooks/use-mobile";
import { contactOptionText } from "../misc/ContactOption";

/**
 * Parses a name string into first and last name components.
 * e.g. "John Doe" -> { first_name: "John", last_name: "Doe" }
 * e.g. "John" -> { first_name: "John", last_name: "" }
 */
function parseName(name: string): { first_name: string; last_name: string } {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return { first_name: parts[0], last_name: "" };
  }
  const first_name = parts[0];
  const last_name = parts.slice(1).join(" ");
  return { first_name, last_name };
}

export const AutocompleteContactInput = ({
  validate,
  label,
}: Pick<InputProps, "validate" | "label">) => {
  const [create] = useCreate();
  const { identity } = useGetIdentity();
  const notify = useNotify();

  const handleCreateContact = async (name?: string) => {
    if (!name) return;
    const { first_name, last_name } = parseName(name);
    try {
      const newContact = await create(
        "contacts",
        {
          data: {
            first_name,
            last_name,
            sales_id: identity?.id,
            first_seen: new Date().toISOString(),
            last_seen: new Date().toISOString(),
            status: "cold",
          },
        },
        { returnPromise: true },
      );
      return newContact;
    } catch {
      notify("resources.contacts.autocomplete.create_error", {
        type: "error",
        messageArgs: {
          _: "An error occurred while creating the contact",
        },
      });
    }
  };

  const isMobile = useIsMobile();

  return (
    <AutocompleteInput
      label={label}
      optionText={contactOptionText}
      helperText={false}
      onCreate={handleCreateContact}
      createItemLabel="resources.contacts.autocomplete.create_item"
      createLabel="resources.contacts.autocomplete.create_label"
      validate={validate}
      modal={isMobile}
    />
  );
};
