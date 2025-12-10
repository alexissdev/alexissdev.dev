import { useState } from "react";
import { toast } from "sonner";
import Contact, { emptyContact } from "../model/contact.model";
import { checkEmptyProperties } from "../util/contact.util";
import { notificationStyle } from "../util/notification.util";

export default function useContact() {
  const [contact, setContact] = useState<Contact>(emptyContact);

  const handleChange = (name: string, value: string) => {
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const emptyProperty: string = checkEmptyProperties(contact);
    if (emptyProperty && emptyProperty.length > 0) {
      return toast.error(`Please enter your ${emptyProperty}.`, {
        style: notificationStyle,
      });
    }

    setContact(emptyContact);

    toast.success("Message sent successfully!", {
      style: notificationStyle,
    });
  };

  return { contact, handleChange, handleSubmit };
}
